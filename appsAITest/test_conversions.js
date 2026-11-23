// test-conversion.js - Create this file to test your conversions systematically
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parsePageCodeToAST, convertASTToCanvasState } from './codeToCanvas.mjs';
import { CanvasDebugger } from './debug-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test cases with different complexity levels
const testCases = [
  {
    name: 'simple-component',
    code: `
export default function SimpleComponent() {
  return <div>Hello World</div>;
}
    `,
    expected: {
      itemCount: 2, // root-panel + div
      hasText: true
    }
  },
  {
    name: 'component-with-props',
    code: `
export default function ComponentWithProps() {
  return (
    <div className="container">
      <h1 style={{ color: 'red' }}>Title</h1>
      <p>Content</p>
    </div>
  );
}
    `,
    expected: {
      itemCount: 4, // root-panel + div + h1 + p
      hasProps: true
    }
  },
  {
    name: 'component-with-state',
    code: `
import React, { useState } from 'react';

export default function ComponentWithState() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
    `,
    expected: {
      itemCount: 4, // root-panel + div + span + button
      hasState: true,
      hasImports: true
    }
  },
  {
    name: 'component-with-data-ids',
    code: `
export default function ComponentWithDataIds() {
  return (
    <div data-component-id="main-container">
      <h1 data-component-id="title">Title</h1>
      <p data-component-id="content">Content</p>
    </div>
  );
}
    `,
    expected: {
      itemCount: 4,
      preservesIds: true
    }
  },
  {
    name: 'complex-component',
    code: `
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ComplexComponent() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data
    setIsLoading(false);
  }, []);
  
  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {items.map((item, index) => (
            <div key={index} className="item">
              <Image src={item.image} alt={item.title} width={200} height={150} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
    `,
    expected: {
      itemCount: 'varies', // Complex due to conditional and mapping
      hasConditionals: true,
      hasMappings: true,
      hasImports: true,
      hasHooks: true
    }
  }
];

class ConversionTester {
  constructor() {
    this.results = [];
    this.debugger = new CanvasDebugger();
  }

  async runAllTests() {
    console.log('🧪 Running conversion tests...\n');
    
    for (const testCase of testCases) {
      await this.runTest(testCase);
    }
    
    this.generateReport();
  }

  async runTest(testCase) {
    console.log(`\n🔍 Testing: ${testCase.name}`);
    console.log('─'.repeat(50));
    
    const result = {
      name: testCase.name,
      success: false,
      issues: [],
      metrics: {},
      canvasState: null
    };

    try {
      // Parse AST
      const ast = parsePageCodeToAST(testCase.code);
      result.metrics.astParsed = true;
      
      // Convert to canvas state
      const canvasState = convertASTToCanvasState(ast);
      result.canvasState = canvasState;
      result.metrics.canvasGenerated = true;
      
      // Validate against expectations
      this.validateResult(testCase, canvasState, result);
      
      // Test specific issues
      this.testCommonIssues(testCase, canvasState, result);
      
      result.success = result.issues.length === 0;
      
    } catch (error) {
      result.issues.push({
        type: 'error',
        message: `Conversion failed: ${error.message}`
      });
      console.error(`❌ ${error.message}`);
    }

    this.results.push(result);
    
    // Print immediate results
    if (result.success) {
      console.log('✅ Test passed');
    } else {
      console.log('❌ Test failed');
      result.issues.forEach(issue => {
        console.log(`  • ${issue.type}: ${issue.message}`);
      });
    }
  }

  validateResult(testCase, canvasState, result) {
    const expected = testCase.expected;
    
    // Check item count
    if (expected.itemCount && expected.itemCount !== 'varies') {
      const actualCount = Object.keys(canvasState.items || {}).length;
      if (actualCount !== expected.itemCount) {
        result.issues.push({
          type: 'validation',
          message: `Expected ${expected.itemCount} items, got ${actualCount}`
        });
      }
    }
    
    // Check for text content
    if (expected.hasText) {
      const hasTextVariable = Object.values(canvasState.items || {}).some(item => 
        Object.values(item.state?.variables || {}).some(variable => 
          variable.type === 'basic' && typeof variable.value === 'string'
        )
      );
      if (!hasTextVariable) {
        result.issues.push({
          type: 'validation',
          message: 'Expected text content but none found'
        });
      }
    }
    
    // Check for props
    if (expected.hasProps) {
      const hasProps = Object.values(canvasState.items || {}).some(item => 
        Object.keys(item.props || {}).length > 0
      );
      if (!hasProps) {
        result.issues.push({
          type: 'validation',
          message: 'Expected props but none found'
        });
      }
    }
    
    // Check for state
    if (expected.hasState) {
      const hasState = Object.values(canvasState.items || {}).some(item => 
        Object.keys(item.state?.variables || {}).length > 0
      );
      if (!hasState) {
        result.issues.push({
          type: 'validation',
          message: 'Expected state variables but none found'
        });
      }
    }
    
    // Check for imports
    if (expected.hasImports) {
      const hasImports = canvasState.items['root-panel']?.imports?.length > 0;
      if (!hasImports) {
        result.issues.push({
          type: 'validation',
          message: 'Expected imports but none found'
        });
      }
    }
    
    // Check ID preservation
    if (expected.preservesIds) {
      const hasOriginalIds = Object.keys(canvasState.items || {}).some(id => 
        id.includes('main-container') || id.includes('title') || id.includes('content')
      );
      if (!hasOriginalIds) {
        result.issues.push({
          type: 'validation',
          message: 'Expected original IDs to be preserved'
        });
      }
    }
  }

  testCommonIssues(testCase, canvasState, result) {
    // Test for orphaned items
    const allChildIds = new Set();
    Object.values(canvasState.containers || {}).forEach(children => {
      children.forEach(childId => allChildIds.add(childId));
    });
    
    const orphanedItems = Object.keys(canvasState.items || {}).filter(itemId => 
      itemId !== 'root-panel' && !allChildIds.has(itemId)
    );
    
    if (orphanedItems.length > 0) {
      result.issues.push({
        type: 'structure',
        message: `Found ${orphanedItems.length} orphaned items: ${orphanedItems.join(', ')}`
      });
    }
    
    // Test for empty containers
    const emptyContainers = Object.entries(canvasState.containers || {}).filter(([id, children]) => 
      children.length === 0 && id !== 'root-container-1'
    );
    
    if (emptyContainers.length > 0) {
      result.issues.push({
        type: 'structure',
        message: `Found ${emptyContainers.length} empty containers`
      });
    }
    
    // Test for missing component types
    const itemsWithoutComponentType = Object.values(canvasState.items || {}).filter(item => 
      !item.componentType
    );
    
    if (itemsWithoutComponentType.length > 0) {
      result.issues.push({
        type: 'structure',
        message: `Found ${itemsWithoutComponentType.length} items without componentType`
      });
    }
  }

  generateReport() {
    console.log('\n📊 CONVERSION TEST REPORT');
    console.log('═'.repeat(60));
    
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
    console.log(`Failed: ${failedTests} (${Math.round(failedTests/totalTests*100)}%)`);
    
    // Group issues by type
    const issuesByType = {};
    this.results.forEach(result => {
      result.issues.forEach(issue => {
        if (!issuesByType[issue.type]) {
          issuesByType[issue.type] = [];
        }
        issuesByType[issue.type].push({
          test: result.name,
          message: issue.message
        });
      });
    });
    
    console.log('\n📋 Issues by Type:');
    Object.entries(issuesByType).forEach(([type, issues]) => {
      console.log(`\n${type.toUpperCase()}:`);
      issues.forEach(issue => {
        console.log(`  • ${issue.test}: ${issue.message}`);
      });
    });
    
    // Save detailed report
    const reportFile = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportFile, JSON.stringify({
      summary: {
        totalTests,
        passedTests,
        failedTests,
        successRate: passedTests/totalTests*100
      },
      results: this.results,
      issuesByType
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportFile}`);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new ConversionTester();
  tester.runAllTests();
}

export { ConversionTester, testCases };
