// utils/cssConversion.js
// Complete CSS state conversion utilities for Tailwind v4

/**
 * CSS State type definition
 */
export const CSSStateSchema = {
  imports: [], // Array of import strings
  rootVariables: {}, // Key-value pairs for :root CSS variables
  theme: {
    colors: {},
    fonts: {},
    breakpoints: {},
    spacing: {},
    animation: {},
    blur: {},
    borderRadius: {},
    borderWidth: {},
    boxShadow: {},
    dropShadow: {},
    fontSize: {},
    fontWeight: {},
    letterSpacing: {},
    lineHeight: {},
    opacity: {},
    outlineWidth: {},
    ringWidth: {},
    transitionDuration: {},
    transitionTimingFunction: {},
    zIndex: {}
  },
  layers: {
    base: [], // Array of {selector: string, properties: object}
    components: [], // Array of {selector: string, properties: object}
    utilities: [] // Array of {selector: string, properties: object}
  },
  customStyles: [], // Array of {selector: string, properties: object} for non-layered styles
  rawBlocks: [] // Array of raw CSS strings for complex cases
};

/**
 * Parse globals.css string into declarative CSS state
 */
export function parseCSSToState(cssString) {
  const state = {
    imports: [],
    rootVariables: {},
    theme: {
      colors: {},
      fonts: {},
      breakpoints: {},
      spacing: {},
      animation: {},
      blur: {},
      borderRadius: {},
      borderWidth: {},
      boxShadow: {},
      dropShadow: {},
      fontSize: {},
      fontWeight: {},
      letterSpacing: {},
      lineHeight: {},
      opacity: {},
      outlineWidth: {},
      ringWidth: {},
      transitionDuration: {},
      transitionTimingFunction: {},
      zIndex: {}
    },
    layers: {
      base: [],
      components: [],
      utilities: []
    },
    customStyles: [],
    rawBlocks: []
  };

  // Remove comments for easier parsing
  const cleanCSS = cssString.replace(/\/\*[\s\S]*?\*\//g, '');

  // Parse imports (e.g., @import "tailwindcss")
  const importRegex = /@import\s+["']([^"']+)["'];?/g;
  let match;
  while ((match = importRegex.exec(cleanCSS)) !== null) {
    state.imports.push(match[1]);
  }

  // First, extract all special blocks to prevent them from being parsed as custom styles
  const specialBlocks = new Set();

  // Extract @layer blocks
  const layerRegex = /@layer\s+(base|components|utilities)\s*{([\s\S]*?)}\s*(?=@layer|@theme|@media|@utility|$)/g;
  while ((match = layerRegex.exec(cleanCSS)) !== null) {
    specialBlocks.add(match[0]);
    const layer = match[1];
    const content = match[2];
    
    // Parse individual rules within the layer
    const rules = parseRules(content);
    state.layers[layer].push(...rules);
  }

  // Extract @theme blocks
  const themeRegex = /@theme(?:\s+inline)?\s*{([^}]*)}/g;
  while ((match = themeRegex.exec(cleanCSS)) !== null) {
    specialBlocks.add(match[0]);
    const themeContent = match[1];
    const themeVarRegex = /--([\w-]+):\s*([^;]+);/g;
    
    let varMatch;
    while ((varMatch = themeVarRegex.exec(themeContent)) !== null) {
      const fullName = varMatch[1];
      const value = varMatch[2].trim();
      
      // Parse theme variable categories
      if (fullName.startsWith('color-')) {
        state.theme.colors[fullName.substring(6)] = value;
      } else if (fullName.startsWith('font-')) {
        state.theme.fonts[fullName.substring(5)] = value;
      } else if (fullName.startsWith('breakpoint-')) {
        state.theme.breakpoints[fullName.substring(11)] = value;
      } else if (fullName.startsWith('spacing-')) {
        state.theme.spacing[fullName.substring(8)] = value;
      } else if (fullName.startsWith('animation-')) {
        state.theme.animation[fullName.substring(10)] = value;
      } else if (fullName.startsWith('blur-')) {
        state.theme.blur[fullName.substring(5)] = value;
      } else if (fullName.startsWith('rounded-') || fullName.startsWith('radius-')) {
        const key = fullName.startsWith('rounded-') ? fullName.substring(8) : fullName.substring(7);
        state.theme.borderRadius[key] = value;
      } else if (fullName.startsWith('border-width-')) {
        state.theme.borderWidth[fullName.substring(13)] = value;
      } else if (fullName.startsWith('shadow-')) {
        state.theme.boxShadow[fullName.substring(7)] = value;
      } else if (fullName.startsWith('drop-shadow-')) {
        state.theme.dropShadow[fullName.substring(12)] = value;
      } else if (fullName.startsWith('text-') && /text-\d/.test(fullName)) {
        state.theme.fontSize[fullName.substring(5)] = value;
      } else if (fullName.startsWith('font-weight-')) {
        state.theme.fontWeight[fullName.substring(12)] = value;
      } else if (fullName.startsWith('tracking-')) {
        state.theme.letterSpacing[fullName.substring(9)] = value;
      } else if (fullName.startsWith('leading-')) {
        state.theme.lineHeight[fullName.substring(8)] = value;
      } else if (fullName.startsWith('opacity-')) {
        state.theme.opacity[fullName.substring(8)] = value;
      } else if (fullName.startsWith('outline-')) {
        state.theme.outlineWidth[fullName.substring(8)] = value;
      } else if (fullName.startsWith('ring-')) {
        state.theme.ringWidth[fullName.substring(5)] = value;
      } else if (fullName.startsWith('duration-')) {
        state.theme.transitionDuration[fullName.substring(9)] = value;
      } else if (fullName.startsWith('ease-')) {
        state.theme.transitionTimingFunction[fullName.substring(5)] = value;
      } else if (fullName.startsWith('z-')) {
        state.theme.zIndex[fullName.substring(2)] = value;
      }
    }
  }

  // Extract @utility directives
  const utilityRegex = /@utility\s+([\w-]+)\s*{([^}]+)}/g;
  while ((match = utilityRegex.exec(cleanCSS)) !== null) {
    specialBlocks.add(match[0]);
    state.layers.utilities.push({
      selector: `.${match[1]}`,
      properties: parseProperties(match[2])
    });
  }

  // Parse top-level :root variables ONLY (not inside media queries)
  // This regex looks for :root that's not preceded by { (which would indicate it's nested)
  const topLevelRootRegex = /(?:^|[\s}]):root\s*{([^}]*)}/g;
  while ((match = topLevelRootRegex.exec(cleanCSS)) !== null) {
    // Check if this :root is inside a media query by looking backwards
    const beforeRoot = cleanCSS.substring(0, match.index);
    const lastMediaQuery = beforeRoot.lastIndexOf('@media');
    const lastClosingBrace = beforeRoot.lastIndexOf('}');
    
    // If the last media query is after the last closing brace, we're inside a media query
    if (lastMediaQuery === -1 || lastMediaQuery < lastClosingBrace) {
      specialBlocks.add(match[0]);
      const rootContent = match[1];
      const varRegex = /--([\w-]+):\s*([^;]+);/g;
      let varMatch;
      while ((varMatch = varRegex.exec(rootContent)) !== null) {
        state.rootVariables[varMatch[1]] = varMatch[2].trim();
      }
    }
  }

  // Now parse custom styles including media queries
  let customCSS = cleanCSS;
  
  // Remove imports
  customCSS = customCSS.replace(/@import\s+["'][^"']+["'];?/g, '');
  
  // Remove all special blocks we've already processed
  specialBlocks.forEach(block => {
    customCSS = customCSS.replace(block, '');
  });

  // Parse media queries and their contents
  const mediaQueryRegex = /@media\s*([^{]+)\s*{([\s\S]*?)}\s*(?=@media|$)/g;
  while ((match = mediaQueryRegex.exec(customCSS)) !== null) {
    const mediaQuery = match[1].trim();
    const mediaContent = match[2];
    
    // Parse the rules inside the media query
    const nestedRules = parseNestedRules(mediaContent);
    
    // Store the media query with its nested content
    state.customStyles.push({
      selector: `@media ${mediaQuery}`,
      properties: {},
      nestedRules: nestedRules
    });
  }

  // Remove media queries from customCSS
  customCSS = customCSS.replace(/@media\s*[^{]+\s*{[\s\S]*?}\s*(?=@media|$)/g, '');

  // Parse remaining custom rules (non-media query rules)
  const customRules = parseRules(customCSS);
  state.customStyles.push(...customRules);

  return state;
}

/**
 * Convert declarative CSS state back to CSS string
 */
export function convertStateToCSS(state) {
  let css = '';

  // Add imports
  state.imports.forEach(imp => {
    css += `@import "${imp}";\n`;
  });
  if (state.imports.length > 0) css += '\n';

  // Add :root variables
  if (Object.keys(state.rootVariables).length > 0) {
    css += ':root {\n';
    Object.entries(state.rootVariables).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`;
    });
    css += '}\n\n';
  }

  // Add @theme block
  const themeVars = [];
  
  // Collect all theme variables in proper order
  Object.entries(state.theme.colors || {}).forEach(([name, value]) => {
    themeVars.push(`  --color-${name}: ${value};`);
  });
  
  Object.entries(state.theme.fonts || {}).forEach(([name, value]) => {
    themeVars.push(`  --font-${name}: ${value};`);
  });
  
  Object.entries(state.theme.breakpoints || {}).forEach(([name, value]) => {
    themeVars.push(`  --breakpoint-${name}: ${value};`);
  });
  
  Object.entries(state.theme.spacing || {}).forEach(([name, value]) => {
    themeVars.push(`  --spacing-${name}: ${value};`);
  });
  
  Object.entries(state.theme.animation || {}).forEach(([name, value]) => {
    themeVars.push(`  --animation-${name}: ${value};`);
  });
  
  Object.entries(state.theme.blur || {}).forEach(([name, value]) => {
    themeVars.push(`  --blur-${name}: ${value};`);
  });
  
  Object.entries(state.theme.borderRadius || {}).forEach(([name, value]) => {
    themeVars.push(`  --radius-${name}: ${value};`);
  });
  
  Object.entries(state.theme.borderWidth || {}).forEach(([name, value]) => {
    themeVars.push(`  --border-width-${name}: ${value};`);
  });
  
  Object.entries(state.theme.boxShadow || {}).forEach(([name, value]) => {
    themeVars.push(`  --shadow-${name}: ${value};`);
  });
  
  Object.entries(state.theme.dropShadow || {}).forEach(([name, value]) => {
    themeVars.push(`  --drop-shadow-${name}: ${value};`);
  });
  
  Object.entries(state.theme.fontSize || {}).forEach(([name, value]) => {
    themeVars.push(`  --text-${name}: ${value};`);
  });
  
  Object.entries(state.theme.fontWeight || {}).forEach(([name, value]) => {
    themeVars.push(`  --font-weight-${name}: ${value};`);
  });
  
  Object.entries(state.theme.letterSpacing || {}).forEach(([name, value]) => {
    themeVars.push(`  --tracking-${name}: ${value};`);
  });
  
  Object.entries(state.theme.lineHeight || {}).forEach(([name, value]) => {
    themeVars.push(`  --leading-${name}: ${value};`);
  });
  
  Object.entries(state.theme.opacity || {}).forEach(([name, value]) => {
    themeVars.push(`  --opacity-${name}: ${value};`);
  });
  
  Object.entries(state.theme.outlineWidth || {}).forEach(([name, value]) => {
    themeVars.push(`  --outline-${name}: ${value};`);
  });
  
  Object.entries(state.theme.ringWidth || {}).forEach(([name, value]) => {
    themeVars.push(`  --ring-${name}: ${value};`);
  });
  
  Object.entries(state.theme.transitionDuration || {}).forEach(([name, value]) => {
    themeVars.push(`  --duration-${name}: ${value};`);
  });
  
  Object.entries(state.theme.transitionTimingFunction || {}).forEach(([name, value]) => {
    themeVars.push(`  --ease-${name}: ${value};`);
  });
  
  Object.entries(state.theme.zIndex || {}).forEach(([name, value]) => {
    themeVars.push(`  --z-${name}: ${value};`);
  });

  if (themeVars.length > 0) {
    css += '@theme inline {\n';
    css += themeVars.join('\n');
    css += '\n}\n\n';
  }

  // Add layer styles
  ['base', 'components', 'utilities'].forEach(layer => {
    if (state.layers[layer] && state.layers[layer].length > 0) {
      css += `@layer ${layer} {\n`;
      
      state.layers[layer].forEach(rule => {
        css += formatRule(rule, '  ');
      });
      
      css += '}\n\n';
    }
  });

  // Add custom styles
  state.customStyles.forEach(rule => {
    if (rule.selector.startsWith('@media')) {
      // Handle media queries with nested rules
      css += `${rule.selector} {\n`;
      
      if (rule.nestedRules && rule.nestedRules.length > 0) {
        rule.nestedRules.forEach(nestedRule => {
          css += formatRule(nestedRule, '  ');
        });
      }
      
      css += '}\n\n';
    } else if (rule.selector.startsWith('@supports') || rule.selector.startsWith('@container')) {
      // Handle other at-rules with nested content
      css += `${rule.selector} {\n`;
      
      if (rule.nestedRules && rule.nestedRules.length > 0) {
        rule.nestedRules.forEach(nestedRule => {
          css += formatRule(nestedRule, '  ');
        });
      }
      
      css += '}\n\n';
    } else {
      // Regular rules
      css += formatRule(rule, '');
    }
  });

  // Add raw blocks if any
  state.rawBlocks.forEach(block => {
    css += block + '\n\n';
  });

  return css.trim();
}

// Helper to parse CSS rules
function parseRules(content) {
  const rules = [];
  
  // Match CSS rules but avoid matching nested blocks
  const ruleRegex = /([^{@]+)\s*{([^{}]+)}/g;
  let match;
  
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim();
    const propertiesBlock = match[2];
    
    if (selector && !selector.startsWith('@')) {
      rules.push({
        selector,
        properties: parseProperties(propertiesBlock)
      });
    }
  }
  
  return rules;
}

// Helper to parse nested rules (for media queries, supports, etc.)
function parseNestedRules(content) {
  const rules = [];
  
  // This handles nested selectors within media queries
  // We need to be careful about nested braces
  let depth = 0;
  let currentSelector = '';
  let currentBlock = '';
  let inBlock = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '{') {
      if (depth === 0) {
        inBlock = true;
      }
      depth++;
      if (depth > 1) {
        currentBlock += char;
      }
    } else if (char === '}') {
      depth--;
      if (depth === 0 && inBlock) {
        // We've completed a rule
        const selector = currentSelector.trim();
        if (selector) {
          // Check if this block contains nested rules
          if (currentBlock.includes('{')) {
            // This is a nested at-rule
            rules.push({
              selector,
              properties: {},
              nestedRules: parseNestedRules(currentBlock)
            });
          } else {
            // Regular rule with properties
            rules.push({
              selector,
              properties: parseProperties(currentBlock)
            });
          }
        }
        currentSelector = '';
        currentBlock = '';
        inBlock = false;
      } else if (depth > 0) {
        currentBlock += char;
      }
    } else {
      if (!inBlock) {
        currentSelector += char;
      } else if (depth > 1) {
        currentBlock += char;
      } else if (depth === 1) {
        currentBlock += char;
      }
    }
  }
  
  return rules;
}

// Helper to parse CSS properties
function parseProperties(propertiesString) {
  const props = {};
  
  // Handle CSS variables properly
  const lines = propertiesString.split(';').filter(line => line.trim());
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const propName = line.substring(0, colonIndex).trim();
      const propValue = line.substring(colonIndex + 1).trim();
      
      if (propName && propValue) {
        // For CSS variables, preserve the -- prefix
        if (propName.startsWith('--')) {
          props[propName] = propValue;
        } else {
          props[propName] = propValue;
        }
      }
    }
  });
  
  return props;
}

// Helper to format a rule back to CSS
function formatRule(rule, indent = '') {
  let css = `${indent}${rule.selector} {\n`;
  
  Object.entries(rule.properties).forEach(([prop, value]) => {
    css += `${indent}  ${prop}: ${value};\n`;
  });
  
  // Handle nested rules if they exist
  if (rule.nestedRules && rule.nestedRules.length > 0) {
    rule.nestedRules.forEach(nestedRule => {
      css += formatRule(nestedRule, indent + '  ');
    });
  }
  
  css += `${indent}}\n`;
  return css;
}

// Export the state schema for TypeScript reference
export { CSSStateSchema as CSSState };