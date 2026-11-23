import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as babelParser from '@babel/parser';
import * as t from '@babel/types';
import generateModule from '@babel/generator';
const generate = generateModule.default;
import traverseModule from '@babel/traverse';
const traverse = traverseModule.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Helper function to check if we're at component level
function isComponentLevel(path) {
  // Track how many function scopes we're nested in
  let functionDepth = 0;
  let currentPath = path;
  let componentFunction = null;

  // Walk up the AST tree to find parent functions
  while (currentPath.parentPath) {
    currentPath = currentPath.parentPath;

    // Check if current node is any type of function
    if (currentPath.isFunctionDeclaration() ||
      currentPath.isFunctionExpression() ||
      currentPath.isArrowFunctionExpression()) {

      functionDepth++;

      // First function we encounter going up = immediate parent function
      if (functionDepth === 1) {
        const functionName = currentPath.node.id?.name;

        // Check if it's a React component (starts with capital letter)
        if (functionName && /^[A-Z]/.test(functionName)) {
          componentFunction = functionName;
        } else {
          // Not in a React component, skip this declaration
          logger.info('  Not in React component - skipping');
          return { isValid: false };
        }
      }

      // If we're nested more than 1 level deep, skip
      // This means we're inside a hook callback, useEffect, etc.
      if (functionDepth > 1) {
        logger.info(`  Nested ${functionDepth} levels deep - skipping`);
        return { isValid: false };
      }
    }
  }

  return {
    isValid: !!componentFunction,
    componentName: componentFunction
  };
}

/**
 * Helper function to evaluate JS expressions safely
 */
const evaluateExpression = (code) => {
  if (!code) return undefined;
  logger.debug('Evaluating expression', { code });

  try {
    // Handle null and undefined explicitly
    if (code.trim() === 'null') {
      logger.success('Evaluated as null');
      return null;
    }
    if (code.trim() === 'undefined') {
      logger.success('Evaluated as undefined');
      return undefined;
    }

    // For simple string literals - handle both single and double quotes
    if ((code.startsWith('"') && code.endsWith('"')) ||
      (code.startsWith("'") && code.endsWith("'"))) {
      const result = JSON.parse(code.replace(/'/g, '"'));
      logger.success('Evaluated as string', { result });
      return result;
    }

    // For numbers and booleans (exact match)
    if (/^(true|false)$/.test(code.trim())) {
      const result = JSON.parse(code);
      logger.success('Evaluated as primitive', { result });
      return result;
    }

    // For integers and decimals
    if (/^-?\d+(\.\d+)?$/.test(code.trim())) {
      const result = JSON.parse(code);
      logger.success('Evaluated as primitive', { result });
      return result;
    }

    // For simple arrays - try JSON.parse first
    if (code.trim().startsWith('[') && code.trim().endsWith(']')) {
      try {
        // Convert single quotes to double quotes for JSON parsing
        const jsonCode = code.replace(/'/g, '"');
        const result = JSON.parse(jsonCode);
        logger.success('Evaluated as array', { result });
        return result;
      } catch (e) {
        // If JSON.parse fails, try eval for complex arrays
        logger.debug('JSON.parse failed for array, trying eval');
        const result = eval(`(${code})`);
        logger.success('Evaluated as array via eval', { result });
        return result;
      }
    }

    // For objects - try to convert to valid JSON first
    if (code.trim().startsWith('{') && code.trim().endsWith('}')) {
      try {
        // First attempt: simple key-value replacement for basic objects
        let jsonCode = code
          // Replace unquoted keys with quoted keys
          .replace(/(\w+):/g, '"$1":')
          // Replace single quotes with double quotes
          .replace(/'/g, '"');

        const result = JSON.parse(jsonCode);
        logger.success('Evaluated as object', { result });
        return result;
      } catch (e) {
        logger.debug('JSON conversion failed for object, trying eval');
        try {
          // Fallback to eval for complex objects
          const result = eval(`(${code})`);
          logger.success('Evaluated as object via eval', { result });
          return result;
        } catch (evalError) {
          logger.warn('Both JSON and eval failed for object', {
            code,
            jsonError: e.message,
            evalError: evalError.message
          });
          return code; // Return original code as string
        }
      }
    }

    // For arrow functions and other expressions, keep as string
    if (code.includes('=>') || code.includes('function')) {
      logger.success('Keeping function as string', { result: code });
      return code;
    }

    // For variable references and complex expressions, keep as string
    logger.success('Keeping expression as string', { result: code });
    return code;

  } catch (e) {
    logger.warn('Failed to evaluate expression, keeping as string', {
      code,
      error: e.message
    });
    return code;
  }
};

// Alternative safer version using only JSON.parse (no eval)
const evaluateExpressionSafe = (code) => {
  if (!code) return undefined;
  logger.debug('Evaluating expression (safe mode)', { code });

  try {
    // Handle null and undefined explicitly
    const trimmed = code.trim();
    if (trimmed === 'null') return null;
    if (trimmed === 'undefined') return undefined;

    // For simple string literals
    if ((code.startsWith('"') && code.endsWith('"')) ||
      (code.startsWith("'") && code.endsWith("'"))) {
      return JSON.parse(code.replace(/'/g, '"'));
    }

    // For primitives
    if (/^(true|false|-?\d+(\.\d+)?)$/.test(trimmed)) {
      return JSON.parse(code);
    }

    // For simple arrays and objects, attempt JSON conversion
    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
      (trimmed.startsWith('{') && trimmed.endsWith('}'))) {

      // Convert single quotes to double quotes and unquoted keys
      let jsonCode = code
        .replace(/(\w+):/g, '"$1":')  // Quote unquoted keys
        .replace(/'/g, '"');          // Convert single to double quotes

      try {
        const result = JSON.parse(jsonCode);
        logger.success('Evaluated as JSON', { result });
        return result;
      } catch (e) {
        logger.warn('JSON conversion failed, keeping as string', { code });
        return code;
      }
    }

    // Everything else stays as string
    return code;

  } catch (e) {
    logger.warn('Failed to evaluate expression, keeping as string', { code, error: e.message });
    return code;
  }
};

// Enhanced logging utility
const logger = {
  step: (step, message, data = null) => {
    // console.log(`\n🔄 STEP ${step}: ${message}`);
    // if (data) console.log(`   📊 Data:`, data);
  },

  info: (message, data = null) => {
    // console.log(`   ℹ️  ${message}`);
    // if (data) console.log(`      📋`, data);
  },

  success: (message, data = null) => {
    // console.log(`   ✅ ${message}`);
    // if (data) console.log(`      📈`, data);
  },

  warn: (message, data = null) => {
    // console.log(`   ⚠️  ${message}`);
    // if (data) console.log(`      🔍`, data);
  },

  error: (message, error = null) => {
    // console.log(`   ❌ ${message}`);
    // if (error) console.log(`      💥`, error);
  },

  debug: (section, data) => {
    // console.log(`   🔍 ${section}:`, JSON.stringify(data, null, 2));
  }
};

async function main() {
  logger.step(1, "INITIALIZING CONVERSION PROCESS");

  const filename = process.argv[2];
  if (!filename) {
    logger.error('No filename provided');
    console.error('Example: node codeToCanvas.mjs inputs/test1.jsx');
    process.exit(1);
  }

  logger.info('Processing file', { filename });

  const inputFile = path.resolve(filename);
  if (!fs.existsSync(inputFile)) {
    logger.error(`File not found: ${filename}`);
    process.exit(1);
  }

  logger.step(2, "READING SOURCE CODE");

  try {
    const code = fs.readFileSync(inputFile, 'utf-8');

    if (!code.trim()) {
      logger.error('File is empty');
      process.exit(1);
    }

    // Debug the actual file content
    logger.success('Code loaded successfully');

    const ast = parsePageCodeToAST(code);
    logger.success('AST generated successfully');

    const result = convertASTToCanvasState(ast);

    if (result) {
      logger.success('Canvas state generated successfully', {
        totalItems: Object.keys(result.items).length,
        totalContainers: Object.keys(result.containers).length,
        hasRootPanel: !!result.items['root-panel'],
        hasImports: result.items['root-panel']?.imports?.length > 0
      });

      const outputDir = path.join(__dirname, 'outputState');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        logger.info('Created output directory');
      }

      const baseName = path.basename(filename, path.extname(filename));
      const outputFile = path.join(outputDir, `${baseName}.js`);

      const prefix = `export const state = `
      fs.writeFileSync(outputFile, prefix + JSON.stringify(result, null, 2));

      logger.success(`Canvas state saved to ${outputFile}`);

      // Save debug info
      // const debugFile = path.join(outputDir, `${baseName}_debug.json`);
      // const debugInfo = {
      //   sourceFile: filename,
      //   timestamp: new Date().toISOString(),
      //   sourceStats: {
      //     codeLength: code.length,
      //     lineCount: code.split('\n').length
      //   },
      //   canvasStats: {
      //     totalItems: Object.keys(result.items).length,
      //     totalContainers: Object.keys(result.containers).length,
      //     itemsByType: {}
      //   },
      //   items: result.items,
      //   containers: result.containers
      // };

      // Calculate item statistics
      // Object.values(result.items).forEach(item => {
      //   const type = item.type || 'unknown';
      //   debugInfo.canvasStats.itemsByType[type] = (debugInfo.canvasStats.itemsByType[type] || 0) + 1;
      // });
      //
      // fs.writeFileSync(debugFile, JSON.stringify(debugInfo, null, 2));
      // logger.info(`Debug info saved to ${debugFile}`);

    } else {
      logger.error('Error converting AST to canvas state - result is null/undefined');
      process.exit(1);
    }

  } catch (error) {
    logger.error('Error processing file', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

main().catch(console.error);

/**
 * Parse page code string into an AST
 */
export function parsePageCodeToAST(pageCode) {
  const lines = pageCode.split('\n');
  const firstLine = lines.length > 0 ? lines[0] : '';

  logger.info('Starting AST parsing', {
    codeLength: pageCode.length,
    firstLine: firstLine.substring(0, 100),
    totalLines: lines.length
  });

  try {
    const ast = babelParser.parse(pageCode, {
      sourceType: "module",
      plugins: ["jsx", "typescript"], // Support for JSX and TSX parsing
    });

    // Babel parser returns a File node, we need to access ast.program.body
    const programBody = ast.program?.body || [];

    logger.success('AST parsing completed', {
      astType: ast?.type || 'undefined',
      programType: ast.program?.type || 'undefined',
      bodyLength: programBody.length,
      astExists: !!ast,
      programExists: !!ast?.program,
      bodyExists: !!programBody
    });

    logger.debug('AST structure', {
      hasProgram: !!ast.program,
      bodyItems: programBody.map(item => item.type)
    });

    return ast;
  } catch (error) {
    logger.error("Error parsing page code", error.message);

    // Add more debug info about the parsing error
    logger.debug('Code causing parse error', {
      codePreview: pageCode.substring(0, 200),
      errorLocation: error.loc || 'unknown',
      errorMessage: error.message || 'unknown error',
      errorStack: error.stack?.split('\n').slice(0, 3) || []
    });

    throw error;
  }
}

/**
 * Convert AST to Canvas State
 */
export function convertASTToCanvasState(ast) {
  logger.step('A', "INITIALIZING CANVAS STATE CONVERSION");

  // Fix: Access ast.program.body instead of ast.body
  if (!ast.program || !ast.program.body) {
    logger.error('Invalid AST structure - missing program.body');
    return null;
  }

  const state = {
    items: {},
    containers: { 'root-container': [] }
  };

  let dynamicCounter = 0
  const generateDynamicId = () => {
    dynamicCounter += 1
    return `dynamic-${dynamicCounter}`
  }
  let elementCounter = 1
  let panelCounter = 1;
  let variableCounter = 0;
  const containerCounters = new Map();

  // Track used IDs to prevent duplicates
  const usedIds = new Set();

  // Look for data-component-id attributes to preserve original IDs
  const originalIds = new Map();
  const allElementIds = new Map();
  // Helper function to generate unique container IDs
  const generateContainerId = (panelId) => {
    const count = containerCounters.get(panelId) || 0;
    containerCounters.set(panelId, count + 1);
    const containerId = `${panelId}-container-${count + 1}`;
    usedIds.add(containerId);
    logger.info(`Generated container ID: ${containerId} for panel: ${panelId}`);
    return containerId;
  };

  // Map of component IDs to state variables
  const componentVariables = new Map();

  // Track component types that need imports (collected at root level only)
  const componentTypesUsed = new Set();

  const generateElementId = () => {
    const existingElementIds = Array.from(allElementIds.values())

    let newId;
    do {
      newId = `element-${elementCounter++}`;
    } while (existingElementIds.includes(newId));

    logger.success(`Generated new ID: ${newId}`);
    return newId;
  };

  // Helper function to generate unique panel IDs
  const generatePanelId = (originalId) => {
    // logger.debug('Generating panel ID', { originalId, usedIds: Array.from(usedIds) });

    // If we have an original ID from data-component-id, use it only if it's not already used
    if (originalId && !usedIds.has(originalId)) {
      usedIds.add(originalId);
      logger.success(`Using original ID: ${originalId}`);
      return originalId;
    }

    // Otherwise generate a new unique ID
    let newId;
    do {
      newId = `panel-${panelCounter++}`;
    } while (usedIds.has(newId));

    usedIds.add(newId);
    logger.success(`Generated new ID: ${newId}`);
    return newId;
  };

  logger.info('Initial state structure created', {
    stateKeys: Object.keys(state),
    containers: Object.keys(state.containers)
  });


  logger.step('B', "SETTING UP ROOT PANEL");

  // Initialize root panel
  const ROOT_PANEL_ID = 'root';
  const ROOT_CONTAINER_ID = 'root-container';
  usedIds.add(ROOT_PANEL_ID);
  usedIds.add(ROOT_CONTAINER_ID);

  state.items[ROOT_PANEL_ID] = {
    id: ROOT_PANEL_ID,
    type: 'panel',
    componentType: 'div',
    containerIds: [ROOT_CONTAINER_ID],
    props: {
      style: {
        type: 'static',
        value: { width: '100%', height: '100%' }
      }
    },
    imports: [], // Initialize imports array
    state: {
      variables: {},
      functions: {}
    }
  };

  logger.success('Root panel created', {
    rootPanelId: ROOT_PANEL_ID,
    containerIds: state.items[ROOT_PANEL_ID].containerIds
  });

  const processedElements = new Set();
  const declarations = new Map();
  const imports = []; // Store all parsed imports
  let foundRootElement = false;



  // Component types mapping to determine if an element should be a container
  const componentTypes = {
    div: { isContainer: true },
    p: { isContainer: true },
    section: { isContainer: true },
    span: { isContainer: false },
    ul: { isContainer: true },
    li: { isContainer: true },
    table: { isContainer: true },
    tr: { isContainer: true },
    td: { isContainer: true },
    form: { isContainer: true },
    input: { isContainer: false },
    header: { isContainer: true },
    img: { isContainer: false },
    nav: { isContainer: true },
    a: { isContainer: true },
    button: { isContainer: true },
    h1: { isContainer: false },
    h2: { isContainer: false },
    h3: { isContainer: false },
    h4: { isContainer: false },
    h5: { isContainer: false },
    h6: { isContainer: false },
    textarea: { isContainer: false },
    ol: { isContainer: true },
    dl: { isContainer: true },
    dt: { isContainer: false },
    dd: { isContainer: false },
    figure: { isContainer: true },
    figcaption: { isContainer: false },
    blockquote: { isContainer: true },
    pre: { isContainer: true },
    code: { isContainer: false },
    article: { isContainer: true },
    aside: { isContainer: true },
    main: { isContainer: true },
    footer: { isContainer: true },
    address: { isContainer: true },
    cite: { isContainer: false },
    q: { isContainer: false },
    em: { isContainer: false },
    strong: { isContainer: false },
    small: { isContainer: false },
    abbr: { isContainer: false },
    time: { isContainer: false },
    mark: { isContainer: false },
    ruby: { isContainer: false },
    rt: { isContainer: false },
    rp: { isContainer: false },
    br: { isContainer: false },
    hr: { isContainer: false },
    wbr: { isContainer: false },
    canvas: { isContainer: true },
    audio: { isContainer: true },
    video: { isContainer: true },
    source: { isContainer: false },
    track: { isContainer: false },
    embed: { isContainer: false },
    object: { isContainer: true },
    param: { isContainer: false },
    iframe: { isContainer: false },
    math: { isContainer: true },
    svg: { isContainer: true },
    path: { isContainer: false },
    circle: { isContainer: false },
    ellipse: { isContainer: false },
    line: { isContainer: false },
    polygon: { isContainer: false },
    polyline: { isContainer: false },
    rect: { isContainer: false },
    use: { isContainer: false },
    symbol: { isContainer: true },
    defs: { isContainer: true },
    g: { isContainer: true },
    select: { isContainer: true }
  };
  componentTypes['Image'] = { isContainer: false };
  componentTypes['Link'] = { isContainer: true };
  // Add special Next.js and React components

  logger.info('Component types mapping loaded', {
    totalTypes: Object.keys(componentTypes).length,
    containerTypes: Object.keys(componentTypes).filter(k => componentTypes[k].isContainer).length
  });

  // Helper function to determine if element should be a container
  const isContainer = (elementType) => {
    const result = componentTypes[elementType]?.isContainer || false;
    logger.debug(`Container check for ${elementType}`, { isContainer: result });
    return result;
  };

  // Track mapping operations and conditional operations for later processing
  // const dynamicOperations = {
  //   mappings: [],
  //   conditionals: []
  // };

  logger.step('C', "FIRST PASS: EXTRACTING IMPORTS AND DECLARATIONS");

  function extractValueOrReference(node, fallback = null) {
    if (!node) return { value: fallback, reference: undefined };

    const code = generate(node).code;

    if (t.isIdentifier(node)) {
      return { reference: code }; // it's a reference like `initialValue`
    }

    try {
      return { value: evaluateExpression(code) }; // try to evaluate the actual value
    } catch {
      return { value: code }; // fallback to raw code string
    }
  }

  // First pass: extract all imports and state declarations
  traverse(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      const importSpecifiers = [];
      let defaultImport;

      logger.info(`Processing import: ${source}`);

      // Handle named imports
      path.node.specifiers.forEach(specifier => {
        if (t.isImportDefaultSpecifier(specifier)) {
          defaultImport = specifier.local.name;
          logger.info(`  - Default import: ${defaultImport}`);
        } else if (t.isImportSpecifier(specifier)) {
          const spec = {
            name: specifier.imported.name,
            alias: specifier.local.name !== specifier.imported.name ? specifier.local.name : undefined,
            isTypeOnly: path.node.importKind === 'type' || specifier.importKind === 'type'
          };
          importSpecifiers.push(spec);
          logger.info(`  - Named import: ${spec.name}${spec.alias ? ` as ${spec.alias}` : ''}`);
        }
      });

      imports.push({
        source,
        specifiers: importSpecifiers,
        defaultImport
      });

      logger.success(`Import processed: ${source}`, {
        defaultImport,
        namedImports: importSpecifiers.length
      });
    },

    // Improved state variables extraction
    VariableDeclaration(path) {
      const scopeCheck = isComponentLevel(path);
      if (!scopeCheck.isValid) return;

      logger.info('Processing variable declaration');

      path.node.declarations.forEach((declaration) => {
        const { id, init } = declaration;
        if (!init) return;

        // === 1. Identifier-based (e.g., const x = ...)
        if (t.isIdentifier(id)) return handleIdentifier(id, init);

        // === 2. Array Destructuring (e.g., const [x, setX] = useState(...))
        if (t.isArrayPattern(id)) return handleArrayPattern(id, init);

        // === 3. Object Destructuring (e.g., const { theme } = useContext(...))
        if (t.isObjectPattern(id)) return handleObjectPattern(id, init);

        logger.warn(`  Unhandled declaration.id type: ${id.type}`);
      });

      // === Helpers === //

      function handleIdentifier(id, init) {
        const varName = id.name;

        // Basic Assignment (const x = 5)
        if (!t.isCallExpression(init)) {
          const rawValue = generate(init).code;
          const evaluated = rawValue ? evaluateExpression(rawValue) : null;

          declarations.set(varName, {
            type: 'basic',
            value: evaluated
          });

          logger.success(`Stored basic variable: ${varName}`);
          return;
        }

        // Hook or function call (const x = useState(...))
        const callee = init.callee;

        // useState
        // if (t.isIdentifier(callee, { name: 'useState' })) {
        //   storeState(varName, init.arguments[0]);
        //   return;
        // }

        // useMemo / useCallback / useRef / useContext
        const hookTypes = ['useState', 'useMemo', 'useCallback', 'useRef', 'useContext'];
        if (t.isIdentifier(callee) && hookTypes.includes(callee.name)) {
          return storeHook({
            hookType: callee.name,
            varName,
            args: init.arguments,
          });
        }

        // React.* calls
        if (t.isMemberExpression(callee)) {
          return handleReactMemberCall(varName, callee, init.arguments);
        }

        logger.info(`Unhandled function call for identifier: ${varName}`);
      }

      function handleArrayPattern(id, init) {
        if (!t.isCallExpression(init)) {
          logger.info('Skipping non-call expression array pattern');
          return;
        }

        const callee = init.callee;

        if (t.isIdentifier(callee, { name: 'useState' })) {
          const [stateVar, setterVar] = id.elements.map((el) => el?.name);
          if (!stateVar || !setterVar) return logger.warn('Incomplete useState destructuring');

          return storeHook({
            hookType: 'useState',
            varName: stateVar,
            setterOverride: setterVar,
            args: init.arguments,
          });
        }

        else if (t.isIdentifier(callee, { name: 'useReducer' })) {
          const [stateVar, dispatchVar] = id.elements.map((el) => el?.name);
          if (!stateVar || !dispatchVar) return logger.warn('Incomplete useReducer destructuring');

          declarations.set(stateVar, {
            type: 'reducer',
            reducer: generate(init.arguments[0]).code,
            value: init.arguments[1] ? generate(init.arguments[1]).code : undefined,
            dispatch: dispatchVar,
          });

          logger.success(`Stored useReducer: ${stateVar}`);
        }

        else {
          logger.info('Unhandled array destructuring call');
        }
      }

      function handleObjectPattern(id, init) {
        if (!t.isCallExpression(init)) {
          logger.info('Skipping non-call expression object pattern');
          return;
        }

        const callee = init.callee;
        if (!t.isIdentifier(callee, { name: 'useContext' })) return logger.info('Unhandled object destructuring');

        const contextArg = init.arguments[0] ? generate(init.arguments[0]).code : null;
        const properties = id.properties
          .filter(p => t.isObjectProperty(p) && t.isIdentifier(p.key))
          .map(p => p.key.name);

        if (!properties.length) return logger.warn('No extractable properties in object pattern');

        properties.forEach((name) =>
          declarations.set(name, {
            type: 'context',
            value: contextArg,
            property: name
          })
        );

        logger.success(`Stored useContext properties: ${properties.join(', ')}`);
      }

      function storeHook({ hookType, varName, args, setterOverride }) {
        const arg0Node = args[0];
        const arg0Code = arg0Node ? generate(arg0Node).code : undefined;
        const deps = args[1]?.elements?.map(el => el.name) || [];

        const isIdentifierRef = arg0Node && t.isIdentifier(arg0Node);

        let evaluatedValue = arg0Code;
        if (arg0Code && !isIdentifierRef) {
          try {
            evaluatedValue = evaluateExpression(arg0Code);
          } catch (e) {
            logger.warn(`Failed to evaluate ${hookType} value: ${arg0Code}`);
          }
        }

        const entry = { type: hookType };

        switch (hookType) {
          case 'useState': {
            if (isIdentifierRef)
              entry.reference = arg0Code;
            else
              entry.value = evaluatedValue;

            entry.setter =
              setterOverride ||
              `set${varName.charAt(0).toUpperCase() + varName.slice(1)}`;
            break;
          }

          case 'useRef': {
            if (isIdentifierRef)
              entry.reference = arg0Code;
            else
              entry.value = evaluatedValue;
            break;
          }

          case 'useMemo':
          case 'useCallback':
            entry.value = arg0Code;
            entry.dependencies = deps;
            break;

          case 'useContext':
            entry.value = arg0Code || null;
            break;

          default:
            logger.warn(`Unhandled hook type: ${hookType}`);
            return;
        }

        declarations.set(varName, entry);
        logger.success(`Stored ${hookType}: ${varName}`);
      }


      function handleReactMemberCall(varName, callee, args) {
        const object = callee.object.name;
        const method = callee.property.name;
        const argCodes = args.map(arg => generate(arg).code);

        if (object === 'React' && method === 'createContext') {
          declarations.set(varName, {
            type: 'context_provider',
            value: argCodes[0],
            source: 'React.createContext'
          });

          logger.success(`Stored React.createContext: ${varName}`);
        }

        else if (object === 'React' && method === 'useState') {
          storeHook({
            hookType: 'useState',
            varName,
            args,
          });
          declarations.get(varName).source = 'React.useState';
        }

        else if (object === 'React') {
          declarations.set(varName, {
            type: 'react_method',
            value: `${object}.${method}`,
            method,
            arguments: argCodes
          });

          logger.success(`Stored React method: ${varName}`);
        }

        else {
          declarations.set(varName, {
            type: 'method_call',
            value: `${object}.${method}`,
            object,
            method,
            arguments: argCodes
          });

          logger.success(`Stored method call: ${varName}`);
        }
      }
    },

    // ADD THIS - Handle function declarations
    FunctionDeclaration(path) {
      // Check if we're at component level
      const scopeCheck = isComponentLevel(path);
      if (!scopeCheck.isValid) {
        return; // EXIT EARLY if not component level
      }

      logger.info('Processing function declaration');

      const functionName = path.node.id?.name;
      if (!functionName) return;

      // Skip component functions (start with capital letter)
      if (/^[A-Z]/.test(functionName)) {
        logger.info(`  Skipping component function: ${functionName}`);
        return;
      }

      logger.info(`  Processing function: ${functionName}`);

      // Get complete function code
      const functionBody = generate(path.node).code;

      declarations.set(functionName, {
        type: 'function',
        reference: functionBody,
      });

      logger.success(`    Stored function: ${functionName}]`);
    },

    // Extract useEffect hooks
    ExpressionStatement(path) {
      const expr = path.node.expression;
      if (t.isCallExpression(expr) && t.isIdentifier(expr.callee, { name: 'useEffect' })) {
        const effectId = `effect-${variableCounter++}`;

        logger.info(`Processing useEffect: ${effectId}`);

        // Improved handling for effect body
        let effectBody;
        if (expr.arguments[0]) {
          if (t.isArrowFunctionExpression(expr.arguments[0]) ||
            t.isFunctionExpression(expr.arguments[0])) {
            // If it's already a function, use its body
            effectBody = generate(expr.arguments[0].body).code;

            // If the body is a block statement, remove outer braces for cleaner code
            if (effectBody.startsWith('{') && effectBody.endsWith('}')) {
              effectBody = effectBody.slice(1, -1).trim();
            }
          } else {
            // Otherwise use the complete function
            effectBody = generate(expr.arguments[0]).code;
          }
        }

        let dependencies = [];
        if (expr.arguments[1]) {
          if (t.isArrayExpression(expr.arguments[1])) {
            dependencies = expr.arguments[1].elements?.map(el => {
              if (!el) return null; // Handle sparse arrays

              // For simple identifiers
              if (t.isIdentifier(el)) {
                return el.name;
              }
              // For everything else (property access, method calls, expressions)
              else {
                return generate(el).code;
              }
            }).filter(Boolean) || []; // Remove null values
          } else {
            // Handle case where dependencies is not an array (edge case)
            dependencies = [generate(expr.arguments[1]).code];
          }
        }
        declarations.set(effectId, {
          type: 'effect',
          body: effectBody,
          dependencies: dependencies
        });

        logger.success(`Stored useEffect: ${effectId}`);
      }
    },

    // Updated JSXElement visitor - REMOVE the skip for conditional elements
    JSXElement(path) {
      // DO NOT SKIP conditional elements - they need IDs too!
      // if (isInsideConditionalRendering(path)) {
      //   logger.info(`Skipping ID assignment for JSX element (inside conditional rendering): ${path.node.openingElement?.name?.name}`);
      //   return;
      // }

      const node = path.node;
      const nodeKey = `${node.start}-${node.end}`;

      // Skip if we already processed this element
      if (allElementIds.has(nodeKey)) {
        return;
      }

      // Check if this element has a data-component-id attribute
      let dataComponentId = null;
      const attributes = node.openingElement.attributes;

      for (const attr of attributes) {
        if (t.isJSXAttribute(attr) &&
          attr.name.name === 'data-component-id' &&
          t.isStringLiteral(attr.value)) {
          dataComponentId = attr.value.value;
          break;
        }
      }

      const elementType = node.openingElement.name.name;

      // Use data-component-id if available, otherwise generate one
      let elementId;
      if (dataComponentId) {
        elementId = dataComponentId;
        originalIds.set(nodeKey, elementId);
        logger.info(`Found original data-component-id: ${elementId}`);
      } else {
        elementId = generateElementId()
        logger.info(`Generated ID for ${elementType}: ${elementId}`);
      }

      // Store in combined lookup
      allElementIds.set(nodeKey, elementId);
    },

    JSXFragment(path) {

      const node = path.node;
      const nodeKey = `${node.start}-${node.end}`;

      // Skip if we already processed this fragment
      if (allElementIds.has(nodeKey)) {
        return;
      }

      // Fragments are always generated (can't have data-component-id)
      const fragmentId = generateElementId()
      allElementIds.set(nodeKey, fragmentId);
      logger.info(`Generated ID for fragment: ${fragmentId}`);
    },

    // Extract component IDs from data attributes
    JSXAttribute(path) {
      if (path.node.value && t.isJSXExpressionContainer(path.node.value)) {
        if (t.isIdentifier(path.node.value.expression)) {
          const varName = path.node.value.expression.name;

          if (declarations.has(varName)) {
            const jsxElement = path.findParent(p => p.isJSXElement()).node;
            const nodeKey = `${jsxElement.start}-${jsxElement.end}`;
            const elementID = allElementIds.get(nodeKey);
            // console.log('elementID ', nodeKey, elementID);

            if (elementID) {
              if (!componentVariables.has(elementID)) {
                componentVariables.set(elementID, new Set());
              }
              componentVariables.get(elementID).add(varName);
              logger.info(`Associated attribute variable ${varName} with component ${elementID}`);
            }
          }
        }
      }
    },

    // Track usage of state variables in JSX to associate them with components
    JSXExpressionContainer(path) {
      if (t.isIdentifier(path.node.expression)) {
        const varName = path.node.expression.name;

        if (declarations.has(varName)) {
          // Find the component this expression belongs to
          const jsxElementPath = path.findParent(p => p.isJSXElement());

          if (jsxElementPath) {
            const jsxElement = jsxElementPath.node;
            const nodeKey = `${jsxElement.start}-${jsxElement.end}`;
            const elementID = allElementIds.get(nodeKey);

            if (elementID) {
              if (!componentVariables.has(elementID)) {
                componentVariables.set(elementID, new Set());
              }
              componentVariables.get(elementID).add(varName);
              logger.info(`Associated variable ${varName} with component ${elementID}`);
            }
          }
        }
      }
      // NEW: Detect conditional rendering using && operator
      // else if (t.isLogicalExpression(path.node.expression) && path.node.expression.operator === '&&') {
      //   const leftSide = path.node.expression.left;
      //   const rightSide = path.node.expression.right;
      //
      //   // Only process if the right side is a JSX element
      //   if (t.isJSXElement(rightSide)) {
      //     const conditionCode = generate(leftSide).code;
      //     const jsxElementPath = path.findParent(p => p.isJSXElement());
      //
      //     if (jsxElementPath) {
      //       dynamicOperations.conditionals.push({
      //         path: path,
      //         condition: conditionCode,
      //         trueElement: rightSide,
      //         parentPath: jsxElementPath
      //       });
      //       logger.info(`Found conditional rendering (&&): ${conditionCode}`);
      //     }
      //   }
      // }
      // // NEW: Detect conditional rendering using ternary operator
      // else if (t.isConditionalExpression(path.node.expression)) {
      //   const condition = path.node.expression.test;
      //   const consequent = path.node.expression.consequent;
      //   const alternate = path.node.expression.alternate;
      //
      //   // Only process if at least the consequent is a JSX element
      //   if (t.isJSXElement(consequent)) {
      //     const conditionCode = generate(condition).code;
      //     const jsxElementPath = path.findParent(p => p.isJSXElement());
      //
      //     if (jsxElementPath) {
      //       dynamicOperations.conditionals.push({
      //         path: path,
      //         condition: conditionCode,
      //         trueElement: consequent,
      //         falseElement: t.isJSXElement(alternate) ? alternate : null,
      //         parentPath: jsxElementPath
      //       });
      //       logger.info(`Found conditional rendering (ternary): ${conditionCode}`);
      //     }
      //   }
      // }
      // // NEW: Detect array mapping operations
      // else if (t.isCallExpression(path.node.expression) &&
      //   t.isMemberExpression(path.node.expression.callee) &&
      //   t.isIdentifier(path.node.expression.callee.property, { name: 'map' })) {
      //
      //   const arrayExpr = path.node.expression.callee.object;
      //   const mapCallback = path.node.expression.arguments[0];
      //
      //   // Only process if it's a proper map with a callback
      //   if ((t.isArrowFunctionExpression(mapCallback) || t.isFunctionExpression(mapCallback)) &&
      //     mapCallback.params.length > 0) {
      //
      //     const dataSourceCode = generate(arrayExpr).code;
      //     const itemParam = mapCallback.params[0].name;
      //     const indexParam = mapCallback.params.length > 1 ? mapCallback.params[1].name : null;
      //
      //     // Get the body of the map callback
      //     let templateElement;
      //     if (t.isBlockStatement(mapCallback.body)) {
      //       // Look for return statement in block body
      //       const returnStmt = mapCallback.body.body.find(stmt => t.isReturnStatement(stmt));
      //       if (returnStmt && t.isJSXElement(returnStmt.argument)) {
      //         templateElement = returnStmt.argument;
      //       }
      //     } else if (t.isJSXElement(mapCallback.body)) {
      //       // Direct return of JSX in arrow function
      //       templateElement = mapCallback.body;
      //     }
      //
      //     if (templateElement) {
      //       const jsxElementPath = path.findParent(p => p.isJSXElement());
      //
      //       if (jsxElementPath) {
      //         dynamicOperations.mappings.push({
      //           path: path,
      //           dataSource: dataSourceCode,
      //           itemVariable: itemParam,
      //           indexVariable: indexParam,
      //           templateElement: templateElement,
      //           parentPath: jsxElementPath
      //         });
      //         logger.info(`Found mapping operation: ${dataSourceCode}.map`);
      //       }
      //     }
      //   }
      // }
    },
  });

  logger.success('First pass completed', {
    importsFound: imports.length,
    declarationsFound: declarations.size,
    originalIdsFound: originalIds.size,
    // dynamicOperations: {
    //   conditionals: dynamicOperations.conditionals.length,
    //   mappings: dynamicOperations.mappings.length
    // }
  });

  // console.log('declarations are:', declarations);
  logger.success('declarations are:', declarations);
  logger.success('originalIds are:', originalIds);
  // logger.success('dynamicOperations', dynamicOperations);

  logger.step('D', "SECOND PASS: PROCESSING JSX ELEMENTS");

  // Process JSX elements
  const processJSXElement = (path, parentContainerId = ROOT_CONTAINER_ID, childIndex = 0) => {
    // Validation
    if (!path?.node) {
      logger.error('processJSXElement requires a valid path object');
      return null;
    }

    const node = path.node;
    const nodeKey = `${node.start}-${node.end}`;

    // Skip if already processed
    if (processedElements.has(nodeKey)) {
      logger.warn(`Element ${nodeKey} already processed, skipping`);
      return null;
    }
    processedElements.add(nodeKey);

    // Extract element information
    const isFragment = t.isJSXFragment(node);
    const elementType = isFragment ? 'div' : node.openingElement.name.name;
    const elementId = allElementIds.get(nodeKey);
    const id = generatePanelId(elementId);

    logger.info(`Processing ${isFragment ? 'Fragment' : 'Element'}: ${elementType} (${id})`);

    // Track special components for imports (only for real elements)
    // if (!isFragment && isSpecialComponent(elementType)) {
    //   componentTypesUsed.add(elementType);
    //   logger.info(`Added to component types used: ${elementType}`);
    // }

    const investigate = 'element-28'
    const ifLog = investigate == elementId
    // Process attributes (only for elements, fragments have no attributes)
    const props = isFragment ? {} : processAttributes(node.openingElement.attributes, ifLog);
    logger.info(`Processed ${Object.keys(props).length} props for ${elementType}`);

    // Analyze children to determine container vs item
    const childrenResult = processContent(node.children, null, id);
    if (ifLog)
      console.log('childrenResult', childrenResult)
    const { hasDynamicChildren, hasJSXChildren, staticChildren } = childrenResult;

    // Determine if should be container or item
    const shouldBeContainer = determineShouldBeContainer(
      isFragment,
      elementType,
      hasDynamicChildren,
      hasJSXChildren,
      elementId
    );

    // Generate container ID if needed
    const containerId = shouldBeContainer ? generateContainerId(elementId) : null;
    if (ifLog)
      console.log('containerInfo', shouldBeContainer, containerId)

    // Create item
    const item = {
      id,
      type: shouldBeContainer ? 'panel' : 'item',
      componentType: elementType,
      containerIds: containerId ? [containerId] : [],
      props,
      state: { variables: {}, functions: {} },
      ...(!shouldBeContainer && { children: staticChildren })
    };

    // Add to state
    state.items[id] = item;
    insertAtIndex(state.containers[parentContainerId], id, childIndex);

    // Process children if container (integrated processChildrenInOrder)
    if (shouldBeContainer && containerId) {
      state.containers[containerId] = [];

      logger.info(`Processing ${node.children.length} children in order for container: ${containerId}`);

      let containerChildIndex = 0;

      if (ifLog && node.childrens) console.log('childrens', node.childrens.length)
      node.children.forEach((child, originalIndex) => {
        if (t.isJSXElement(child) || t.isJSXFragment(child)) {
          // Regular JSX child
          const childPath = getChildPath(path, originalIndex);
          if (childPath) {
            processJSXElement(childPath, containerId, containerChildIndex);
            containerChildIndex++;
          }
        } else if (t.isJSXExpressionContainer(child)) {
          const expression = child.expression;

          if (isDynamicOperation(expression)) {
            if (ifLog) console.log('processing dynamic operation')
            // Dynamic operation - create dynamic operation item
            const dynamicId = processDynamicOperation(expression, path, containerId, containerChildIndex, ifLog);
            if (ifLog) console.log('dynamicId', dynamicId)
            if (dynamicId) {
              containerChildIndex++;
            }
          } else if (t.isJSXElement(expression) || t.isJSXFragment(expression)) {
            // JSX expression - process as regular JSX
            const expressionPath = createPathFromNode(expression, path);
            processJSXElement(expressionPath, containerId, containerChildIndex);
            containerChildIndex++;
          }
          // Note: Regular variable expressions are handled in staticChildren, not here
          else {
            const expressionCode = generate(expression).code;
            const childId = `${id}-expr-${containerChildIndex}`;

            const child = staticChildren?.find(sc =>
              sc.type === 'variable' && sc.reference === expressionCode
            ) || { type: 'variable', reference: expressionCode };

            const item = {
              id: childId,
              type: 'item',
              componentType: 'span',
              containerIds: [],
              props: {},
              state: { variables: {}, functions: {} },
              children: [child]
            };

            state.items[childId] = item;
            insertAtIndex(state.containers[containerId], childId, containerChildIndex++);
            logger.info(`Created static expression item: ${childId}`);
          }
        }
      });
      if (ifLog)
        console.log('containerChildIndex', containerChildIndex)

      logger.success(`Processed ${containerChildIndex} container children for: ${containerId}`);
    }

    logger.success(`Created ${item.type}: ${id} (${elementType})`);
    return id;
  };

  // Helper function to determine if element should be container
  const determineShouldBeContainer = (isFragment, elementType, hasDynamicChildren, hasJSXChildren, elementId) => {
    // Fragments are always containers (they exist to group children)
    if (isFragment) return true;

    // Always container if has dynamic operations
    if (hasDynamicChildren) return true;

    // Always container if has JSX children and element type supports containers
    if (hasJSXChildren && isContainer(elementType)) return true;

    // Special cases for form elements that should be containers
    if (['select', 'optgroup', 'fieldset', 'datalist'].includes(elementType) && hasJSXChildren) {
      return true;
    }

    // Special case for links with JSX children
    if (elementType === 'a' && hasJSXChildren) return true;

    // Preserve original component type if available (for updates/re-processing)
    if (elementId && state.items[elementId]) {
      const originalType = state.items[elementId].type;
      if (originalType === 'panel' || originalType === 'item') {
        return (originalType === 'panel');
      }
    }

    return false;
  };

  // Process dynamic operations and create dynamic operation items
  const processDynamicOperation = (expression, parentPath, containerId, childIndex, ifLog = false) => {
    const operationType = getDynamicOperationType(expression);
    const dynamicId = generateDynamicId();
    if (ifLog) console.log('operationType', operationType)

    logger.info(`Processing ${operationType} dynamic operation: ${dynamicId}`);

    let operation;

    if (operationType === 'conditional') {
      operation = processConditionalOperation(expression, parentPath, dynamicId, false, ifLog);
    } else if (operationType === 'map') {
      operation = processMapOperation(expression, parentPath, dynamicId, false, ifLog);
    } else {
      logger.warn(`Unknown dynamic operation type: ${operationType}`);
      return null;
    }

    if (!operation) return null;

    insertAtIndex(state.containers[containerId], dynamicId, childIndex);

    logger.success(`Created dynamic operation: ${dynamicId} (${operationType})`);
    return dynamicId;
  };

  // Process conditional operations (&&, ternary)
  const processConditionalOperation = (expression, parentPath, dynamicId, isNested = false, ifLog = false) => {
    let dynamicOperation = null;
    if (t.isLogicalExpression(expression) && expression.operator === '&&') {
      // Logical AND: condition && element
      dynamicOperation = {
        type: 'conditional',
        condition: generate(expression.left).code,
        trueTemplateId: getOrCreateTemplateId(expression.right, parentPath),
        falseTemplateId: null
      };
    } else if (t.isConditionalExpression(expression)) {
      // Ternary: condition ? trueElement : falseElement
      dynamicOperation = {
        type: 'conditional',
        condition: generate(expression.test).code,
        trueTemplateId: getOrCreateTemplateId(expression.consequent, parentPath),
        falseTemplateId: getOrCreateTemplateId(expression.alternate, parentPath)
      };
    }

    if (dynamicOperation == null) return null
    // Create dynamic operation item
    const dynamicItem = {
      id: dynamicId,
      type: 'dynamic-operation',
      componentType: 'div',
      isNested,
      operation: dynamicOperation,
      props: {},
      containerIds: [],
      state: { variables: {}, functions: {} }
    };

    // Add to state
    state.items[dynamicId] = dynamicItem;
    return dynamicOperation
  };

  // Process map operations
  const processMapOperation = (expression, parentPath, dynamicId, isNested = false, ifLog = false) => {
    // if (isNested) console.log('isNested was true for map')
    // console.log('expression', expression)
    if (!t.isCallExpression(expression) || !t.isMemberExpression(expression.callee)) {
      return null;
    }

    const callback = expression.arguments[0];
    if (!callback || (!t.isArrowFunctionExpression(callback) && !t.isFunctionExpression(callback))) {
      return null;
    }

    // Extract template from callback body
    let templateElement;
    let isDynamicOperation = false
    if (t.isBlockStatement(callback.body)) {
      if (ifLog) console.log('block statement')
      const returnStatement = callback.body.body.find(stmt => t.isReturnStatement(stmt));
      if (returnStatement && (t.isJSXElement(returnStatement.argument) || t.isJSXFragment(returnStatement.argument))) {
        templateElement = returnStatement.argument;
      }
    } else if (t.isJSXElement(callback.body) || t.isJSXFragment(callback.body)) {
      if (ifLog) console.log('templateElement ')
      templateElement = callback.body;
    } else if (t.isLogicalExpression(callback.body) &&
      (t.isJSXElement(callback.body.right) || t.isJSXFragment(callback.body.right))
    ) {
      // templateElement = callback.body.right
      const templatePath = createPathFromNode(callback, parentPath);
      const dynamicId = generateDynamicId();
      isDynamicOperation = true
      processConditionalOperation(callback.body, templatePath, dynamicId, true) //isNested=true
      templateElement = dynamicId
    }


    if (!templateElement) {
      if (ifLog) console.log('error')
      logger.warn('Could not extract template from map callback');
      return null;
    }

    const dynamicOperation = {
      type: 'map',
      dataSource: generate(expression.callee.object).code,
      itemVariable: callback.params[0]?.name || 'item',
      indexVariable: callback.params[1]?.name || null,
      templateId: isDynamicOperation ?
        templateElement :
        getOrCreateTemplateId(templateElement, parentPath)
    };
    const dynamicItem = {
      id: dynamicId,
      type: 'dynamic-operation',
      componentType: 'div',
      isNested,
      operation: dynamicOperation,
      props: {},
      containerIds: [],
      state: { variables: {}, functions: {} }
    };

    // Add to state
    state.items[dynamicId] = dynamicItem;

    return dynamicOperation
  };

  // Get or create template ID for dynamic operations
  const getOrCreateTemplateId = (element, parentPath) => {
    if (!element) return null;

    // For JSX elements/fragments, process them as templates
    if (t.isJSXElement(element) || t.isJSXFragment(element)) {
      const templatePath = createPathFromNode(element, parentPath);
      // Process the template element (it won't be added to any container, just to items)
      return processJSXElement(templatePath, null, -1);
    }

    // For other expressions, return the code
    return generate(element).code;
  };

  // Helper function to get child path
  const getChildPath = (parentPath, childIndex) => {
    if (!parentPath?.get) {
      return createPathFromNode(parentPath.node.children[childIndex], parentPath);
    }

    try {
      return parentPath.get(`children.${childIndex}`);
    } catch (error) {
      logger.warn(`Failed to get child path at index ${childIndex}, creating manual path`);
      return createPathFromNode(parentPath.node.children[childIndex], parentPath);
    }
  };

  // Create a path object from a node (for cases where Babel path is not available)
  const createPathFromNode = (node, parentPath = null) => {
    return {
      node,
      parent: parentPath?.node || null,
      parentPath,

      get: function(key) {
        if (key.startsWith('children.')) {
          const index = parseInt(key.split('.')[1]);
          if (this.node.children?.[index]) {
            return createPathFromNode(this.node.children[index], this);
          }
        }
        return this.node[key];
      },

      // Babel path compatibility methods
      isJSXElement: () => t.isJSXElement(node),
      isJSXFragment: () => t.isJSXFragment(node),
      isJSXText: () => t.isJSXText(node),
      isJSXExpressionContainer: () => t.isJSXExpressionContainer(node),

      findParent: function(predicate) {
        let current = this.parentPath;
        while (current) {
          if (predicate(current)) return current;
          current = current.parentPath;
        }
        return null;
      }
    };
  };

  // Helper function to insert item at specific index in container
  const insertAtIndex = (array, item, index) => {
    if (index < 0 || !array) {
      // Don't add to container if index is negative (template elements)
      return;
    }

    if (index >= array.length) {
      array.push(item);
    } else {
      array.splice(index, 0, item);
    }
  };

  // Process JSX attributes into props
  // const processAttributes = (attributes, ifLog = false) => {
  //   const props = {};
  //
  //   if (!attributes) return props;
  //
  //   attributes.forEach(attr => {
  //     if (t.isJSXAttribute(attr)) {
  //       // Skip data-component-id as it's only for our internal tracking
  //       if (attr.name.name === 'data-component-id') return;
  //
  //       const propName = attr.name.name;
  //       if (ifLog)
  //         console.log(propName)
  //
  //       if (t.isStringLiteral(attr.value)) {
  //         if (ifLog)
  //           console.log('string static')
  //         props[propName] = {
  //           type: 'static',
  //           value: attr.value.value
  //         };
  //         logger.info(`  - Static prop: ${propName} = "${attr.value.value}"`);
  //       } else if (t.isJSXExpressionContainer(attr.value)) {
  //         const processedValue = processExpression(attr.value.expression, propName);
  //         if (processedValue) {
  //           props[propName] = processedValue;
  //           if (ifLog)
  //             console.log('expression ', processedValue)
  //           logger.info(`  - Expression prop: ${propName} = ${processedValue.type}`);
  //         }
  //       } else if (attr.value === null) {
  //         // Boolean prop (no value means true)
  //         props[propName] = {
  //           type: 'static',
  //           value: true
  //         };
  //         if (ifLog)
  //           console.log('boolean ', true)
  //         logger.info(`  - Boolean prop: ${propName} = true`);
  //       }
  //     }
  //   });
  //
  //   return props;
  // };
  //
  // // Process expressions in props
  // const processExpression = (expression, propName) => {
  //   if (t.isIdentifier(expression)) {
  //     return { type: 'variable', reference: expression.name };
  //   } else if (t.isLiteral(expression)) {
  //     return { type: 'static', value: expression.value };
  //   } else if (t.isObjectExpression(expression) || t.isArrayExpression(expression)) {
  //     // For complex objects/arrays, try to evaluate or keep as code
  //     const code = generate(expression).code;
  //     const evaluated = evaluateExpression(code);
  //
  //     if (evaluated !== code) {
  //       return { type: 'static', value: evaluated };
  //     } else {
  //       return { type: 'variable', reference: code };
  //     }
  //   } else {
  //     return { type: 'variable', reference: generate(expression).code };
  //   }
  // };
  // const processExpression = (expression, propName, ifLog = false) => {
  //   // Handle identifiers
  //   if (t.isIdentifier(expression)) {
  //     const declaration = declarations.get(expression.name);
  //     if (declaration) {
  //       logger.info(`Processing variable reference: ${expression.name} in ${propName}`);
  //       return {
  //         type: 'variable',
  //         reference: expression.name
  //       };
  //     } else {
  //       // Even if not in declarations, still process as identifier reference
  //       logger.info(`Processing identifier reference: ${expression.name} in ${propName}`);
  //       if (ifLog)
  //         console.log(`Processing identifier reference: ${expression.name} in ${propName}`);
  //       return {
  //         type: 'variable',
  //         reference: expression.name
  //       };
  //     }
  //   }
  //
  //   // Handle function expressions
  //   else if (t.isArrowFunctionExpression(expression) || t.isFunctionExpression(expression)) {
  //     logger.info(`Processing function expression in ${propName}`);
  //     return {
  //       type: 'variable',
  //       reference: generate(expression).code
  //     };
  //   }
  //
  //   // Handle literals
  //   else if (t.isNumericLiteral(expression)) {
  //     logger.info(`Processing numeric literal: ${expression.value} in ${propName}`);
  //     return {
  //       type: 'static',
  //       value: expression.value
  //     };
  //   }
  //
  //   else if (t.isStringLiteral(expression)) {
  //     logger.info(`Processing string literal: "${expression.value}" in ${propName}`);
  //     return {
  //       type: 'static',
  //       value: expression.value
  //     };
  //   }
  //
  //   else if (t.isBooleanLiteral(expression)) {
  //     logger.info(`Processing boolean literal: ${expression.value} in ${propName}`);
  //     return {
  //       type: 'static',
  //       value: expression.value
  //     };
  //   }
  //
  //   else if (t.isNullLiteral(expression)) {
  //     logger.info(`Processing null literal in ${propName}`);
  //     return {
  //       type: 'static',
  //       value: null
  //     };
  //   }
  //
  //   // Handle template literals
  //   else if (t.isTemplateLiteral(expression)) {
  //     logger.info(`Processing template literal in ${propName}`);
  //     const templateCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: templateCode
  //     };
  //   }
  //
  //   // Handle object expressions
  //   else if (t.isObjectExpression(expression)) {
  //     if (ifLog)
  //       console.log('====>object')
  //     logger.info(`Processing object expression with ${expression.properties.length} properties in ${propName}`);
  //
  //     return {
  //       type: 'variable',
  //       reference: objectCode
  //     };
  //     // Check if object has complex expressions - if so, treat as variable
  //     // const hasComplexExpressions = expression.properties.some(prop => {
  //     //   if (t.isObjectProperty(prop)) {
  //     //     return !t.isLiteral(prop.value) && !t.isIdentifier(prop.value);
  //     //   }
  //     //   return true; // Spread properties, methods, etc. are complex
  //     // });
  //     // //
  //     // if (hasComplexExpressions) {
  //     //   // Object has complex expressions, generate as code
  //     //   const objectCode = generate(expression).code;
  //     // return {
  //     //   type: 'variable',
  //     //   reference: objectCode
  //     // };
  //     // }
  //     //
  //     // // Simple object with only literals/identifiers - can be static
  //     // const obj = {};
  //     // try {
  //     //   expression.properties.forEach(prop => {
  //     //     if (t.isObjectProperty(prop)) {
  //     //       let key;
  //     //       // Handle different key types
  //     //       if (t.isIdentifier(prop.key)) {
  //     //         key = prop.key.name;
  //     //       } else if (t.isStringLiteral(prop.key)) {
  //     //         key = prop.key.value;
  //     //       } else if (t.isNumericLiteral(prop.key)) {
  //     //         key = prop.key.value;
  //     //       } else {
  //     //         // Complex key, fall back to code generation
  //     //         key = generate(prop.key).code;
  //     //       }
  //     //
  //     //       // Handle different value types
  //     //       let value;
  //     //       if (t.isStringLiteral(prop.value)) {
  //     //         value = prop.value.value;
  //     //       } else if (t.isNumericLiteral(prop.value)) {
  //     //         value = prop.value.value;
  //     //       } else if (t.isBooleanLiteral(prop.value)) {
  //     //         value = prop.value.value;
  //     //       } else if (t.isNullLiteral(prop.value)) {
  //     //         value = null;
  //     //       } else if (t.isIdentifier(prop.value)) {
  //     //         value = prop.value.name; // Store identifier name as string
  //     //       } else if (t.isObjectExpression(prop.value)) {
  //     //         // Recursively process nested objects
  //     //         const nestedResult = processExpression(prop.value, `${propName}.${key}`);
  //     //         if (nestedResult && nestedResult.type === 'static') {
  //     //           value = nestedResult.value;
  //     //         } else {
  //     //           // Complex nested object, fall back to code generation
  //     //           value = generate(prop.value).code;
  //     //         }
  //     //       } else if (t.isArrayExpression(prop.value)) {
  //     //         // Handle simple arrays
  //     //         const hasComplexElements = prop.value.elements.some(el =>
  //     //           el && !t.isLiteral(el) && !t.isIdentifier(el)
  //     //         );
  //     //
  //     //         if (hasComplexElements) {
  //     //           value = generate(prop.value).code;
  //     //         } else {
  //     //           value = prop.value.elements.map(element => {
  //     //             if (!element) return null;
  //     //             if (t.isStringLiteral(element)) return element.value;
  //     //             if (t.isNumericLiteral(element)) return element.value;
  //     //             if (t.isBooleanLiteral(element)) return element.value;
  //     //             if (t.isNullLiteral(element)) return null;
  //     //             if (t.isIdentifier(element)) return element.name;
  //     //             return generate(element).code;
  //     //           });
  //     //         }
  //     //       } else {
  //     //         // For other complex types, use the code representation
  //     //         value = generate(prop.value).code;
  //     //       }
  //     //
  //     //       obj[key] = value;
  //     //     } else if (t.isSpreadElement(prop)) {
  //     //       // Handle spread properties - fall back to code generation
  //     //       const objectCode = generate(expression).code;
  //     //       return {
  //     //         type: 'variable',
  //     //         reference: objectCode
  //     //       };
  //     //     }
  //     //   });
  //     //
  //     //   return {
  //     //     type: 'static',
  //     //     value: obj
  //     //   };
  //     // } catch (error) {
  //     //   // If static processing fails, fall back to code generation
  //     //   logger.warn(`Failed to process object statically, using code generation: ${error.message}`);
  //     //   const objectCode = generate(expression).code;
  //     //   return {
  //     //     type: 'variable',
  //     //     reference: objectCode
  //     //   };
  //     // }
  //   }
  //
  //   // Handle array expressions
  //   else if (t.isArrayExpression(expression)) {
  //     logger.info(`Processing array expression with ${expression.elements.length} elements in ${propName}`);
  //
  //     // Check if array has complex expressions
  //     // const hasComplexElements = expression.elements.some(element =>
  //     //   element && !t.isLiteral(element) && !t.isIdentifier(element)
  //     // );
  //
  //     // if (hasComplexElements) {
  //       // Array has complex expressions, generate as code
  //       const arrayCode = generate(expression).code;
  //       return {
  //         type: 'variable',
  //         reference: arrayCode
  //       };
  //     // }
  //
  //     // Simple array with only literals/identifiers
  //     // const arr = expression.elements.map(element => {
  //     //   if (!element) return null; // Handle sparse arrays
  //     //   if (t.isStringLiteral(element)) return element.value;
  //     //   if (t.isNumericLiteral(element)) return element.value;
  //     //   if (t.isBooleanLiteral(element)) return element.value;
  //     //   if (t.isNullLiteral(element)) return null;
  //     //   if (t.isIdentifier(element)) return element.name;
  //     //   return generate(element).code;
  //     // });
  //     //
  //     // return {
  //     //   type: 'static',
  //     //   value: arr
  //     // };
  //   }
  //
  //   // Handle member expressions: obj.prop, obj[key]
  //   else if (t.isMemberExpression(expression)) {
  //     logger.info(`Processing member expression in ${propName}`);
  //     const memberCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: memberCode
  //     };
  //   }
  //
  //   // Handle binary expressions: a + b, a > b, etc.
  //   else if (t.isBinaryExpression(expression)) {
  //     logger.info(`Processing binary expression (${expression.operator}) in ${propName}`);
  //     const binaryCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: binaryCode
  //     };
  //   }
  //
  //   // Handle logical expressions: a && b, a || b, a ?? b
  //   else if (t.isLogicalExpression(expression)) {
  //     logger.info(`Processing logical expression (${expression.operator}) in ${propName}`);
  //     const logicalCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: logicalCode
  //     };
  //   }
  //
  //   // Handle unary expressions: !a, -b, +c
  //   else if (t.isUnaryExpression(expression)) {
  //     logger.info(`Processing unary expression (${expression.operator}) in ${propName}`);
  //     const unaryCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: unaryCode
  //     };
  //   }
  //
  //   // Handle conditional expressions (ternary): condition ? a : b
  //   else if (t.isConditionalExpression(expression)) {
  //     logger.info(`Processing conditional expression in ${propName}`);
  //     const conditionCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: conditionCode
  //     };
  //   }
  //
  //   // Handle call expressions: func(), obj.method()
  //   else if (t.isCallExpression(expression)) {
  //     logger.info(`Processing call expression in ${propName}`);
  //     const callCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: callCode
  //     };
  //   }
  //
  //   // Handle new expressions: new Class()
  //   else if (t.isNewExpression(expression)) {
  //     logger.info(`Processing new expression in ${propName}`);
  //     const newCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: newCode
  //     };
  //   }
  //
  //   // Handle this expressions
  //   else if (t.isThisExpression(expression)) {
  //     logger.info(`Processing this expression in ${propName}`);
  //     return {
  //       type: 'variable',
  //       reference: 'this'
  //     };
  //   }
  //
  //   // Handle optional chaining: obj?.prop, obj?.method?.()
  //   else if (t.isOptionalMemberExpression(expression) || t.isOptionalCallExpression(expression)) {
  //     logger.info(`Processing optional expression in ${propName}`);
  //     const optionalCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: optionalCode
  //     };
  //   }
  //
  //   // Handle assignment expressions: a = b, a += b
  //   else if (t.isAssignmentExpression(expression)) {
  //     logger.info(`Processing assignment expression in ${propName}`);
  //     const assignmentCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: assignmentCode
  //     };
  //   }
  //
  //   // Handle update expressions: a++, --b
  //   else if (t.isUpdateExpression(expression)) {
  //     logger.info(`Processing update expression in ${propName}`);
  //     const updateCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: updateCode
  //     };
  //   }
  //
  //   // Handle sequence expressions: (a, b, c)
  //   else if (t.isSequenceExpression(expression)) {
  //     logger.info(`Processing sequence expression in ${propName}`);
  //     const sequenceCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: sequenceCode
  //     };
  //   }
  //
  //   // Handle parenthesized expressions: (expression)
  //   else if (t.isParenthesizedExpression(expression)) {
  //     logger.info(`Processing parenthesized expression in ${propName}`);
  //     // Unwrap and process the inner expression
  //     return processExpression(expression.expression, propName);
  //   }
  //
  //   // Handle tagged template expressions: styled.div`color: red;`
  //   else if (t.isTaggedTemplateExpression(expression)) {
  //     logger.info(`Processing tagged template expression in ${propName}`);
  //     const taggedCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: taggedCode
  //     };
  //   }
  //
  //   // Handle async/await expressions
  //   else if (t.isAwaitExpression(expression)) {
  //     logger.info(`Processing await expression in ${propName}`);
  //     const awaitCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: awaitCode
  //     };
  //   }
  //
  //   // Handle yield expressions
  //   else if (t.isYieldExpression(expression)) {
  //     logger.info(`Processing yield expression in ${propName}`);
  //     const yieldCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: yieldCode
  //     };
  //   }
  //
  //   // Fallback for any other expression types
  //   else {
  //     logger.warn(`Unhandled expression type: ${expression.type} in ${propName}`);
  //     const fallbackCode = generate(expression).code;
  //     return {
  //       type: 'variable',
  //       reference: fallbackCode
  //     };
  //   }
  // };
  const processExpression = (expression, propName, ifLog = false) => {
    const code = generate(expression).code;

    if (ifLog) {
      console.log(`Processing ${expression.type}: ${code} in ${propName}`);
    }

    return {
      type: 'variable',
      reference: code
    };
  };
  // Process JSX attributes into props
  const processAttributes = (attributes, ifLog = false) => {
    const props = {};

    logger.info(`Processing ${attributes.length} attributes`);

    attributes.forEach(attr => {
      if (t.isJSXAttribute(attr)) {
        // Skip data-component-id as it's only for our internal tracking
        if (attr.name.name === 'data-component-id') return;

        const propName = attr.name.name;
        if (ifLog)
          console.log(propName)

        if (t.isStringLiteral(attr.value)) {
          props[propName] = {
            type: 'static',
            value: attr.value.value
          };
          if (ifLog)
            console.log('static', attr.value.value)
          logger.info(`  - Static prop: ${propName} = "${attr.value.value}"`);
        } else if (t.isJSXExpressionContainer(attr.value)) {
          const processedValue = processExpression(attr.value.expression, propName, ifLog);
          if (processedValue) {
            // if (ifLog)
            //   console.log('expression', processedValue)
            props[propName] = processedValue;
            logger.info(`  - Expression prop: ${propName} = ${processedValue.type}`);
          }
        } else if (attr.value === null) {
          // Boolean prop (no value means true)
          props[propName] = {
            type: 'static',
            value: true
          };
          if (ifLog)
            console.log('boolean ', true)
          logger.info(`  - Boolean prop: ${propName} = true`);
        }
      }
    });

    return props;
  };


  // Usage in main traversal:
  const processRootJSXElements = () => {
    traverse(ast, {
      JSXElement(path) {
        // Only process top-level JSX elements (not nested ones)
        if (path.parent.type !== 'JSXElement' && path.parent.type !== 'JSXFragment') {
          processJSXElement(path);
        }
      },
      JSXFragment(path) {
        // Only process top-level JSX fragments (not nested ones)
        if (path.parent.type !== 'JSXElement' && path.parent.type !== 'JSXFragment') {
          processJSXElement(path);
        }
      }
    });
  };

  const processContent = (children, itemState, itemId) => {
    logger.info(`Processing content for ${itemId} with ${children.length} children`);

    const result = {
      hasDynamicChildren: false,
      hasJSXChildren: false,
      staticChildren: []
    };

    children.forEach((child, index) => {
      // Handle JSX Text nodes
      if (t.isJSXText(child)) {
        const text = child.value.trim();
        if (text) {
          result.staticChildren.push({
            type: 'static',
            value: text
          });
          logger.info(`  - Added static text: "${text}"`);
        }
        return;
      }

      // Handle JSX Elements and Fragments
      if (t.isJSXElement(child) || t.isJSXFragment(child)) {
        result.hasJSXChildren = true;
        logger.info(`  - Found JSX child (processed separately)`);
        return;
      }

      // Handle JSX Expression Containers
      if (t.isJSXExpressionContainer(child)) {
        const expression = child.expression;

        // Check for dynamic operations first
        if (isDynamicOperation(expression)) {
          result.hasDynamicChildren = true;
          logger.info(`  - Found dynamic operation: ${getDynamicOperationType(expression)}`);
          return;
        }

        // Check for nested JSX in expressions
        if (t.isJSXElement(expression) || t.isJSXFragment(expression)) {
          result.hasJSXChildren = true;
          logger.info(`  - Found JSX in expression`);
          return;
        }

        // Regular variable/expression content
        const expressionCode = generate(expression).code;
        result.staticChildren.push({
          type: 'variable',
          reference: expressionCode
        });

        logger.info(`  - Added variable: ${expressionCode.length > 50 ? expressionCode.substring(0, 50) + '...' : expressionCode}`);
        return;
      }

      logger.warn(`  - Unknown child type: ${child.type}`);
    });

    logger.success(`Content processing complete for ${itemId}: ${result.staticChildren.length} static, JSX: ${result.hasJSXChildren}, Dynamic: ${result.hasDynamicChildren}`);
    return result;
  };

  // Helper functions for dynamic operation detection
  const isDynamicOperation = (expression) => {
    return getDynamicOperationType(expression) !== 'unknown';
  };

  const getDynamicOperationType = (expression) => {
    // Conditional rendering: condition && <element>
    if (t.isLogicalExpression(expression) && expression.operator === '&&') {
      if (t.isJSXElement(expression.right) || t.isJSXFragment(expression.right)) {
        return 'conditional';
      }
    }

    // Ternary rendering: condition ? <element> : <element>
    if (t.isConditionalExpression(expression)) {
      if (t.isJSXElement(expression.consequent) || t.isJSXFragment(expression.consequent) ||
        t.isJSXElement(expression.alternate) || t.isJSXFragment(expression.alternate)) {
        return 'conditional';
      }
    }

    // Map operations: array.map(() => <element>)
    if (t.isCallExpression(expression) &&
      t.isMemberExpression(expression.callee) &&
      t.isIdentifier(expression.callee.property, { name: 'map' })) {
      return 'map';
    }

    return 'unknown';
  };


  // Process root JSX elements and fragments
  traverse(ast, {
    JSXElement(path) {
      if (path.parent.type !== 'JSXElement' && path.parent.type !== 'JSXFragment') {
        logger.info('Found top-level JSX element');
        processJSXElement(path);
      }
    },
    JSXFragment(path) {
      if (path.parent.type !== 'JSXElement' && path.parent.type !== 'JSXFragment') {
        logger.info('Found top-level JSX fragment');
        processJSXElement(path);
      }
    }
  });

  logger.success('Second pass completed', {
    elementsProcessed: processedElements.size,
    foundRootElement,
    totalItems: Object.keys(state.items).length,
    totalContainers: Object.keys(state.containers).length
  });

  logger.step('E', "PROCESSING IMPORTS");

  // After processing all elements, add auto-detected imports to root panel
  const autoDetectedImports = [];
  //
  if (componentTypesUsed.has('Image')) {
    autoDetectedImports.push({
      source: 'next/image',
      specifiers: [],
      defaultImport: 'Image'
    });
  }
  //
  if (componentTypesUsed.has('Link')) {
    autoDetectedImports.push({
      source: 'next/link',
      specifiers: [],
      defaultImport: 'Link'
    });
  }

  // Combine explicit imports with auto-detected imports
  const allImports = [...imports, ...autoDetectedImports];

  logger.step('ALL_IMPORTS', allImports);
  // Remove duplicates by source
  const uniqueImports = mergeImports(allImports)

  logger.step('UNIQUE_IMPORTS', uniqueImports);
  // Add all imports to root panel only
  if (uniqueImports.length > 0) {
    state.items[ROOT_PANEL_ID].imports = uniqueImports;
    logger.success(`Added ${uniqueImports.length} imports to root panel`);
  }

  logger.step('F', "PROCESSING DYNAMIC OPERATIONS");

  // Process dynamic operations
  // Handle conditional operations
  // dynamicOperations.conditionals.forEach((conditionalOp, index) => {
  //   const conditionId = `conditional-${index}`;
  //   logger.info(`Processing conditional operation: ${conditionId}`);
  //
  //   // Process true template
  //   // const trueTemplateId = processJSXElement({
  //   //   node: conditionalOp.trueElement,
  //   //   get(path) {
  //   //     return { node: conditionalOp.trueElement[path] };
  //   //   }
  //   // });
  //   const trueComponent = conditionalOp.trueElement
  //   const trueNodeKey = `${trueComponent.start}-${trueComponent.end}`;
  //   let trueTemplateId = allElementIds.get(trueNodeKey)
  //
  //   // Process false template if exists
  //   let falseTemplateId = null;
  //   if (conditionalOp.falseElement) {
  //     // falseTemplateId = processJSXElement({
  //     //   node: conditionalOp.falseElement,
  //     //   get(path) {
  //     //     return { node: conditionalOp.falseElement[path] };
  //     //   }
  //     // });
  //     const falseComponent = conditionalOp.falseElement
  //     const falseNodeKey = `${falseComponent.start}-${falseComponent.end}`;
  //     falseTemplateId = allElementIds.get(falseNodeKey)
  //   }
  //
  //   // Create the dynamic operation item
  //   const dynamicOpItem = {
  //     id: conditionId,
  //     type: 'dynamic-operation',
  //     componentType: 'div', // Default wrapper
  //     operation: {
  //       type: 'conditional',
  //       condition: conditionalOp.condition,
  //       trueTemplateId: trueTemplateId,
  //       falseTemplateId: falseTemplateId
  //     },
  //     props: {},
  //     containerIds: [],
  //     state: {
  //       variables: {},
  //       functions: {}
  //     }
  //   };
  //
  //   // Add to state
  //   state.items[conditionId] = dynamicOpItem;
  //
  //   logger.success(`Created conditional operation: ${conditionId}`);
  //
  //   // Replace the original JSX expression with this dynamic operation
  //   // Find the parent container where this operation should be placed
  //   const parentPath = conditionalOp.parentPath;
  //   if (parentPath) {
  //     const nodeKey = `${parentPath.node.start}-${parentPath.node.end}`;
  //     const parentId = allElementIds.get(nodeKey);
  //     const parentItem = state.items[parentId];
  //
  //     if (parentItem && parentItem.containerIds && parentItem.containerIds.length > 0) {
  //       const containerId = parentItem.containerIds[0];
  //
  //       // If parent container exists, add the dynamic operation to it
  //       if (state.containers[containerId]) {
  //         state.containers[containerId].push(conditionId);
  //         logger.info(`Added conditional to container: ${containerId}`);
  //       }
  //     }
  //   }
  // });

  // Handle mapping operations
  // dynamicOperations.mappings.forEach((mapOp, index) => {
  //   const mapId = `map-${index}`;
  //   logger.info(`Processing mapping operation: ${mapId}`);
  //
  //   // Process the template element
  //   // const templateId = processJSXElement({
  //   //   node: mapOp.templateElement,
  //   //   get(path) {
  //   //     return { node: mapOp.templateElement[path] };
  //   //   }
  //   // });
  //   const mapNode = mapOp.templateElement
  //   const nodeKey = `${mapNode.start}-${mapNode.end}`;
  //   const templateId = allElementIds.get(nodeKey)
  //
  //   // Create the dynamic operation item
  //   const dynamicOpItem = {
  //     id: mapId,
  //     type: 'dynamic-operation',
  //     componentType: 'div', // Default wrapper
  //     operation: {
  //       type: 'map',
  //       dataSource: mapOp.dataSource,
  //       itemVariable: mapOp.itemVariable,
  //       indexVariable: mapOp.indexVariable,
  //       templateId: templateId
  //     },
  //     props: {},
  //     containerIds: [],
  //     state: {
  //       variables: {},
  //       functions: {}
  //     }
  //   };
  //
  //   // Add to state
  //   state.items[mapId] = dynamicOpItem;
  //
  //   logger.success(`Created mapping operation: ${mapId}`);
  //
  //   // Replace the original JSX expression with this dynamic operation
  //   // Find the parent container where this operation should be placed
  //   const parentPath = mapOp.parentPath;
  //   if (parentPath) {
  //     const nodeKey = `${parentPath.node.start}-${parentPath.node.end}`;
  //     const parentId = allElementIds.get(nodeKey)
  //     console.log('parentId for map operation', parentId)
  //     const parentItem = state.items[parentId];
  //
  //     if (parentItem && parentItem.containerIds && parentItem.containerIds.length > 0) {
  //       const containerId = parentItem.containerIds[0];
  //
  //       // If parent container exists, add the dynamic operation to it
  //       if (state.containers[containerId]) {
  //         state.containers[containerId].push(mapId);
  //         logger.info(`Added mapping to container: ${containerId}`);
  //       }
  //     }
  //   }
  // });

  logger.step('G', "DISTRIBUTING STATE VARIABLES");

  // Distribute state variables to their components based on the componentVariables mapping
  // componentVariables.forEach((variables, componentId) => {
  //   // Skip if component not found
  //   if (!state.items[componentId]) return;
  //
  //   logger.info(`Distributing ${variables.size} variables to component: ${componentId}`);
  //
  //   // Ensure component has state structure
  //   if (!state.items[componentId].state) {
  //     state.items[componentId].state = { variables: {}, functions: {} };
  //   }
  //
  //   // Add each variable to the component
  //   variables.forEach(varName => {
  //     const declaration = declarations.get(varName);
  //     if (!declaration) return;
  //
  //     if (declaration.type === 'effect') {
  //       state.items[componentId].state.functions[varName] = declaration;
  //       logger.info(`  - Added effect: ${varName}`);
  //     } else {
  //       state.items[componentId].state.variables[varName] = declaration;
  //       logger.info(`  - Added variable: ${varName}`);
  //     }
  //
  //     // Mark as assigned so it's not added to root
  //     declarations.delete(varName);
  //   });
  // });

  // For any function references, make sure we map them to their owners
  // Object.values(state.items).forEach(item => {
  //   if (!item.props) return;
  //
  //   Object.entries(item.props).forEach(([propName, prop]) => {
  //     if (prop.type === 'function' && prop.reference) {
  //       const funcName = prop.reference;
  //
  //       // Find any component that might own this function
  //       for (const [componentId, variables] of componentVariables.entries()) {
  //         if (variables.has(funcName) && componentId !== item.id) {
  //           // Add this variable as needed by this component
  //           if (!componentVariables.has(item.id)) {
  //             componentVariables.set(item.id, new Set());
  //           }
  //           componentVariables.get(item.id).add(funcName);
  //           logger.info(`Associated function ${funcName} with component ${item.id}`);
  //           break;
  //         }
  //       }
  //     }
  //   });
  // });

  logger.step('H', "FINALIZING STATE");

  // Add remaining state variables to root panel
  declarations.forEach((declaration, name) => {
    if (declaration.type === 'effect') {
      if (!state.items[ROOT_PANEL_ID].state.functions) {
        state.items[ROOT_PANEL_ID].state.functions = {};
      }
      state.items[ROOT_PANEL_ID].state.functions[name] = declaration;
      logger.info(`Added remaining effect to root: ${name}`);
    } else {
      if (!state.items[ROOT_PANEL_ID].state.variables) {
        state.items[ROOT_PANEL_ID].state.variables = {};
      }
      state.items[ROOT_PANEL_ID].state.variables[name] = declaration;
      logger.info(`Added remaining variable to root: ${name}`);
    }
  });

  // Clean up empty containers
  let cleanedContainers = 0;
  Object.entries(state.containers).forEach(([containerId, children]) => {
    if (children.length === 0) {
      // Find the item that owns this container
      const ownerItem = Object.values(state.items).find(item =>
        item.containerIds && item.containerIds.includes(containerId)
      );

      // If this is a component with no children, consider changing to item type
      if (ownerItem && ownerItem.type === 'panel') {
        // Only remove empty containers for non-essential container elements
        if (!['div', 'section', 'article', 'form', 'ul', 'ol', 'table'].includes(ownerItem.componentType)) {
          ownerItem.type = 'item';
          ownerItem.containerIds = [];
          delete state.containers[containerId];
          cleanedContainers++;
          logger.info(`Cleaned up empty container: ${containerId}`);
        }
      }
    }
  });

  // If no root elements were found, ensure we have at least the root panel
  if (!foundRootElement) {
    logger.warn('No JSX elements found, using default root panel structure');
  }

  logger.success('Canvas state conversion completed', {
    totalItems: Object.keys(state.items).length,
    totalContainers: Object.keys(state.containers).length,
    cleanedContainers,
    foundRootElement,
    itemTypes: Object.values(state.items).reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {})
  });

  return state;
}

/**
 * Extracts the component name from file content
 * @param {string} fileCode - The source code of the file
 * @param {string} filePath - The path of the file
 * @returns {Object} Object containing component name and whether it's a utility file
 */
export const extractComponentName = (fileCode, filePath) => {
  // Default result
  const result = {
    componentName: '',
    isUtilFile: false
  };

  // Check if this is a utility file (no default export)
  result.isUtilFile = !fileCode.includes('export default');

  if (!result.isUtilFile) {
    // Extract default export name using regex patterns

    // Pattern 1: export default function ComponentName()
    const exportDefaultFunctionMatch = fileCode.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
    if (exportDefaultFunctionMatch && exportDefaultFunctionMatch[1]) {
      result.componentName = exportDefaultFunctionMatch[1];
      return result;
    }

    // Pattern 2: export default ComponentName
    const exportDefaultMatch = fileCode.match(/export\s+default\s+([A-Za-z0-9_]+)/);
    if (exportDefaultMatch && exportDefaultMatch[1]) {
      result.componentName = exportDefaultMatch[1];
      return result;
    }

    // Pattern 3: const/function ComponentName = ... followed later by export default ComponentName
    const namedComponentMatch = fileCode.match(/(const|function|class)\s+([A-Za-z0-9_]+)[\s\S]*?export\s+default\s+\2/);
    if (namedComponentMatch && namedComponentMatch[2]) {
      result.componentName = namedComponentMatch[2];
      return result;
    }
  }

  // Fallback to filename-based naming
  if (!result.componentName) {
    const pathSegments = filePath.split('/');
    const fileName = pathSegments[pathSegments.length - 1];

    // Remove extension
    result.componentName = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');

    // If it's an index file, use the parent folder name
    if (result.componentName === 'index' && pathSegments.length > 1) {
      result.componentName = pathSegments[pathSegments.length - 2];

      // Convert to PascalCase if needed
      if (result.componentName.includes('-')) {
        result.componentName = result.componentName
          .split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');
      } else {
        // Capitalize first letter
        result.componentName =
          result.componentName.charAt(0).toUpperCase() +
          result.componentName.slice(1);
      }
    }
  }

  return result;
};

/**
 * Generate React code for a canvas state using the server-side conversion
 * @param {Object} Parse - Parse instance from useParse hook
 * @param {Object} canvasState - The canvas state to convert
 * @param {string} componentName - Name of the component
 * @param {string} selectedItemId - ID of selected item (optional)
 * @param {boolean} extractSubtree - Whether to extract just the selected subtree
 * @returns {Promise<{success: boolean, fullCode?: string, imports?: string, code?: string, error?: string}>}
 */
export async function generateComponentCode(Parse, canvasState, componentName, selectedItemId = null, extractSubtree = false) {
  try {
    const result = await Parse.Cloud.run("generateComponentCode", {
      canvasState,
      componentName,
      selectedItemId,
      extractSubtree
    });

    return result;
  } catch (error) {
    console.error('Error generating component code:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate code'
    };
  }
}

/**
 * Extract a subtree of the canvas state for a specific component
 * This is useful when you want to preview what will be generated
 */
export function extractComponentState(fullState, componentId) {
  if (!fullState || !fullState.items || !fullState.items[componentId]) {
    return null;
  }

  const extractedState = {
    items: {},
    containers: {}
  };

  // Set to track which items we've processed
  const processedItems = new Set();

  // Recursively extract all items and containers starting from componentId
  function extractItem(itemId) {
    if (processedItems.has(itemId) || !fullState.items[itemId]) {
      return;
    }

    processedItems.add(itemId);
    const item = fullState.items[itemId];
    extractedState.items[itemId] = item;

    // If this item has containers, extract them and their children
    if (item.containerIds && item.containerIds.length > 0) {
      item.containerIds.forEach(containerId => {
        if (fullState.containers[containerId]) {
          extractedState.containers[containerId] = fullState.containers[containerId];

          // Recursively extract children
          fullState.containers[containerId].forEach(childId => {
            extractItem(childId);
          });
        }
      });
    }
  }

  // Start extraction from the selected component
  extractItem(componentId);

  return extractedState;
}

/**
 * Determine the component name based on the context
 */
export function getComponentName(selectedPage, selectedComponentId, itemId = null) {
  // If we have a specific item ID that's not root-panel
  if (itemId && itemId !== 'root-panel') {
    // Convert item ID to PascalCase component name
    return itemId
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  // If we're looking at a specific component that's not the page itself
  if (selectedPage && selectedComponentId && selectedComponentId !== selectedPage.path) {
    // Try to extract component name from the path
    const pathParts = selectedComponentId.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const componentName = fileName.replace(/\.(tsx|jsx|ts|js)$/, '');

    // Convert to PascalCase if needed
    return componentName.charAt(0).toUpperCase() + componentName.slice(1);
  }

  // Default to page name or 'Component'
  return selectedPage?.name || 'Component';
}

/**
 * Check if the selected item represents the root/entire component
 */
export function isRootComponent(itemId, state) {
  // Check if it's literally the root panel
  if (itemId === 'root-panel') {
    return true;
  }

  // Check if this item is the only top-level item in ROOT_CONTAINER_ID
  // const rootContainer = state.containers[ROOT_CONTAINER_ID];
  if (rootContainer && rootContainer.length === 1 && rootContainer[0] === itemId) {
    return true;
  }

  return false;
}

/**
 * Get display name for an item based on its type and properties
 */
export function getItemDisplayName(item) {
  if (!item) return 'Unknown';

  // For dynamic operations, show the operation type
  if (item.type === 'dynamic-operation' && item.operation) {
    if (item.operation.type === 'map') {
      return `Map: ${item.operation.dataSource}`;
    } else if (item.operation.type === 'conditional') {
      return `If: ${item.operation.condition}`;
    }
  }

  // For regular items, show component type
  return item.componentType || item.id;
}

/**
 * Check if an item has any dynamic operations (map, conditional) in its tree
 */
export function hasDynamicOperations(state, itemId) {
  const item = state.items[itemId];
  if (!item) return false;

  // Check if this item itself is a dynamic operation
  if (item.type === 'dynamic-operation') return true;

  // Check children recursively
  if (item.containerIds && item.containerIds.length > 0) {
    for (const containerId of item.containerIds) {
      const children = state.containers[containerId] || [];
      for (const childId of children) {
        if (hasDynamicOperations(state, childId)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Get a summary of what will be generated for a given selection
 */
export function getCodeGenerationSummary(state, itemId) {
  const item = state.items[itemId];
  if (!item) return null;

  const isRoot = isRootComponent(itemId, state);
  const hasOperations = hasDynamicOperations(state, itemId);

  // Count items in the subtree
  let itemCount = 0;
  const countItems = (id) => {
    if (state.items[id]) {
      itemCount++;
      const item = state.items[id];
      if (item.containerIds) {
        item.containerIds.forEach(containerId => {
          const children = state.containers[containerId] || [];
          children.forEach(childId => countItems(childId));
        });
      }
    }
  };
  countItems(itemId);

  return {
    isRoot,
    hasOperations,
    itemCount,
    componentType: item.componentType,
    type: item.type
  };
}

/**
 * Check if an import path is local (not from node_modules)
 */
export function isLocalImportPath(path) {
  return path.startsWith('./') ||
    path.startsWith('../') ||
    path.startsWith('/') ||
    path.startsWith('@/');
}

/**
 * Find all reachable items from root (used for cleanup)
 */
export function findAllReachableItems(state) {
  const reachableItems = new Set(['root-panel']); // root-panel is always kept

  // Helper function for DFS traversal of component tree
  const collectReachableItems = (itemIds) => {
    for (const id of itemIds) {
      if (reachableItems.has(id)) continue;

      reachableItems.add(id);

      // If this is a panel, also collect its children
      const item = state.items[id];
      if (item && item.type === 'panel' && item.containerIds) {
        for (const containerId of item.containerIds) {
          const containerChildren = state.containers[containerId] || [];
          collectReachableItems(containerChildren);
        }
      }
    }
  };

  // Start traversal from root container
  for (const containerId of Object.values(state.items['root-panel']?.containerIds || [])) {
    collectReachableItems(state.containers[containerId] || []);
  }

  return reachableItems;
}


function mergeImports(allImports) {
  const mergedImports = new Map();

  allImports.forEach(imp => {
    const source = imp.source;

    if (mergedImports.has(source)) {
      const existing = mergedImports.get(source);

      // Merge specifiers
      const allSpecifiers = [
        ...(existing.specifiers || []),
        ...(imp.specifiers || [])
      ];

      // Remove duplicate specifiers by name
      const uniqueSpecifiers = allSpecifiers.filter((spec, index, arr) =>
        arr.findIndex(s => s.name === spec.name) === index
      );

      // Handle default imports (should be the same, but take the first non-null)
      const defaultImport = existing.defaultImport || imp.defaultImport;

      // Handle conflicts in default imports
      if (existing.defaultImport && imp.defaultImport &&
        existing.defaultImport !== imp.defaultImport) {
        logger.warn(`Conflicting default imports for ${source}`, {
          existing: existing.defaultImport,
          incoming: imp.defaultImport
        });
      }

      mergedImports.set(source, {
        source,
        specifiers: uniqueSpecifiers,
        defaultImport
      });
    } else {
      // First occurrence - just copy
      mergedImports.set(source, {
        source: imp.source,
        specifiers: [...(imp.specifiers || [])],
        defaultImport: imp.defaultImport
      });
    }
  });

  return Array.from(mergedImports.values());
}
