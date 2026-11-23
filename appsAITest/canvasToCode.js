import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const filename = process.argv[2];

  if (!filename) {
    console.error('Usage: node convertToCode.js <filepath>');
    console.error('Example: node convertToCode.js inputs/test1.js');
    process.exit(1);
  }

  // Use the full path provided by user
  const inputFile = path.resolve(filename);

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${filename}`);
    process.exit(1);
  }

  // Dynamically import the specific file
  console.log(`📂 Loading state from ${filename}`);
  try {
    const fileUrl = `file://${inputFile}`;
    const module = await import(fileUrl);
    const canvasState = module.state;

    if (!canvasState) {
      console.error('❌ No "state" export found in the file');
      process.exit(1);
    }

    console.log('✅ Canvas state loaded successfully');

    // Generate React code
    const result = generateComponentCode(canvasState, 'AppComponent', 'root', false);

    if (result.success) {
      // Create output directory if needed
      const outputDir = path.join(__dirname, 'outputCode');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const finalCode = result.fullCode || (result.imports + '\n\n' + result.code);

      // Extract filename without path and extension for output
      const baseName = path.basename(filename, '.js');


      const outputFile = path.join(outputDir, `${baseName}.jsx`);
      fs.writeFileSync(outputFile, finalCode);
      console.log(`✅ React code saved to ${outputFile}`);

      const code_dir = path.join(__dirname, 'testing-apps-ai-code', 'app');
      const code_file = path.join(code_dir, 'page.tsx')
      fs.writeFileSync(code_file, finalCode);
      console.log(`✅ React code saved to ${code_file}`);

    } else {
      console.error('❌ Error generating code:', result.error);
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error loading file:', error.message);
    process.exit(1);
  }
}

// Run the converter
main().catch(console.error);

function generateComponentCode(canvasState, componentName, selectedItemId, extractSubtree) {
  try {
    let stateToConvert = canvasState;

    // If extractSubtree is true and we have a selectedItemId, extract just that subtree
    if (extractSubtree && selectedItemId && selectedItemId !== 'root') {
      stateToConvert = extractComponentState(canvasState, selectedItemId);
    }

    // console.log('stateToConvert',stateToConvert)
    // console.log('componentName',componentName)
    const result = convertCanvasStateToReactCode(stateToConvert, componentName);
    // console.log('result',result)
    return {
      success: true,
      ...result
    };
  } catch (error) {
    console.error('Code generation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate code'
    };
  }
};

// Helper function to extract a subtree (same as in updatePageCode if needed)
function extractComponentState(fullState, componentId) {
  if (!fullState || !fullState.items || !fullState.items[componentId]) {
    return null;
  }

  const extractedState = {
    items: {},
    containers: {}
  };

  const processedItems = new Set();

  function extractItem(itemId) {
    if (processedItems.has(itemId) || !fullState.items[itemId]) {
      return;
    }

    processedItems.add(itemId);
    const item = fullState.items[itemId];
    extractedState.items[itemId] = item;

    if (item.containerIds && item.containerIds.length > 0) {
      item.containerIds.forEach(containerId => {
        if (fullState.containers[containerId]) {
          extractedState.containers[containerId] = fullState.containers[containerId];

          fullState.containers[containerId].forEach(childId => {
            extractItem(childId);
          });
        }
      });
    }
  }

  extractItem(componentId);
  return extractedState;
}

function convertCanvasStateToReactCode(canvasState, componentName) {
  // Handle edge case: empty or invalid state
  if (!canvasState || !canvasState.items || Object.keys(canvasState.items).length === 0) {
    return {
      imports: '',
      code: `export default function ${componentName}() {\n  return <div />;\n}`,
      fullCode: `export default function ${componentName}() {\n  return <div />;\n}`
    };
  }

  // Track all imports
  const allImports = new Map();

  // Helper to add an import to our collection
  function addImportToCollection(source, specifiers = [], defaultImport = null) {
    if (!allImports.has(source)) {
      allImports.set(source, {
        specifiers: new Set(),
        defaultImport
      });
    } else {
      const existing = allImports.get(source);
      // Only set default import if not already set
      if (defaultImport && !existing.defaultImport) {
        existing.defaultImport = defaultImport;
      }
    }

    // Add all specifiers to the set
    const importEntry = allImports.get(source);
    specifiers.forEach(spec => {
      if (typeof spec === 'string') {
        importEntry.specifiers.add(spec);
      } else {
        importEntry.specifiers.add(spec.name);
      }
    });
  }

  // Process imports - updated to handle extracted subtrees
  function collectImportsFromRootPanel() {
    if (!canvasState?.items) return;

    // First try root
    let itemWithImports = canvasState.items['root'];

    // If no root, check all items for imports (for extracted subtrees)
    if (!itemWithImports?.imports) {
      // Find any item that has imports
      for (const item of Object.values(canvasState.items)) {
        if (item?.imports && item.imports.length > 0) {
          itemWithImports = item;
          break;
        }
      }
    }

    if (itemWithImports?.imports) {
      // Process imports
      itemWithImports.imports.forEach(importSource => {
        addImportToCollection(
          importSource.source,
          importSource.specifiers?.map(s => s.name) || [],
          importSource.defaultImport
        );
      });
    }

    // Auto-detect imports based on component types used throughout the tree
    Object.values(canvasState.items).forEach(item => {
      if (!item) return;

      // Auto-detect imports based on component type
      if (item.componentType === 'Image') {
        addImportToCollection('next/image', [], 'Image');
      }
      else if (item.componentType === 'Link') {
        addImportToCollection('next/link', [], 'Link');
      }
      // Detect Lucide React component imports
      else if (/^[A-Z]/.test(item.componentType) &&
        !['Image', 'Link'].includes(item.componentType)) {
        // Check for known Lucide component types
        const lucideComponents = [
          'Menu', 'X', 'MapPin', 'Clock', 'Phone', 'Mail',
          'Instagram', 'Facebook', 'Twitter', 'Check', 'Heart',
          'Star', 'ArrowRight', 'ArrowLeft', 'ChevronDown', 'ChevronUp'
        ];

        if (lucideComponents.includes(item.componentType)) {
          addImportToCollection('lucide-react', [item.componentType], null);
        }
      }
    });
  }

  // Process used hooks to add React imports
  const componentLevelDeclarations = new Set()
  const rootLevelDeclarations = new Set()
  const hookImports = new Set();

  // Helper to safely stringify values
  function safeStringify(value) {
    if (value === undefined) return 'null';
    if (value === null) return 'null';

    try {
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }

      // For non-objects, return as is
      return String(value);
    } catch (e) {
      console.error('Error stringifying value:', e);
      return 'null';
    }
  }

  function processItemState(item) {
    if (!item?.state) return;

    // Process variables
    Object.entries(item.state.variables || {}).forEach(([id, variable]) => {
      if (!variable) return;

      const declarationSet = variable.isRootLevel ? rootLevelDeclarations : componentLevelDeclarations;

      switch (variable.type) {
        case 'useState':
          let initialValue;
          if (typeof variable.value === 'string') {
            initialValue = `"${variable.value.replace(/"/g, '\\"')}"`;
          } else {
            initialValue = safeStringify(variable.value);
          }

          declarationSet.add(
            `${variable.declarationKind} [${id}, ${variable.setter}] = useState(${initialValue});`
          );
          hookImports.add('useState');
          break;

        case 'useReducer':
          declarationSet.add(
            `${variable.declarationKind} [${id}, ${variable.dispatch}] = useReducer(${variable.reducer}, ${safeStringify(variable.value)});`
          );
          hookImports.add('useReducer');
          break;

        case 'useRef':
          declarationSet.add(
            `${variable.declarationKind} ${id} = useRef(${safeStringify(variable.value) || 'null'});`
          );
          hookImports.add('useRef');
          break;

        case 'useMemo':
        case 'useCallback':
          declarationSet.add(
            `${variable.declarationKind} ${id} = ${variable.type}(${variable.value}, [${(variable.dependencies || []).join(', ')}]);`
          );
          hookImports.add(variable.type);
          break;

        case 'useContext':
          // Context destructuring or single assignment
          if (variable.variables?.length) {
            declarationSet.add(
              `${variable.declarationKind} { ${variable.variables.join(', ')} } = useContext(${variable.value});`
            );
          } else {
            declarationSet.add(
              `${variable.declarationKind} ${id} = useContext(${variable.value});`
            );
          }
          hookImports.add('useContext');
          break;

        case 'useId':
          declarationSet.add(`${variable.declarationKind} ${id} = useId();`);
          hookImports.add('useId');
          break;

        case 'useSyncExternalStore':
          declarationSet.add(
            `${variable.declarationKind} ${id} = useSyncExternalStore(${variable.subscribe}, ${variable.getSnapshot}, ${variable.getServerSnapshot || 'undefined'});`
          );
          hookImports.add('useSyncExternalStore');
          break;

        case 'useDeferredValue':
          declarationSet.add(`${variable.declarationKind} ${id} = useDeferredValue(${variable.value});`);
          hookImports.add('useDeferredValue');
          break;

        case 'useTransition':
          declarationSet.add(
            `${variable.declarationKind} [${id}, ${variable.startTransition}] = useTransition();`
          );
          hookImports.add('useTransition');
          break;

        case 'react_method':
          declarationSet.add(
            `${variable.declarationKind} ${id} = ${variable.value}(${(variable.arguments || []).join(', ')});`
          );
          break;

        case 'context_provider':
          declarationSet.add(`${variable.declarationKind} ${id} = ${variable.source}(${variable.value});`);
          break;

        case 'function':
          declarationSet.add(`${variable.reference};`);
          break;

        case 'basic':
          declarationSet.add(
            `${variable.declarationKind} ${id} = ${safeStringify(variable.value)};`
          );
          break;

        case 'arrayDestructuring':
          declarationSet.add(
            `${variable.declarationKind} [${variable.variables.join(', ')}] = ${variable.value};`
          );
          break;

        case 'objectDestructuring':
          declarationSet.add(
            `${variable.declarationKind} { ${variable.variables.join(', ')} } = ${variable.value};`
          );
          break;
      }
    });


    // Process functions
    Object.entries(item.state.functions || {}).forEach(([id, func]) => {
      if (!func?.body) return;

      if (func.type === 'useEffect' ||
        func.type === 'useLayoutEffect' ||
        func.type === 'useInsertionEffect'
      ) {
        const deps = func.dependencies?.length ? `, [${func.dependencies.join(', ')}]` : ', []';
        let effectBody = func.body.trim();

        const isWrappedInFunction =
          effectBody.startsWith('() =>') ||
          effectBody.startsWith('function') ||
          effectBody.startsWith('async ');

        if (!isWrappedInFunction) {
          effectBody = `() => {\n    ${effectBody}\n  }`;
        }

        componentLevelDeclarations.add(`${func.type}(${effectBody}${deps});`);
        hookImports.add(func.type);
      } else {
        console.warn(`item.state.functions contains non-effect function type: ${func.type}`);
      }
    });

  }


  // function getTextContent(item) {
  //   // First check children prop
  //   if (item.props?.children?.type === 'static') {
  //     return item.props.children.value;
  //   }
  //
  //   // Then check state variables
  //   const textVar = Object.entries(item.state?.variables || {})
  //     .find(([_, v]) => v?.type === 'static' && v.value);
  //
  //   return textVar ? textVar[1].value : null;
  // }

  // function getTextContent(item) {
  //   // First check children prop - handle both static and variable types
  //   if (item.props?.children) {
  //     if (item.props.children.type === 'static') {
  //       return item.props.children.value;
  //     }
  //     if (item.props.children.type === 'variable') {
  //       // Return the variable reference wrapped in curly braces for JSX
  //       return `{${item.props.children.reference || item.props.children.value}}`;
  //     }
  //   }
  //
  //   // Then check state variables
  //   const textVar = Object.entries(item.state?.variables || {})
  //     .find(([_, v]) => v?.type === 'static' && v.value);
  //
  //   return textVar ? textVar[1].value : null;
  // }

  function getTextContent(item) {
    // Handle children array (NEW)
    if (item.children && Array.isArray(item.children)) {
      return item.children.map(child => {
        switch (child.type) {
          case 'static':
            // Reference to text variable in state
            // const textVar = item.state?.variables?.[child.value];
            return child.value;

          case 'variable':
            // Direct variable reference (like template literals)
            return `{${safeStringify(child.reference)}}`;

          default:
            return '';
        }
      }).join('');
    }

    // Legacy: First check children prop
    if (item.props?.children) {
      if (item.props.children.type === 'static') {
        return safeStringify(item.props.children.value);
      }
      if (item.props.children.type === 'variable') {
        return `{${safeStringify(item.props.children.reference) || safeStringify(item.props.children.value)}}`;
      }
    }

    // Legacy: Then check state variables
    const textVar = Object.entries(item.state?.variables || {})
      .find(([_, v]) => v?.type === 'static' && v.value);

    return textVar ? textVar[1].value : null;
  }

  // Handle dynamic operations (conditional rendering and mapping)
  function buildDynamicOperation(itemId, indent = 4) {
    const item = canvasState.items[itemId];
    if (!item || item.type !== 'dynamic-operation' || !item.operation) {
      return '';
    }

    const spaces = ' '.repeat(indent);
    const operation = item.operation;

    // Handle conditional rendering
    if (operation.type === 'conditional') {
      const isNested = item.isNested || false
      const condition = operation.condition;
      const trueTemplate = canvasState.items[operation.trueTemplateId];
      const falseTemplate = operation.falseTemplateId ? canvasState.items[operation.falseTemplateId] : null;

      // Process true template
      let trueContent = '';
      if (trueTemplate) {
        trueContent = buildJSX(operation.trueTemplateId, indent + 2);
      }

      // Process false template if exists
      let falseContent = '';
      if (falseTemplate) {
        falseContent = buildJSX(operation.falseTemplateId, indent + 2);
      }

      // Build conditional expression
      if (falseTemplate) {
        // Ternary operator
        return `${spaces}${isNested ? '' : '{'}\n${spaces}  ${condition} ? (\n${trueContent}${spaces}  ) : (\n${falseContent}${spaces}  )\n${spaces}${isNested ? '' : '}'}`;
      } else {
        // Logical AND
        return `${spaces}${isNested ? '' : '{'}${condition} && (\n${trueContent}${spaces})${isNested ? '' : '}'}`;
      }
    }

    // Handle mapping operation
    else if (operation.type === 'map') {
      const isNested = item.isNested
      if (isNested) console.log('isNested', isNested)
      const dataSource = operation.dataSource;
      const itemVariable = operation.itemVariable || 'item';
      const indexVariable = operation.indexVariable || 'index';
      const templateId = operation.templateId;

      // Get the template item
      const templateItem = canvasState.items[templateId];
      if (!templateItem) {
        return `${spaces}${isNested ? '' : '{'}/* Template item not found for mapping */${isNested ? '' : '}'}`;
      }

      // Process the template
      // We need to save the original context and restore it after processing
      const template = buildJSX(templateId, indent + 2);

      // Build the map expression
      return `${spaces}${isNested ? '' : '{'}${dataSource}.map((${itemVariable}, ${indexVariable}) => (\n${template}${spaces}))${isNested ? '' : '}'}`;
    }

    return '';
  }

  // Use only container structure, never rely on children arrays
  function buildJSX(itemId, indent = 4) {
    const item = canvasState.items[itemId];
    if (!item) return '';

    // Handle dynamic operations
    if (item.type === 'dynamic-operation') {
      return buildDynamicOperation(itemId, indent);
    }

    const spaces = ' '.repeat(indent);
    processItemState(item);

    // Get text content from this item
    const textContent = getTextContent(item);

    // If this is a basic text item with only text content and no children
    if (item.type === 'item' && textContent &&
      (!item.containerIds || item.containerIds.length === 0) &&
      ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'a', 'button', 'label', 'div'].includes(item.componentType)) {

      let jsx = `${spaces}<${item.componentType}`;


      // Add props
      Object.entries(item.props || {}).forEach(([propName, prop]) => {
        // Skip children prop as we handle it separately
        if (propName === 'children') return;

        const propValue = propValueToString(prop);
        if (propValue) {
          jsx += `\n${spaces}  ${propName}=${propValue}`;
        }
      });

      // Add data-component-id to preserve ID in roundtrip
      jsx += `\n${spaces}  data-component-id="${itemId}"`;

      // Close the opening tag and add the text content
      jsx += `>\n${spaces}  ${textContent}\n${spaces}</${item.componentType}>`;

      return jsx + '\n';
    }

    let jsx = `${spaces}<${item.componentType}`;

    // Add props
    Object.entries(item.props || {}).forEach(([propName, prop]) => {
      // Skip children prop as we handle it separately
      if (propName === 'children') return;

      const propValue = propValueToString(prop);
      if (propValue) {
        jsx += `\n${spaces}  ${propName}=${propValue}`;
      }
    });

    // Add data-component-id to preserve ID in roundtrip
    jsx += `\n${spaces}  data-component-id="${itemId}"`;

    // Get children from containers
    let childrenIds = [];
    if (item.containerIds?.length > 0) {
      const containerId = item.containerIds[0];
      childrenIds = canvasState.containers[containerId] || [];
    }

    const hasChildren = childrenIds.length > 0;

    if (hasChildren || textContent) {
      jsx += '>\n';

      // Add text content if present
      if (textContent) {
        jsx += `${spaces}  ${textContent}\n`;
      }

      // Add children if present
      if (hasChildren) {
        // Sort to handle special cases like mapping and conditional operations first
        // const sortedChildrenIds = [...childrenIds].sort((a, b) => {
        //   const itemA = canvasState.items[a];
        //   const itemB = canvasState.items[b];
        //
        //   // Dynamic operations should come first
        //   if (itemA.type === 'dynamic-operation' && itemB.type !== 'dynamic-operation') {
        //     return -1;
        //   }
        //   if (itemB.type === 'dynamic-operation' && itemA.type !== 'dynamic-operation') {
        //     return 1;
        //   }
        //
        //   return 0;
        // });
        const sortedChildrenIds = [...childrenIds]

        sortedChildrenIds.forEach(childId => {
          const childItem = canvasState.items[childId];
          if (childItem) {
            if (childItem.type === 'dynamic-operation') {
              jsx += buildDynamicOperation(childId, indent + 2);
            } else {
              jsx += buildJSX(childId, indent + 2);
            }
          }
        });
      }

      jsx += `${spaces}</${item.componentType}>`;
    } else {
      jsx += ' />';
    }

    return jsx + '\n';
  }

  function propValueToString(prop) {
    if (!prop) return null;

    switch (prop.type) {
      case 'static':
        if (prop.value === null || prop.value === undefined) return null;

        if (typeof prop.value === 'string') {
          return `"${prop.value.replace(/"/g, '\\"')}"`;
        }
        if (typeof prop.value === 'object') {
          // FIXED: Properly handle object values
          return `{${safeStringify(prop.value)}}`;
        }
        return `{${prop.value}}`;

      case 'variable':
        // Handle both 'reference' and 'value' for variable props
        const varValue = safeStringify(prop.reference);
        if (!varValue) return null;
        return `{${varValue}}`;

      case 'function':
        if (!prop.reference) return null;
        return `{${safeStringify(prop.reference)}}`;

      default:
        return null;
    }
  }

  // Step 1: Collect imports from root panel only
  collectImportsFromRootPanel();

  // Step 2: Process all items to detect hooks
  Object.values(canvasState.items || {}).forEach(processItemState);

  // Step 3: Add React with detected hooks if there are any hooks or always for components
  if (hookImports.size > 0 || Object.keys(canvasState.items).length > 0) {
    addImportToCollection('react', Array.from(hookImports), 'React');
  }

  // Step 4: Generate import statements
  const importStatements = [];

  allImports.forEach((importInfo, source) => {
    let statement = 'import ';

    // Add default import if present
    if (importInfo.defaultImport) {
      statement += importInfo.defaultImport;
      if (importInfo.specifiers.size > 0) {
        statement += ', ';
      }
    }

    // Add named imports if they exist
    if (importInfo.specifiers.size > 0) {
      statement += `{ ${Array.from(importInfo.specifiers).join(', ')} }`;
    }

    statement += ` from '${source}';`;
    importStatements.push(statement);
  });

  // Generate declarations section
  const componentLvlDec = [
    ...Array.from(componentLevelDeclarations),
  ].filter(Boolean).join('\n  ');

  // Generate declarations section
  const rootLvlDec = [
    ...Array.from(rootLevelDeclarations),
  ].filter(Boolean).join('\n  ');

  // Find the root item to start building from
  let rootItemId = 'root';
  if (!canvasState.items[rootItemId]) {
    // If root doesn't exist (e.g., in extracted subtree), 
    // find the first item that's not referenced in any container
    const allChildIds = new Set();
    Object.values(canvasState.containers || {}).forEach(children => {
      children.forEach(childId => allChildIds.add(childId));
    });

    // Find items that are not children of any container (top-level items)
    const topLevelItems = Object.keys(canvasState.items).filter(itemId => !allChildIds.has(itemId));

    if (topLevelItems.length > 0) {
      rootItemId = topLevelItems[0];
    } else if (Object.keys(canvasState.items).length > 0) {
      // Fallback: use the first item if no top-level items found (single item case)
      rootItemId = Object.keys(canvasState.items)[0];
    } else {
      // No items at all
      rootItemId = null;
    }
  }

  // Build the JSX content starting from the determined root
  let jsxContent = '';
  if (rootItemId && canvasState.items[rootItemId]) {
    jsxContent = buildJSX(rootItemId, 4);

    // Handle edge case: if JSX is empty but we have an item
    if (!jsxContent.trim()) {
      console.warn('buildJSX returned empty for item:', rootItemId);
      jsxContent = '    <div />\n';
    }
  } else {
    // No items to process - return empty div
    jsxContent = '    <div />\n';
  }

  // Generate the component code
  const code = `
  ${rootLvlDec ? rootLvlDec + '\n\n' : ''}
  export default function ${componentName}() {
    ${componentLvlDec ? componentLvlDec + '\n\n' : ''}
    return (${jsxContent}  );
  }`;

  // Determine if we need 'use client' directive for App Router
  const needsClientDirective =
    hookImports.size > 0 || // Has React hooks
    allImports.has('next/navigation') || // Uses Next.js client-side features
    componentName.includes('Page'); // Is a page component

  const clientDirective = needsClientDirective ? '"use client";\n\n' : '';

  return {
    imports: importStatements.join('\n'),
    code,
    fullCode: clientDirective + importStatements.join('\n') + '\n\n' + code
  };
}

