// Debug utility for canvas state conversion
// Add these debugging functions to your codeToCanvas.mjs file

class CanvasDebugger {
  constructor() {
    this.logs = [];
    this.errors = [];
    this.warnings = [];
  }

  log(message, data = null) {
    const logEntry = {
      type: 'log',
      message,
      data,
      timestamp: new Date().toISOString()
    };
    this.logs.push(logEntry);
    console.log(`🔍 ${message}`, data || '');
  }

  error(message, error = null) {
    const errorEntry = {
      type: 'error',
      message,
      error: error?.message || error,
      timestamp: new Date().toISOString()
    };
    this.errors.push(errorEntry);
    console.error(`❌ ${message}`, error || '');
  }

  warn(message, data = null) {
    const warnEntry = {
      type: 'warning',
      message,
      data,
      timestamp: new Date().toISOString()
    };
    this.warnings.push(warnEntry);
    console.warn(`⚠️ ${message}`, data || '');
  }

  // Debug AST structure
  debugAST(ast) {
    this.log('=== AST ANALYSIS ===');
    
    const visitor = {
      enter: (path) => {
        if (path.isJSXElement()) {
          const elementName = path.node.openingElement.name.name;
          const attrs = path.node.openingElement.attributes.map(attr => {
            if (attr.type === 'JSXAttribute') {
              return `${attr.name.name}=${attr.value?.value || 'expression'}`;
            }
            return attr.type;
          });
          
          this.log(`JSX Element: ${elementName}`, {
            attributes: attrs,
            children: path.node.children?.length || 0,
            hasDataComponentId: attrs.some(attr => attr.startsWith('data-component-id'))
          });
        }
        
        if (path.isVariableDeclaration()) {
          path.node.declarations.forEach(decl => {
            if (decl.id.name) {
              this.log(`Variable: ${decl.id.name}`, {
                type: decl.init?.type,
                isHook: decl.init?.callee?.name?.startsWith('use')
              });
            }
          });
        }
        
        if (path.isImportDeclaration()) {
          this.log(`Import: ${path.node.source.value}`, {
            specifiers: path.node.specifiers.map(spec => ({
              type: spec.type,
              name: spec.local?.name || spec.imported?.name
            }))
          });
        }
      }
    };
    
    traverse(ast, visitor);
    this.log('=== END AST ANALYSIS ===');
  }

  // Debug canvas state structure
  debugCanvasState(state) {
    this.log('=== CANVAS STATE ANALYSIS ===');
    
    // Check items
    const itemCount = Object.keys(state.items || {}).length;
    this.log(`Total items: ${itemCount}`);
    
    Object.entries(state.items || {}).forEach(([id, item]) => {
      this.log(`Item ${id}:`, {
        type: item.type,
        componentType: item.componentType,
        hasContainers: item.containerIds?.length > 0,
        containerIds: item.containerIds,
        hasProps: Object.keys(item.props || {}).length > 0,
        hasState: Object.keys(item.state?.variables || {}).length > 0,
        hasImports: item.imports?.length > 0
      });
    });
    
    // Check containers
    const containerCount = Object.keys(state.containers || {}).length;
    this.log(`Total containers: ${containerCount}`);
    
    Object.entries(state.containers || {}).forEach(([id, children]) => {
      this.log(`Container ${id}:`, {
        childCount: children.length,
        children: children
      });
    });
    
    // Check for orphaned items
    const allChildIds = new Set();
    Object.values(state.containers || {}).forEach(children => {
      children.forEach(childId => allChildIds.add(childId));
    });
    
    const orphanedItems = Object.keys(state.items || {}).filter(itemId => 
      itemId !== 'root-panel' && !allChildIds.has(itemId)
    );
    
    if (orphanedItems.length > 0) {
      this.warn('Orphaned items found:', orphanedItems);
    }
    
    this.log('=== END CANVAS STATE ANALYSIS ===');
  }

  // Debug specific conversion issues
  debugConversionIssues(originalCode, canvasState) {
    this.log('=== CONVERSION ISSUES ANALYSIS ===');
    
    // Check if we lost components
    const jsxElementCount = (originalCode.match(/<[A-Z][a-zA-Z0-9]*\s/g) || []).length;
    const canvasItemCount = Object.keys(canvasState.items || {}).length;
    
    if (jsxElementCount !== canvasItemCount) {
      this.warn(`JSX elements (${jsxElementCount}) vs Canvas items (${canvasItemCount}) mismatch`);
    }
    
    // Check for missing data-component-id attributes
    const hasDataComponentIds = originalCode.includes('data-component-id');
    if (!hasDataComponentIds) {
      this.warn('No data-component-id attributes found - this may cause ID generation issues');
    }
    
    // Check for unsupported patterns
    const unsupportedPatterns = [
      { pattern: /React\.Fragment/g, name: 'React.Fragment' },
      { pattern: /<>/g, name: 'JSX Fragment shorthand' },
      { pattern: /\{.*\?\s*\([\s\S]*?\)\s*:\s*\([\s\S]*?\)\}/g, name: 'Ternary in JSX' },
      { pattern: /\{.*&&[\s\S]*?\}/g, name: 'Logical AND in JSX' },
      { pattern: /\.map\s*\(/g, name: 'Array map' }
    ];
    
    unsupportedPatterns.forEach(({ pattern, name }) => {
      const matches = originalCode.match(pattern);
      if (matches) {
        this.warn(`Found ${name} pattern`, { count: matches.length });
      }
    });
    
    this.log('=== END CONVERSION ISSUES ANALYSIS ===');
  }

  // Test roundtrip conversion
  testRoundtrip(originalCode, canvasState, generatedCode) {
    this.log('=== ROUNDTRIP TEST ===');
    
    // Basic comparison
    const originalMinified = originalCode.replace(/\s+/g, ' ').trim();
    const generatedMinified = generatedCode.replace(/\s+/g, ' ').trim();
    
    if (originalMinified === generatedMinified) {
      this.log('✅ Perfect roundtrip match!');
    } else {
      this.warn('Roundtrip mismatch detected');
      
      // Find differences
      const originalLines = originalCode.split('\n');
      const generatedLines = generatedCode.split('\n');
      
      for (let i = 0; i < Math.max(originalLines.length, generatedLines.length); i++) {
        const origLine = originalLines[i] || '';
        const genLine = generatedLines[i] || '';
        
        if (origLine.trim() !== genLine.trim()) {
          this.warn(`Line ${i + 1} differs:`, {
            original: origLine.trim(),
            generated: genLine.trim()
          });
        }
      }
    }
    
    this.log('=== END ROUNDTRIP TEST ===');
  }

  // Generate debug report
  generateReport() {
    return {
      summary: {
        totalLogs: this.logs.length,
        totalErrors: this.errors.length,
        totalWarnings: this.warnings.length
      },
      logs: this.logs,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}

// Export the debugger
export { CanvasDebugger };
