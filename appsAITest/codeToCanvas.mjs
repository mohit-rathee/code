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

const ROOT_PANEL_ID = 'root';
const ROOT_CONTAINER_ID = 'root-container';

// Enhanced logging utility
const logger = {
  step: (step, message, data = null) => {
    console.log(`\n🔄 STEP ${step}: ${message}`);
    if (data) console.log(`   📊 Data:`, data);
  },

  info: (message, data = null) => {
    console.log(`   ℹ️  ${message}`);
    if (data) console.log(`      📋`, data);
  },

  success: (message, data = null) => {
    console.log(`   ✅ ${message}`);
    if (data) console.log(`      📈`, data);
  },

  warn: (message, data = null) => {
    console.log(`   ⚠️  ${message}`);
    if (data) console.log(`      🔍`, data);
  },

  error: (message, error = null) => {
    console.log(`   ❌ ${message}`);
    if (error) console.log(`      💥`, error);
  },

  debug: (section, data) => {
    console.log(`   🔍 ${section}:`, JSON.stringify(data, null, 2));
  }
};

/**
 * JSX Processor class
 */
class JSXProcessor {
  constructor(state, ctx) {
    this.state = state;
    this.ctx = ctx;
  }

  processJSXElement(path, parentContainerId = ROOT_CONTAINER_ID, childIndex = 0) {
    if (!path?.node) {
      logger.error('processJSXElement requires a valid path object');
      return null;
    }

    const node = path.node;
    const nodeKey = `${node.start}-${node.end}`;

    if (this.ctx.tracking.processedElements.has(nodeKey)) {
      logger.warn(`Element ${nodeKey} already processed, skipping`);
      return null;
    }
    this.ctx.tracking.processedElements.add(nodeKey);

    const isFragment = t.isJSXFragment(node);
    // const elementType = isFragment ? 'div' : node.openingElement.name.name;
    const elementType = getJSXElementType(node);

    const elementId = this.ctx.tracking.allElementIds.get(nodeKey);
    const id = this.ctx.generatePanelId(elementId);

    logger.info(`Processing ${isFragment ? 'Fragment' : 'Element'}: ${elementType} (${id})`);

    const props = isFragment ? {} : this.processAttributes(node.openingElement.attributes);
    logger.info(`Processed ${Object.keys(props).length} props for ${elementType}`);

    const childrenResult = this.processContent(node.children, null, id);
    const { hasDynamicChildren, hasJSXChildren, staticChildren } = childrenResult;

    const shouldBeContainer = this.determineShouldBeContainer(
      isFragment,
      elementType,
      hasDynamicChildren,
      hasJSXChildren,
      elementId
    );

    const containerId = shouldBeContainer ? this.ctx.generateContainerId(elementId) : null;

    const item = {
      id,
      type: shouldBeContainer ? 'panel' : 'item',
      componentType: elementType,
      containerIds: containerId ? [containerId] : [],
      props,
      state: { variables: {}, functions: {} },
      ...(!shouldBeContainer && { children: staticChildren })
    };

    this.state.items[id] = item;
    insertAtIndex(this.state.containers[parentContainerId], id, childIndex);

    if (shouldBeContainer && containerId) {
      this.processChildren(node, path, containerId, id);
    }

    logger.success(`Created ${item.type}: ${id} (${elementType})`);
    return id;
  }

  processChildren(node, path, containerId, parentId) {
    this.state.containers[containerId] = [];

    const children = node.children || [];
    logger.info(`Processing ${children.length} children for container: ${containerId}`);

    let containerChildIndex = 0;
    let skippedChildren = 0;

    children.forEach((child, originalIndex) => {
      // Skip empty text nodes early
      if (t.isJSXText(child)) {
        const text = child.value.trim();
        if (!text) {
          skippedChildren++;
          return;
        }
        // Handle non-empty text nodes - they should be added to parent's children
        // For now, log them
        logger.info(`  Text node found: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`);
        skippedChildren++;
        return;
      }

      logger.info(`  Child ${originalIndex}: type=${child.type}`);

      if (t.isJSXElement(child) || t.isJSXFragment(child)) {
        const childPath = this.getChildPath(path, originalIndex);

        if (!childPath) {
          logger.error(`    Failed to create path for child ${originalIndex}`);
          return;
        }

        const elementType = getJSXElementType(child);
        logger.info(`    Processing JSX ${child.type}: ${elementType}`);

        const childId = this.processJSXElement(childPath, containerId, containerChildIndex);
        if (childId) {
          containerChildIndex++;
          logger.success(`    Added ${elementType} (${childId}) at position ${containerChildIndex - 1}`);
        } else {
          logger.warn(`    processJSXElement returned null for ${elementType}`);
        }

      } else if (t.isJSXExpressionContainer(child)) {
        const expression = child.expression;

        // Skip empty expressions
        if (t.isJSXEmptyExpression(expression)) {
          logger.info(`    Skipping empty expression`);
          skippedChildren++;
          return;
        }

        logger.info(`    Expression container with type: ${expression.type}`);

        if (isDynamicOperation(expression)) {
          const opType = getDynamicOperationType(expression);
          logger.info(`    Processing dynamic operation: ${opType}`);

          const dynamicId = this.processDynamicOperation(expression, path, containerId, containerChildIndex);
          if (dynamicId) {
            containerChildIndex++;
            logger.success(`    Added dynamic operation ${dynamicId}`);
          } else {
            logger.warn(`    Dynamic operation processing returned null`);
          }

        } else if (t.isJSXElement(expression) || t.isJSXFragment(expression)) {
          logger.info(`    JSX inside expression container`);

          const expressionPath = createPathFromNode(expression, path);
          if (!expressionPath) {
            logger.error(`    Failed to create path for JSX expression`);
            return;
          }

          const childId = this.processJSXElement(expressionPath, containerId, containerChildIndex);
          if (childId) {
            containerChildIndex++;
            logger.success(`    Added JSX expression ${childId}`);
          }

        } else {
          // Static expression - create a span item for it
          const expressionCode = generate(expression).code;
          const childId = `${parentId}-expr-${containerChildIndex}`;

          logger.info(`    Creating expression item for: ${expressionCode.substring(0, 50)}${expressionCode.length > 50 ? '...' : ''}`);

          const item = {
            id: childId,
            type: 'item',
            componentType: 'span',
            containerIds: [],
            props: {},
            state: { variables: {}, functions: {} },
            children: [{ type: 'variable', reference: expressionCode }]
          };

          this.state.items[childId] = item;
          insertAtIndex(this.state.containers[containerId], childId, containerChildIndex);
          containerChildIndex++;
          logger.success(`    Created expression item: ${childId}`);
        }

      } else if (t.isJSXSpreadChild(child)) {
        logger.info(`    Found spread child: ${generate(child.expression).code}`);
        // Handle spread children {...items}
        const spreadCode = generate(child.expression).code;
        const childId = `${parentId}-spread-${containerChildIndex}`;

        const item = {
          id: childId,
          type: 'item',
          componentType: 'span',
          containerIds: [],
          props: {},
          state: { variables: {}, functions: {} },
          children: [{ type: 'variable', reference: `...${spreadCode}` }]
        };

        this.state.items[childId] = item;
        insertAtIndex(this.state.containers[containerId], childId, containerChildIndex);
        containerChildIndex++;
        logger.success(`    Created spread item: ${childId}`);

      } else {
        logger.warn(`    Unknown child type: ${child.type} at index ${originalIndex}`);
        skippedChildren++;
      }
    });

    logger.success(`Completed processing children for ${containerId}:`);
    logger.info(`  - Added ${containerChildIndex} items to container`);
    logger.info(`  - Skipped ${skippedChildren} children (text/empty)`);
    logger.info(`  - Container now has: [${this.state.containers[containerId].join(', ')}]`);
  }

  determineShouldBeContainer(isFragment, elementType, hasDynamicChildren, hasJSXChildren, elementId) {
    // Fragments are always containers
    if (isFragment) return true;

    // Elements with dynamic children (map/conditional) are always containers
    if (hasDynamicChildren) return true;

    // Custom components (PascalCase) are always containers when they have JSX children
    // This handles components like AppComponent, UserProfile, etc.
    if (/^[A-Z]/.test(elementType) && hasJSXChildren) {
      return true;
    }

    // Context providers/consumers are always containers
    if (elementType.includes('.Provider') || elementType.includes('.Consumer')) {
      return true;
    }

    // Check against known container types from context
    if (hasJSXChildren && this.ctx.isContainer(elementType)) {
      return true;
    }

    // Special HTML elements that should be containers when they have JSX children
    if (['select', 'optgroup', 'fieldset', 'datalist'].includes(elementType) && hasJSXChildren) {
      return true;
    }

    // Anchor tags with JSX children should be containers
    if (elementType === 'a' && hasJSXChildren) {
      return true;
    }

    // Check if there's already an existing item with this ID (for consistency)
    if (elementId && this.state.items[elementId]) {
      const originalType = this.state.items[elementId].type;
      if (originalType === 'panel' || originalType === 'item') {
        return (originalType === 'panel');
      }
    }

    return false;
  }

  processDynamicOperation(expression, parentPath, containerId, childIndex) {
    const operationType = getDynamicOperationType(expression);
    const dynamicId = this.ctx.generateDynamicId();

    logger.info(`Processing ${operationType} dynamic operation: ${dynamicId}`);

    let operation;

    if (operationType === 'conditional') {
      operation = this.processConditionalOperation(expression, parentPath, dynamicId);
    } else if (operationType === 'map') {
      operation = this.processMapOperation(expression, parentPath, dynamicId);
    } else {
      logger.warn(`Unknown dynamic operation type: ${operationType}`);
      return null;
    }

    if (!operation) return null;

    insertAtIndex(this.state.containers[containerId], dynamicId, childIndex);

    logger.success(`Created dynamic operation: ${dynamicId} (${operationType})`);
    return dynamicId;
  }

  processConditionalOperation(expression, parentPath, dynamicId, isNested = false) {
    let dynamicOperation = null;

    if (t.isLogicalExpression(expression) && expression.operator === '&&') {
      dynamicOperation = {
        type: 'conditional',
        condition: generate(expression.left).code,
        trueTemplateId: this.getOrCreateTemplateId(expression.right, parentPath),
        falseTemplateId: null
      };
    } else if (t.isConditionalExpression(expression)) {
      dynamicOperation = {
        type: 'conditional',
        condition: generate(expression.test).code,
        trueTemplateId: this.getOrCreateTemplateId(expression.consequent, parentPath),
        falseTemplateId: this.getOrCreateTemplateId(expression.alternate, parentPath)
      };
    }

    if (!dynamicOperation) return null;

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

    this.state.items[dynamicId] = dynamicItem;
    return dynamicOperation;
  }

  processMapOperation(expression, parentPath, dynamicId, isNested = false) {
    if (!t.isCallExpression(expression) || !t.isMemberExpression(expression.callee)) {
      return null;
    }

    const callback = expression.arguments[0];
    if (!callback || (!t.isArrowFunctionExpression(callback) && !t.isFunctionExpression(callback))) {
      return null;
    }

    let templateElement;
    let isDynamicOperation = false;

    if (t.isBlockStatement(callback.body)) {
      const returnStatement = callback.body.body.find(stmt => t.isReturnStatement(stmt));
      if (returnStatement && (t.isJSXElement(returnStatement.argument) || t.isJSXFragment(returnStatement.argument))) {
        templateElement = returnStatement.argument;
      }
    } else if (t.isJSXElement(callback.body) || t.isJSXFragment(callback.body)) {
      templateElement = callback.body;
    } else if (t.isLogicalExpression(callback.body) &&
      (t.isJSXElement(callback.body.right) || t.isJSXFragment(callback.body.right))) {
      const templatePath = createPathFromNode(callback, parentPath);
      const nestedDynamicId = this.ctx.generateDynamicId();
      isDynamicOperation = true;
      this.processConditionalOperation(callback.body, templatePath, nestedDynamicId, true);
      templateElement = nestedDynamicId;
    }

    if (!templateElement) {
      logger.warn('Could not extract template from map callback');
      return null;
    }

    const dynamicOperation = {
      type: 'map',
      dataSource: generate(expression.callee.object).code,
      itemVariable: callback.params[0]?.name || 'item',
      indexVariable: callback.params[1]?.name || null,
      templateId: isDynamicOperation ? templateElement : this.getOrCreateTemplateId(templateElement, parentPath)
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

    this.state.items[dynamicId] = dynamicItem;
    return dynamicOperation;
  }

  getOrCreateTemplateId(element, parentPath) {
    if (!element) return null;

    if (t.isJSXElement(element) || t.isJSXFragment(element)) {
      const templatePath = createPathFromNode(element, parentPath);
      return this.processJSXElement(templatePath, null, -1);
    }

    return generate(element).code;
  }

  getChildPath(parentPath, childIndex) {
    if (!parentPath?.get) {
      return createPathFromNode(parentPath.node.children[childIndex], parentPath);
    }

    try {
      return parentPath.get(`children.${childIndex}`);
    } catch (error) {
      logger.warn(`Failed to get child path at index ${childIndex}, creating manual path`);
      return createPathFromNode(parentPath.node.children[childIndex], parentPath);
    }
  }

  processAttributes(attributes) {
    const props = {};

    logger.info(`Processing ${attributes.length} attributes`);

    attributes.forEach(attr => {
      if (t.isJSXAttribute(attr)) {
        if (attr.name.name === 'data-component-id') return;

        const propName = attr.name.name;

        if (t.isStringLiteral(attr.value)) {
          props[propName] = {
            type: 'static',
            value: attr.value.value
          };
          logger.info(`  - Static prop: ${propName} = "${attr.value.value}"`);
        } else if (t.isJSXExpressionContainer(attr.value)) {
          const processedValue = this.processExpression(attr.value.expression, propName);
          if (processedValue) {
            props[propName] = processedValue;
            logger.info(`  - Expression prop: ${propName} = ${processedValue.type}`);
          }
        } else if (attr.value === null) {
          props[propName] = {
            type: 'static',
            value: true
          };
          logger.info(`  - Boolean prop: ${propName} = true`);
        }
      }
    });

    return props;
  }

  processExpression(expression, propName) {
    const code = generate(expression).code;
    return {
      type: 'variable',
      reference: code
    };
  }

  processContent(children, itemState, itemId) {
    logger.info(`Processing content for ${itemId} with ${children.length} children`);

    const result = {
      hasDynamicChildren: false,
      hasJSXChildren: false,
      staticChildren: []
    };

    children.forEach((child) => {
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

      if (t.isJSXElement(child) || t.isJSXFragment(child)) {
        result.hasJSXChildren = true;
        logger.info(`  - Found JSX child (processed separately)`);
        return;
      }

      if (t.isJSXExpressionContainer(child)) {
        const expression = child.expression;

        if (isDynamicOperation(expression)) {
          result.hasDynamicChildren = true;
          logger.info(`  - Found dynamic operation: ${getDynamicOperationType(expression)}`);
          return;
        }

        if (t.isJSXElement(expression) || t.isJSXFragment(expression)) {
          result.hasJSXChildren = true;
          logger.info(`  - Found JSX in expression`);
          return;
        }

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
  }
}

//helper function to get the JSXElement Type
function getJSXElementType(node) {
  if (t.isJSXFragment(node)) {
    return 'Fragment';
  }

  if (!node.openingElement) {
    return 'UnknownElement';
  }

  const nameNode = node.openingElement.name;

  if (t.isJSXIdentifier(nameNode)) {
    return nameNode.name;
  } else if (t.isJSXMemberExpression(nameNode)) {
    const parts = [];
    let current = nameNode;

    while (t.isJSXMemberExpression(current)) {
      parts.unshift(current.property.name);
      current = current.object;
    }

    if (t.isJSXIdentifier(current)) {
      parts.unshift(current.name);
    }

    return parts.join('.');
  }

  return 'UnknownElement';
}

/**
 * Helper function to evaluate JS expressions safely
 */
const evaluateExpression = (code) => {
  if (!code) return undefined;

  const trimmed = code.trim();
  logger.debug('Evaluating expression', { code: trimmed });

  try {
    // Explicit null/undefined
    if (trimmed === 'null') return logAndReturn(null, 'null');
    if (trimmed === 'undefined') return logAndReturn(undefined, 'undefined');

    // String literals (single or double quotes)
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return logAndReturn(JSON.parse(trimmed.replace(/^'|'$/g, '"')), 'string');
    }

    // Booleans / Numbers
    if (/^(true|false|-?\d+(\.\d+)?$)/.test(trimmed)) {
      return logAndReturn(JSON.parse(trimmed), 'primitive');
    }

    // Arrays
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return tryJsonThenEval(trimmed, 'array');
    }

    // Objects
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return tryJsonThenEval(trimmed, 'object', true);
    }

    // Functions
    if (trimmed.includes('=>') || trimmed.includes('function')) {
      return logAndReturn(trimmed, 'function string');
    }

    // Default: keep as string
    return logAndReturn(trimmed, 'expression string');

  } catch (e) {
    logger.warn('Failed to evaluate expression, keeping as string', {
      code: trimmed,
      error: e.message
    });
    return trimmed;
  }

  // Helper functions
  function logAndReturn(value, type) {
    logger.success(`Evaluated as ${type}`, { result: value });
    return value;
  }

  function tryJsonThenEval(str, type, fixKeys = false) {
    try {
      let jsonCode = fixKeys
        ? str.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g, '$1"$2"$3')
          .replace(/'/g, '"')
        : str.replace(/'/g, '"');

      return logAndReturn(JSON.parse(jsonCode), type);
    } catch {
      logger.debug(`JSON.parse failed for ${type}, trying eval`);
      const result = eval(`(${str})`);
      return logAndReturn(result, `${type} via eval`);
    }
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
      plugins: ["jsx", "typescript"]
    });

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
 * Convert AST to Canvas State - Optimized Version
 */
export function convertASTToCanvasState(ast) {
  logger.step('A', "INITIALIZING CANVAS STATE CONVERSION");

  // Validate AST structure
  if (!ast?.program?.body) {
    logger.error('Invalid AST structure - missing program.body');
    return null;
  }

  // Initialize state and context
  const state = {
    items: {},
    containers: { 'root-container': [] }
  };

  const ctx = createConversionContext();

  logger.info('Initial state structure created', {
    stateKeys: Object.keys(state),
    containers: Object.keys(state.containers)
  });

  // Execute conversion steps
  setupRootPanel(state, ctx);
  extractImportsAndDeclarations(ast, ctx);
  processJSXElements(ast, state, ctx);
  processImports(state, ctx);
  distributeStateVariables(state, ctx);
  finalizeState(state, ctx);

  return state;
}

/**
 * Create a context object with all counters and tracking maps
 */
function createConversionContext() {
  const ctx = {
    // Counters
    counters: {
      dynamic: 0,
      element: 1,
      panel: 1,
      variable: 0,
      containers: new Map()
    },

    // Tracking
    tracking: {
      usedIds: new Set(),
      originalIds: new Map(),
      allElementIds: new Map(),
      componentVariables: new Map(),
      componentTypesUsed: new Set(),
      processedElements: new Set(),
      declarations: new Map(),
      imports: []
    },

    // Component type definitions
    componentTypes: getComponentTypes()
  };

  // Bind ID generators to context
  ctx.generateDynamicId = () => `dynamic-${++ctx.counters.dynamic}`;

  ctx.generateElementId = () => {
    const existingIds = Array.from(ctx.tracking.allElementIds.values());
    let newId;
    do {
      newId = `element-${ctx.counters.element++}`;
    } while (existingIds.includes(newId));
    logger.success(`Generated new ID: ${newId}`);
    return newId;
  };

  ctx.generatePanelId = (originalId) => {
    if (originalId && !ctx.tracking.usedIds.has(originalId)) {
      ctx.tracking.usedIds.add(originalId);
      logger.success(`Using original ID: ${originalId}`);
      return originalId;
    }

    let newId;
    do {
      newId = `panel-${ctx.counters.panel++}`;
    } while (ctx.tracking.usedIds.has(newId));

    ctx.tracking.usedIds.add(newId);
    logger.success(`Generated new ID: ${newId}`);
    return newId;
  };

  ctx.generateContainerId = (panelId) => {
    const count = ctx.counters.containers.get(panelId) || 0;
    ctx.counters.containers.set(panelId, count + 1);
    const containerId = `${panelId}-container-${count + 1}`;
    ctx.tracking.usedIds.add(containerId);
    logger.info(`Generated container ID: ${containerId} for panel: ${panelId}`);
    return containerId;
  };

  ctx.isContainer = (elementType) => {
    return ctx.componentTypes[elementType]?.isContainer || false;
  };

  return ctx;
}

/**
 * Get component types configuration
 */
function getComponentTypes() {
  const containerTypes = [
    'div', 'p', 'section', 'ul', 'li', 'table', 'tr', 'td', 'form',
    'header', 'nav', 'a', 'button', 'ol', 'dl', 'figure', 'blockquote',
    'pre', 'article', 'aside', 'main', 'footer', 'address', 'canvas',
    'audio', 'video', 'object', 'math', 'svg', 'symbol', 'defs', 'g',
    'select', 'Link'
  ];

  const nonContainerTypes = [
    'span', 'input', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'textarea', 'dt', 'dd', 'figcaption', 'code', 'cite', 'q', 'em',
    'strong', 'small', 'abbr', 'time', 'mark', 'ruby', 'rt', 'rp',
    'br', 'hr', 'wbr', 'source', 'track', 'embed', 'param', 'iframe',
    'path', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect',
    'use', 'Image'
  ];

  const types = {};
  containerTypes.forEach(type => types[type] = { isContainer: true });
  nonContainerTypes.forEach(type => types[type] = { isContainer: false });

  logger.info('Component types mapping loaded', {
    totalTypes: Object.keys(types).length,
    containerTypes: containerTypes.length
  });

  return types;
}

/**
 * Step B: Setup root panel
 */
function setupRootPanel(state, ctx) {
  logger.step('B', "SETTING UP ROOT PANEL");

  ctx.tracking.usedIds.add(ROOT_PANEL_ID);
  ctx.tracking.usedIds.add(ROOT_CONTAINER_ID);

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
    imports: [],
    state: {
      variables: {},
      functions: {}
    }
  };

  logger.success('Root panel created', {
    rootPanelId: ROOT_PANEL_ID,
    containerIds: state.items[ROOT_PANEL_ID].containerIds
  });
}

/**
 * Step C: Extract imports and declarations
 */
function extractImportsAndDeclarations(ast, ctx) {
  logger.step('C', "FIRST PASS: EXTRACTING IMPORTS AND DECLARATIONS");

  const visitors = {
    ImportDeclaration: createImportVisitor(ctx),
    VariableDeclaration: createVariableVisitor(ctx),
    FunctionDeclaration: createFunctionVisitor(ctx),
    ExpressionStatement: createEffectHookVisitor(ctx),
    JSXElement: createJSXElementIdVisitor(ctx),
    JSXFragment: createJSXFragmentIdVisitor(ctx),
    JSXAttribute: createJSXAttributeVisitor(ctx),
    JSXExpressionContainer: createJSXExpressionVisitor(ctx)
  };

  traverse(ast, visitors);

  logger.success('First pass completed', {
    importsFound: ctx.tracking.imports.length,
    declarationsFound: ctx.tracking.declarations.size,
    originalIdsFound: ctx.tracking.originalIds.size
  });
}

/**
 * Create import visitor
 */
function createImportVisitor(ctx) {
  return function(path) {
    const source = path.node.source.value;
    const importSpecifiers = [];
    let defaultImport;

    logger.info(`Processing import: ${source}`);

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

    ctx.tracking.imports.push({
      source,
      specifiers: importSpecifiers,
      defaultImport
    });

    logger.success(`Import processed: ${source}`, {
      defaultImport,
      namedImports: importSpecifiers.length
    });
  };
}

/**
 * Create variable visitor
 */
function createVariableVisitor(ctx) {
  return function(path) {
    const scopeCheck = isComponentLevel(path);
    if (!scopeCheck.isValid) return;

    // Each variable declaration node has a `kind` (const/let/var)
    const declarationKind = path.node.kind;
    const isRootLevel = scopeCheck.isRootLevel

    logger.info('Processing variable declaration');

    path.node.declarations.forEach((declaration) => {
      processVariableDeclaration(declaration, declarationKind, isRootLevel, ctx);
    });
  };
}

/**
 * Process variable declaration
 */
function processVariableDeclaration(declaration, declarationKind, isRootLevel, ctx) {
  const { id, init } = declaration;
  if (!init) return;

  // Identifier-based (e.g., const x = ...)
  if (t.isIdentifier(id)) {
    handleIdentifierDeclaration(id, init, declarationKind, isRootLevel, ctx);
    return;
  }

  // Array Destructuring (e.g., const [x, setX] = useState(...))
  if (t.isArrayPattern(id)) {
    handleArrayPatternDeclaration(id, init, declarationKind, isRootLevel, ctx);
    return;
  }

  // Object Destructuring (e.g., const { theme } = useContext(...))
  if (t.isObjectPattern(id)) {
    handleObjectPatternDeclaration(id, init, declarationKind, isRootLevel, ctx);
    return;
  }

  logger.warn(`Unhandled declaration.id type: ${id.type}`);
}

/**
 * Handle identifier declaration
 */
function handleIdentifierDeclaration(id, init, declarationKind, isRootLevel, ctx) {
  const varName = id.name;

  if (t.isCallExpression(init)) {
    const callee = init.callee;

    // --- Hook calls
    const hookTypes = new Set([
      'useState', 'useRef', 'useMemo', 'useCallback',
      'useContext', 'useId', 'useSyncExternalStore',
      'useDeferredValue', 'useTransition'
    ]);

    if (t.isIdentifier(callee) && hookTypes.has(callee.name)) {
      storeHook(ctx, {
        hookType: callee.name,
        varName,
        args: init.arguments,
        declarationKind,
      });
      return;
    }

    // --- React.* method calls
    if (t.isMemberExpression(callee) &&
      t.isIdentifier(callee.object) &&
      callee.object.name === 'React') {
      handleReactMemberCall(varName, declarationKind, callee, init.arguments, ctx);
      return;
    }
  }


  // --- Fallback: everything else → basic
  const rawValue = generate(init).code;
  const evaluated = rawValue ? evaluateExpression(rawValue) : null;

  ctx.tracking.declarations.set(varName, {
    type: 'basic',
    value: evaluated,
    declarationKind,
    isRootLevel,
  });

  logger.success(`Stored fallback basic variable: ${varName}`);
}



/**
 * Handle array pattern declaration
 */
function handleArrayPatternDeclaration(id, init, declarationKind, isRootLevel, ctx) {
  // React hook cases
  const callee = init.callee;

  if (t.isIdentifier(callee, { name: 'useState' })) {
    const [stateVar, setterVar] = id.elements.map(el => el?.name);
    if (!stateVar || !setterVar) return logger.warn('Incomplete useState destructuring');

    storeHook(ctx, {
      hookType: 'useState',
      varName: stateVar,
      setterOverride: setterVar,
      args: init.arguments,
      declarationKind,
      isRootLevel
    });
    return;
  }

  if (t.isIdentifier(callee, { name: 'useReducer' })) {
    const [stateVar, dispatchVar] = id.elements.map(el => el?.name);
    if (!stateVar || !dispatchVar) return logger.warn('Incomplete useReducer destructuring');

    ctx.tracking.declarations.set(stateVar, {
      type: 'useReducer',
      reducer: generate(init.arguments[0]).code,
      value: init.arguments[1] ? generate(init.arguments[1]).code : undefined,
      dispatch: dispatchVar,
      declarationKind,
      isRootLevel
    });

    logger.success(`Stored useReducer: ${stateVar}`);
    return;
  }

  if (t.isIdentifier(callee, { name: 'useTransition' })) {
    const [pendingVar, startTransitionVar] = id.elements.map(el => el?.name);
    if (!pendingVar || !startTransitionVar) {
      return logger.warn('Incomplete useTransition destructuring');
    }

    ctx.tracking.declarations.set(pendingVar, {
      type: 'useTransition',
      value: false,
      startTransition: startTransitionVar,
      declarationKind,
      isRootLevel
    });

    logger.success(`Stored useTransition: ${pendingVar}, ${startTransitionVar}`);
    return;
  }

  // Fallback for other function calls in destructuring
  // for simple like:
  // [a,b] = [x,y]
  // [a,b] = func()
  // [a,b] = object.value
  const varNames = id.elements
    .filter(el => el && t.isIdentifier(el))
    .map(el => el.name);

  if (!varNames.length) return logger.warn('No variables found in array destructuring');

  const valueCode = generate(init).code;
  const entryName = varNames.join('_');

  ctx.tracking.declarations.set(entryName, {
    type: 'arrayDestructuring',
    variables: varNames,
    value: valueCode,
    declarationKind,
    isRootLevel
  });

  logger.success(`Stored array destructuring (function call) as '${entryName}': ${varNames.join(', ')} from ${valueCode}`);
}


/**
 * Handle object pattern declaration
 */
function handleObjectPatternDeclaration(id, init, declarationKind, isRootLevel, ctx) {
  // Handle call expressions like useContext
  if (t.isCallExpression(init)) {
    const callee = init.callee;

    if (t.isIdentifier(callee, { name: 'useContext' })) {
      const contextArg = init.arguments[0] ? generate(init.arguments[0]).code : null;

      const properties = id.properties
        .filter(p => t.isObjectProperty(p) && t.isIdentifier(p.key))
        .map(p => p.key.name);

      if (!properties.length) return logger.warn('No extractable properties in object pattern');

      // Collapse into single entry
      const entryName = properties.join('-')/*  + '-' + uuidv4() */;

      ctx.tracking.declarations.set(entryName, {
        type: 'useContext',
        variables: properties,
        value: contextArg,
        declarationKind,
        isRootLevel
      });

      logger.success(`Stored useContext destructuring as '${entryName}' with props: ${properties.join(', ')}`);
      return;
    }
  }

  // Regular object destructuring: const {a, b, c} = obj;
  const varNames = id.properties
    .filter(p => t.isObjectProperty(p) && t.isIdentifier(p.key))
    .map(p => p.key.name);

  if (!varNames.length) return logger.warn('No variables found in object destructuring');

  const entryName = varNames.join('-')
  const valueCode = generate(init).code;

  ctx.tracking.declarations.set(entryName, {
    type: 'objectDestructuring',
    variables: varNames,
    value: valueCode,
    declarationKind,
    isRootLevel
  });

  logger.success(`Stored object destructuring as '${entryName}': ${varNames.join(', ')}`);
}



/**
 * Store hook declaration
 */
function storeHook(ctx, { hookType, varName, args, setterOverride, declarationKind }) {
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

  const entry = { type: hookType, declarationKind };

  switch (hookType) {
    case 'useState':
      if (isIdentifierRef) {
        entry.reference = arg0Code;
      } else {
        entry.value = evaluatedValue;
      }
      entry.setter = setterOverride || `set${varName.charAt(0).toUpperCase() + varName.slice(1)}`;
      break;

    case 'useRef':
      if (isIdentifierRef) {
        entry.reference = arg0Code;
      } else {
        entry.value = evaluatedValue;
      }
      break;

    case 'useMemo':
    case 'useCallback':
      entry.value = arg0Code;
      entry.dependencies = deps;
      break;

    case 'useContext':
      entry.value = arg0Code || null;
      break;

    case 'useId':
      // entry.value = `generated-id-${varName}`;
      break;

    case 'useSyncExternalStore':
      entry.subscribe = args[0] ? generate(args[0]).code : null;
      entry.getSnapshot = args[1] ? generate(args[1]).code : null;
      entry.getServerSnapshot = args[2] ? generate(args[2]).code : null;
      break;

    case 'useDeferredValue':
      entry.value = arg0Code;
      break;

    case 'useTransition':
      entry.value = false;
      entry.startTransition = setterOverride || `startTransition`;
      break;

    default:
      logger.warn(`Unhandled hook type: ${hookType}`);
      return;
  }

  ctx.tracking.declarations.set(varName, entry);
  logger.success(`Stored ${hookType}: ${varName}`);
}


/**
 * Handle React member call
 */
function handleReactMemberCall(varName, declarationKind, callee, args, ctx) {
  const object = callee.object.name;
  const method = callee.property.name;
  const argCodes = args.map(arg => generate(arg).code);

  if (object === 'React') {
    ctx.tracking.declarations.set(varName, {
      type: 'react_method',
      value: `${object}.${method}`,
      method,
      arguments: argCodes,
      declarationKind,
    });
    logger.success(`Stored React method: ${varName}`);
  }
}

/**
 * Create function visitor
 */
function createFunctionVisitor(ctx) {
  return function(path) {
    const scopeCheck = isComponentLevel(path);
    if (!scopeCheck.isValid) return;
    const isRootLevel = scopeCheck.isRootLevel;

    logger.info('Processing function declaration');

    const functionName = path.node.id?.name;
    if (!functionName) return;

    // Skip component functions
    if (/^[A-Z]/.test(functionName)) {
      logger.info(`  Skipping component function: ${functionName}`);
      return;
    }

    logger.info(`  Processing function: ${functionName}`);



    const functionBody = generate(path.node).code;


    // Store separately
    ctx.tracking.declarations.set(functionName, {
      type: 'function',
      reference: functionBody,
      isRootLevel
    });

    logger.success(`    Stored function: ${functionName}`);
  };
}


/**
 * Create effect visitor
 */
function createEffectHookVisitor(ctx) {
  return function(path) {
    const expr = path.node.expression;

    if (!t.isCallExpression(expr)) return;

    const calleeName = expr.callee.name;
    if (calleeName !== 'useEffect' &&
      calleeName !== 'useLayoutEffect' &&
      calleeName !== 'useInsertionEffect'
    ) return;

    const effectId = `effect-${ctx.counters.variable++}`;
    logger.info(`Processing ${calleeName}: ${effectId}`);

    // Get effect body code
    let effectBody = null;
    if (expr.arguments[0]) {
      effectBody = generate(expr.arguments[0]).code;
    }

    // Get dependencies array
    let dependencies = [];
    if (expr.arguments[1] && t.isArrayExpression(expr.arguments[1])) {
      dependencies = expr.arguments[1].elements?.map(el => {
        if (!el) return null;
        return t.isIdentifier(el) ? el.name : generate(el).code;
      }).filter(Boolean) || [];
    }

    // Store in tracking context
    ctx.tracking.declarations.set(effectId, {
      type: calleeName,  // useEffect or useLayoutEffect
      body: effectBody,
      dependencies
    });

    logger.success(`Stored ${calleeName}: ${effectId}`);
  };
}


/**
 * Create JSX element ID visitor
 */
function createJSXElementIdVisitor(ctx) {
  return function(path) {
    const node = path.node;
    const nodeKey = `${node.start}-${node.end}`;

    if (ctx.tracking.allElementIds.has(nodeKey)) return;

    let dataComponentId = null;
    const attributes = node.openingElement.attributes;

    for (const attr of attributes) {
      if (
        t.isJSXAttribute(attr) &&
        attr.name.name === "data-component-id" &&
        t.isStringLiteral(attr.value)
      ) {
        dataComponentId = attr.value.value;
        break;
      }
    }

    // --- Figure out element type properly
    const elementType = getJSXElementType(node);

    let elementId;
    if (dataComponentId) {
      elementId = dataComponentId;
      ctx.tracking.originalIds.set(nodeKey, elementId);
      logger.info(`Found original data-component-id: ${elementId}`);
    } else {
      elementId = ctx.generateElementId();
      logger.info(`Generated ID for ${elementType}: ${elementId}`);
    }

    ctx.tracking.allElementIds.set(nodeKey, elementId);
  };
}


/**
 * Create JSX fragment ID visitor
 */
function createJSXFragmentIdVisitor(ctx) {
  return function(path) {
    const node = path.node;
    const nodeKey = `${node.start}-${node.end}`;

    if (ctx.tracking.allElementIds.has(nodeKey)) return;

    const fragmentId = ctx.generateElementId();
    ctx.tracking.allElementIds.set(nodeKey, fragmentId);
    logger.info(`Generated ID for fragment: ${fragmentId}`);
  };
}

/**
 * Create JSX attribute visitor
 */
function createJSXAttributeVisitor(ctx) {
  return function(path) {
    if (path.node.value && t.isJSXExpressionContainer(path.node.value)) {
      if (t.isIdentifier(path.node.value.expression)) {
        const varName = path.node.value.expression.name;

        if (ctx.tracking.declarations.has(varName)) {
          const jsxElement = path.findParent(p => p.isJSXElement()).node;
          const nodeKey = `${jsxElement.start}-${jsxElement.end}`;
          const elementID = ctx.tracking.allElementIds.get(nodeKey);

          if (elementID) {
            if (!ctx.tracking.componentVariables.has(elementID)) {
              ctx.tracking.componentVariables.set(elementID, new Set());
            }
            ctx.tracking.componentVariables.get(elementID).add(varName);
            logger.info(`Associated attribute variable ${varName} with component ${elementID}`);
          }
        }
      }
    }
  };
}

/**
 * Create JSX expression visitor
 */
function createJSXExpressionVisitor(ctx) {
  return function(path) {
    if (t.isIdentifier(path.node.expression)) {
      const varName = path.node.expression.name;

      if (ctx.tracking.declarations.has(varName)) {
        const jsxElementPath = path.findParent(p => p.isJSXElement());

        if (jsxElementPath) {
          const jsxElement = jsxElementPath.node;
          const nodeKey = `${jsxElement.start}-${jsxElement.end}`;
          const elementID = ctx.tracking.allElementIds.get(nodeKey);

          if (elementID) {
            if (!ctx.tracking.componentVariables.has(elementID)) {
              ctx.tracking.componentVariables.set(elementID, new Set());
            }
            ctx.tracking.componentVariables.get(elementID).add(varName);
            logger.info(`Associated variable ${varName} with component ${elementID}`);
          }
        }
      }
    }
  };
}

/**
 * Step D: Process JSX elements
 */
function processJSXElements(ast, state, ctx) {
  logger.step('D', "SECOND PASS: PROCESSING JSX ELEMENTS");

  const processor = new JSXProcessor(state, ctx);

  traverse(ast, {
    JSXElement(path) {
      if (path.parent.type !== 'JSXElement' && path.parent.type !== 'JSXFragment') {
        logger.info('Found top-level JSX element');
        processor.processJSXElement(path);
      }
    },
    JSXFragment(path) {
      if (path.parent.type !== 'JSXElement' && path.parent.type !== 'JSXFragment') {
        logger.info('Found top-level JSX fragment');
        processor.processJSXElement(path);
      }
    }
  });

  logger.success('Second pass completed', {
    elementsProcessed: ctx.tracking.processedElements.size,
    totalItems: Object.keys(state.items).length,
    totalContainers: Object.keys(state.containers).length
  });
}


/**
 * Helper function to check if element is dynamic operation
 */
function isDynamicOperation(expression) {
  return getDynamicOperationType(expression) !== 'unknown';
}

/**
 * Get dynamic operation type
 */
function getDynamicOperationType(expression) {
  if (t.isLogicalExpression(expression) && expression.operator === '&&') {
    if (t.isJSXElement(expression.right) || t.isJSXFragment(expression.right)) {
      return 'conditional';
    }
  }

  if (t.isConditionalExpression(expression)) {
    if (t.isJSXElement(expression.consequent) || t.isJSXFragment(expression.consequent) ||
      t.isJSXElement(expression.alternate) || t.isJSXFragment(expression.alternate)) {
      return 'conditional';
    }
  }

  if (t.isCallExpression(expression) &&
    t.isMemberExpression(expression.callee) &&
    t.isIdentifier(expression.callee.property, { name: 'map' })) {
    return 'map';
  }

  return 'unknown';
}

/**
 * Create path from node
 */
function createPathFromNode(node, parentPath = null) {
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
}

/**
 * Insert at index helper
 */
function insertAtIndex(array, item, index) {
  if (index < 0 || !array) return;

  if (index >= array.length) {
    array.push(item);
  } else {
    array.splice(index, 0, item);
  }
}

/**
 * Step E: Process imports
 */
function processImports(state, ctx) {
  logger.step('E', "PROCESSING IMPORTS");

  const autoDetectedImports = [];

  if (ctx.tracking.componentTypesUsed.has('Image')) {
    autoDetectedImports.push({
      source: 'next/image',
      specifiers: [],
      defaultImport: 'Image'
    });
  }

  if (ctx.tracking.componentTypesUsed.has('Link')) {
    autoDetectedImports.push({
      source: 'next/link',
      specifiers: [],
      defaultImport: 'Link'
    });
  }

  const allImports = [...ctx.tracking.imports, ...autoDetectedImports];
  logger.step('ALL_IMPORTS', allImports);

  const uniqueImports = mergeImports(allImports);
  logger.step('UNIQUE_IMPORTS', uniqueImports);

  if (uniqueImports.length > 0) {
    state.items[ROOT_PANEL_ID].imports = uniqueImports;
    logger.success(`Added ${uniqueImports.length} imports to root panel`);
  }
}

/**
 * Step G: Distribute state variables
 */
function distributeStateVariables(_state, _ctx) {
  logger.step('G', "DISTRIBUTING STATE VARIABLES");

  // Currently not distributing to individual components
  // All variables stay at root level
}

/**
 * Step H: Finalize state
 */
function finalizeState(state, ctx) {
  logger.step('H', "FINALIZING STATE");

  // Add remaining state variables to root panel
  ctx.tracking.declarations.forEach((declaration, name) => {
    if (declaration.type === 'useEffect' ||
      declaration.type === 'useLayoutEffect' ||
      declaration.type === 'useInsertionEffect'
    ) {
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
      const ownerItem = Object.values(state.items).find(item =>
        item.containerIds && item.containerIds.includes(containerId)
      );

      if (ownerItem && ownerItem.type === 'panel') {
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

  logger.success('Canvas state conversion completed', {
    totalItems: Object.keys(state.items).length,
    totalContainers: Object.keys(state.containers).length,
    cleanedContainers,
    itemTypes: Object.values(state.items).reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {})
  });
}

/**
 * Merges duplicate imports from the same source into single import statements
 */
function mergeImports(allImports) {
  const mergedImports = new Map();

  allImports.forEach(imp => {
    const source = imp.source;

    if (mergedImports.has(source)) {
      const existing = mergedImports.get(source);

      // Merge specifiers and remove duplicates
      const allSpecifiers = [
        ...(existing.specifiers || []),
        ...(imp.specifiers || [])
      ];
      const uniqueSpecifiers = allSpecifiers.filter((spec, index, arr) =>
        arr.findIndex(s => s.name === spec.name) === index
      );

      // Handle default imports
      const defaultImport = existing.defaultImport || imp.defaultImport;

      // Warn on conflicting defaults
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
      // First occurrence - add to map
      mergedImports.set(source, {
        source: imp.source,
        specifiers: [...(imp.specifiers || [])],
        defaultImport: imp.defaultImport
      });
    }
  });

  return Array.from(mergedImports.values());
}

/**
 * Checks if the current path is at React component level (top-level function)
 * Components must be PascalCase functions with no parent functions
 */
function isComponentLevel(path) {
  let functionDepth = 0;
  let currentPath = path;

  // Count how many functions deep we are
  while (currentPath.parentPath) {
    currentPath = currentPath.parentPath;

    const isFunction =
      currentPath.isFunctionDeclaration() ||
      currentPath.isFunctionExpression() ||
      currentPath.isArrowFunctionExpression();

    if (isFunction) {
      functionDepth++;

      // If we're more than 1 function deep, it's invalid
      // This catches increment inside use_custom_counter
      if (functionDepth > 1) {
        return {
          isValid: false,
          componentName: null,
          isRootLevel: false
        };
      }
    }
  }

  // Only valid if we're at the top level (functionDepth 0) 
  // or inside the first level of a function (functionDepth 1)
  return {
    isValid: functionDepth <= 1,
    componentName: null,
    isRootLevel: functionDepth === 0
  };
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
      if (item?.type === 'panel' && item.containerIds) {
        for (const containerId of item.containerIds) {
          const containerChildren = state.containers[containerId] || [];
          collectReachableItems(containerChildren);
        }
      }
    }
  };

  // Start traversal from root container
  const rootContainerIds = state.items['root-panel']?.containerIds || [];
  for (const containerId of rootContainerIds) {
    collectReachableItems(state.containers[containerId] || []);
  }

  return reachableItems;
}

/**
 * Get display name for an item based on its type and properties
 */
export function getItemDisplayName(item) {
  if (!item) return 'Unknown';

  // For dynamic operations, show the operation type
  if (item.type === 'dynamic-operation' && item.operation) {
    const { type, dataSource, condition } = item.operation;

    if (type === 'map') return `Map: ${dataSource}`;
    if (type === 'conditional') return `If: ${condition}`;
  }

  // For regular items, show component type
  return item.componentType || item.id;
}

/**
 * Check if an item is the root component
 */
export function isRootComponent(itemId, state) {
  // Check if it's literally the root panel
  if (itemId === 'root-panel') return true;

  // Check if this item is the only top-level item in ROOT_CONTAINER_ID
  const rootContainer = state.containers[ROOT_CONTAINER_ID];
  return rootContainer?.length === 1 && rootContainer[0] === itemId;
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
    // Extract component name from the path
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
 * Generate React code for a canvas state using the server-side conversion
 * @param {Object} Parse - Parse instance from useParse hook
 * @param {Object} canvasState - The canvas state to convert
 * @param {string} componentName - Name of the component
 * @param {string} selectedItemId - ID of selected item (optional)
 * @param {boolean} extractSubtree - Whether to extract just the selected subtree
 * @returns {Promise<{success: boolean, fullCode?: string, imports?: string, code?: string, error?: string}>}
 */
export async function generateComponentCode(
  Parse,
  canvasState,
  componentName,
  selectedItemId = null,
  extractSubtree = false
) {
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
 * Extracts the component name from file content
 * @param {string} fileCode - The source code of the file
 * @param {string} filePath - The path of the file
 */
export const extractComponentName = (fileCode, filePath) => {
  const result = {
    componentName: '',
    isUtilFile: false
  };

  // Check if this is a utility file (no default export)
  result.isUtilFile = !fileCode.includes('export default');

  if (!result.isUtilFile) {
    // Try to extract default export name using regex patterns

    // Pattern 1: export default function ComponentName()
    const exportDefaultFunctionMatch = fileCode.match(
      /export\s+default\s+function\s+([A-Za-z0-9_]+)/
    );
    if (exportDefaultFunctionMatch?.[1]) {
      result.componentName = exportDefaultFunctionMatch[1];
      return result;
    }

    // Pattern 2: export default ComponentName
    const exportDefaultMatch = fileCode.match(
      /export\s+default\s+([A-Za-z0-9_]+)/
    );
    if (exportDefaultMatch?.[1]) {
      result.componentName = exportDefaultMatch[1];
      return result;
    }

    // Pattern 3: const/function ComponentName = ... followed by export default ComponentName
    const namedComponentMatch = fileCode.match(
      /(const|function|class)\s+([A-Za-z0-9_]+)[\s\S]*?export\s+default\s+\2/
    );
    if (namedComponentMatch?.[2]) {
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

      // Convert to PascalCase
      if (result.componentName.includes('-')) {
        result.componentName = result.componentName
          .split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');
      } else {
        result.componentName =
          result.componentName.charAt(0).toUpperCase() +
          result.componentName.slice(1);
      }
    }
  }

  return result;
};

