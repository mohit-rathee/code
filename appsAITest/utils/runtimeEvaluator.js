let isFirstTime = 1
const ROOT_PANEL_ID = 'root';


export function runUseEffect(evaluationContext) {

  const currentItem = evaluationContext.state.items[ROOT_PANEL_ID]
  const effectsRanRef = evaluationContext.stateRefs._effects

  if (!currentItem.state?.functions) return;

  // Find all effect functions in the component state
  const effectFns = Object.entries(currentItem.state.functions)
    .filter(([_, fn]) => (
      fn.type === 'useEffect' ||
      fn.type === 'useLayoutEffect' ||
      fn.type === 'useInsertionEffect'
    ));

  if (effectFns.length === 0) return;
  console.log('EFFECTS_FNS', effectsRanRef)


  // Get complete evaluation context
  const context = getCompleteEvaluationContext(evaluationContext);

  console.log('COMPLETE_CONTEXT', context)
  // Execute each effect function
  effectFns.forEach(([fnName, effectFn]) => {
    const effectKey = `${fnName}`;
    const deps = effectFn.dependencies || [];

    // dependency check
    const currentDepValues = deps.length > 0
      ? deps.map(dep => evaluateExpression(dep, context))
      : null;
    console.log('currentDepValues', currentDepValues)

    // Check if dependencies changed
    const prevDeps = effectsRanRef[effectKey]?.deps;
    const shouldRun = !effectsRanRef[effectKey] ||
      deps.length === 0 || // Run if no deps (run every render)
      !areDepsEqual(prevDeps, currentDepValues);

    if (!shouldRun) return;

    try {
      // Simply evaluate the effect body as an expression with the full context
      const effectFunction = evaluateExpression(effectFn.body, context);
      // console.log('effectFunction', effectFunction)

      // Execute the effect function if it's a function
      if (typeof effectFunction === 'function') {
        // console.log(`Running useEffect: ${fnName}`);
        const cleanup = effectFunction();

        // Store cleanup function if returned
        if (typeof cleanup === 'function') {
          // Run previous cleanup if exists
          if (effectsRanRef[effectKey]?.cleanup) {
            effectsRanRef[effectKey].cleanup();
          }

          // Store new cleanup
          effectsRanRef[effectKey] = {
            deps: currentDepValues,
            cleanup
          };
        } else {
          effectsRanRef[effectKey] = {
            deps: currentDepValues
          };
        }
      }
    } catch (error) {
      console.error(`Error executing effect ${fnName}:`, error);
    }
  });

  // Cleanup function for when component unmounts
  return () => {
    // Run all cleanup functions
    // console.log('effectsRanRef', effectsRanRef.current)
    Object.values(effectsRanRef).forEach(effect => {
      if (effect?.cleanup) {
        // console.log('cleanup func in runtimeEvaluator', effect.cleanup)
        effect.cleanup();
      }
    });
  };
}

export function areDepsEqual(oldDeps, newDeps) {
  if (oldDeps === newDeps) return true; // same reference
  if (!oldDeps || !newDeps || oldDeps.length !== newDeps.length) return false;

  for (let i = 0; i < oldDeps.length; i++) {
    if (oldDeps[i] !== newDeps[i]) {
      console.log('changes in deps:', oldDeps[i], newDeps[i], 'at index', i)
      return false;
    }
  }
  return true;
}

// Lookup function to find a variable by reference from any parent component
export function findVariableInParents(referenceId, currentItemId) {
  // First try to find in current item
  const currentItem = state.items[currentItemId];
  if (currentItem?.state?.variables?.[referenceId]) {
    return currentItem.state.variables[referenceId];
  }

  // Find parent of current item
  const parentEntry = Object.entries(state.containers).find(([_, children]) =>
    children.includes(currentItemId)
  );

  if (!parentEntry) return null;

  // Find which panel owns this container
  const [containerId] = parentEntry;
  const parentId = Object.entries(state.items).find(([_, item]) =>
    item.containerIds?.includes(containerId)
  )?.[0];

  if (!parentId) return null;

  // Recursively look in parent
  return findVariableInParents(referenceId, parentId);
};

// Helper to update a state variable in any component
export function updateVariableState(itemId, variableName, newValue, evaluationContext) {
  evaluationContext.setState(prevState => {
    // Create a deep copy of the state to avoid mutating it
    const newState = JSON.parse(JSON.stringify(prevState));

    // Update the variable value
    if (newState.items[itemId]?.state?.variables?.[variableName]) {

      newState.items[itemId].state.variables[variableName].value = newValue;
    } else {
      console.error('variableName', variableName, 'not found in state', newState.items[itemId]?.state?.variables)
    }

    return newState;
  });
};

// Get a complete evaluation context by gathering variables from all scopes
// ====================== getCompleteEvaluationContext.js ======================

export function getCompleteEvaluationContext(evaluationContext) {
  const { state, stateRefs, context } = evaluationContext;

  const rootVariables = state.items[ROOT_PANEL_ID]?.state?.variables || {};

  Object.entries(rootVariables).forEach(([key, variable]) => {
    switch (variable.type) {

      // -------------------- useState --------------------
      case 'useState': {
        if (!stateRefs[key]) stateRefs[key] = variable.value;
        context[key] = stateRefs[key];

        if (variable.setter) {
          context[variable.setter] = (newValue) => {
            const computedValue = typeof newValue === 'function'
              ? newValue(stateRefs[key])
              : newValue;
            stateRefs[key] = computedValue;
            context[key] = computedValue; // update context
            updateVariableState(ROOT_PANEL_ID, key, computedValue, evaluationContext);
          };
        }
        break;
      }

      // -------------------- useRef --------------------
      case 'useRef': {
        if (!stateRefs[key]) stateRefs[key] = { current: variable.value };
        context[key] = stateRefs[key];
        break;
      }

      // -------------------- useReducer --------------------
      case 'useReducer': {
        if (!stateRefs[key]) {
          const reducerFn = evaluateExpression(variable.reducer, context);
          const initialValue = typeof variable.value === 'string'
            ? evaluateExpression(variable.value, context)
            : variable.value;

          stateRefs[key] = {
            state: initialValue,
            dispatch: (action) => {
              const newState = reducerFn(stateRefs[key].state, action);
              stateRefs[key].state = newState;
              context[key] = newState;
              updateVariableState(ROOT_PANEL_ID, key, newState, evaluationContext);
            },
          };
        }
        context[key] = stateRefs[key].state;
        context[variable.dispatch] = stateRefs[key].dispatch;
        break;
      }

      // -------------------- useMemo / useCallback --------------------
      case 'useMemo':
      case 'useCallback': {
        if (!stateRefs[key]) {
          const value = evaluateExpression(variable.value, context);
          const valueToStore = variable.type === 'useCallback' ? value : value();
          stateRefs[key] = {
            value: valueToStore,
            dependencies: variable.dependencies || [],
            dependencyValues: variable.dependencies
              ? variable.dependencies.map(dep => evaluateExpression(dep, context))
              : null,
          };
          context[key] = valueToStore;
        } else {
          const oldDepValues = stateRefs[key].dependencyValues;
          const newDepValues = variable.dependencies
            ? variable.dependencies.map(dep => evaluateExpression(dep, context))
            : null;

          if (!areDepsEqual(oldDepValues, newDepValues)) {
            const value = evaluateExpression(variable.value, context);
            const valueToStore = variable.type === 'useCallback' ? value : value();
            stateRefs[key] = {
              value: valueToStore,
              dependencies: variable.dependencies || [],
              dependencyValues: newDepValues,
            };
            context[key] = valueToStore;
          } else {
            context[key] = stateRefs[key].value;
          }
        }
        break;
      }

      // -------------------- basic / function --------------------
      case 'basic':
      case 'function': {
        if (variable.isRootLevel) {
          // Initialize only once
          if (!(key in stateRefs)) {
            const value = variable.type === 'function' ? variable.reference : variable.value;
            const valueToStore = typeof value === 'string'
              ? evaluateExpression(value, context)
              : value;

            console.log('Initializing root-level', key, 'with value', valueToStore);
            stateRefs[key] = valueToStore;
          }
          // Always use the persistent value from stateRefs
          context[key] = stateRefs[key];
        } else {
          // Non-root-level variables
          const value = variable.type === 'function' ? variable.reference : variable.value;
          const valueToStore = typeof value === 'string'
            ? evaluateExpression(value, context)
            : value;
          stateRefs[key] = valueToStore;
          context[key] = valueToStore;
        }

        // Add setter property for basic variables, so that it will update stateRefs as well
        Object.defineProperty(context, key, {
          get() {
            return stateRefs[key];
          },
          set(newValue) {
            console.log(`Setting ${key} from ${stateRefs[key]} to ${newValue}`);
            stateRefs[key] = newValue;
          },
          enumerable: true,
          configurable: true
        });

        break;
      }

      // -------------------- useTransition --------------------
      case 'useTransition': {
        if (!stateRefs[key]) {
          stateRefs[key] = {
            isPending: false,
            startTransition: (callback) => {
              stateRefs[key].isPending = true;
              callback();
              stateRefs[key].isPending = false;
              updateVariableState(ROOT_PANEL_ID, key, stateRefs[key], evaluationContext);
            },
          };
        }
        context[key] = stateRefs[key].isPending;
        context[variable.startTransition] = stateRefs[key].startTransition;
        break;
      }

      // -------------------- useSyncExternalStore --------------------
      case 'useSyncExternalStore': {
        const subscribe = evaluateExpression(variable.subscribe, context);
        const getSnapshot = evaluateExpression(variable.getSnapshot, context);
        const getServerSnapshot = evaluateExpression(variable.getServerSnapshot, context);

        if (!stateRefs[key]) {
          const initialValue = getServerSnapshot ? getServerSnapshot() : getSnapshot();

          stateRefs[key] = {
            value: initialValue,
            unsubscribe: subscribe(() => {
              console.log("store value is changed")
              const getSnapshot = evaluateExpression(variable.getSnapshot, context);
              const next = getSnapshot()
              console.log('old is ', stateRefs[key].value)
              console.log('next is ', next)
              if (next !== stateRefs[key].value) {
                stateRefs[key].value = next;
                context[key] = next;
                evaluationContext.setState(p => ({ ...p }));
              }
            }),
          };
        }
        context[key] = stateRefs[key].value;
        break;
      }

      // -------------------- useDeferredValue --------------------
      case 'useDeferredValue': {
        if (!stateRefs[key]) {
          const initialValue = evaluateExpression(variable.value, context);
          stateRefs[key] = { value: initialValue, deferred: initialValue };
          context[key] = initialValue;
        }

        const deferredRef = stateRefs[key];
        const newValue = evaluateExpression(variable.value, context);
        deferredRef.value = newValue;

        if (deferredRef.value !== deferredRef.deferred) {
          const nextValue = newValue;
          setTimeout(() => {
            deferredRef.deferred = nextValue;
            context[key] = nextValue;
            evaluationContext.setState(p => ({ ...p }));
          }, 1000);
        }
        context[key] = deferredRef.deferred;
        break;
      }

      // -------------------- useContext --------------------
      case 'useContext': {
        const contextObj = evaluateExpression(variable.context, context);
        context[key] = contextObj?.currentValue ?? variable.defaultValue;
        break;
      }

      // -------------------- useId --------------------
      case 'useId': {
        if (!stateRefs[key]) {
          stateRefs[key] = `id-${Math.random().toString(36).substr(2, 9)}`;
        }
        context[key] = stateRefs[key];
        break;
      }
    }
  });

  return context;
}


// Helper to get parent component variables for evaluation context
// Let evaluateExpression handle everything - it knows how to deal with:
// - Simple variables (isToggled)
// - Functions (() => setCount(count + 1))
// - Style objects ({padding: "10px", margin: "5px"})
// - Expressions (count % 2 === 0 ? "blue" : "orange")
// - Array access (board[0])
// - Everything else
// ====================== evaluateExpression.js (with `with`) ======================
export function evaluateExpression(expression, context, additionalContext = {}) {
  const debugMode = false

  // Merge is not good 
  // Object.entries(additionalContext).forEach(([key, value]) => {
  //   context[key] = value;
  // });

  if (typeof expression !== 'string') return expression;

  let expr = expression.trim();

  // Convert named function to arrow function
  if (/^function\s*\w*\s*\([^)]*\)\s*\{/.test(expr)) {
    const fnMatch = expr.match(/^function\s*\w*\s*\(([^)]*)\)\s*\{([\s\S]*)\}$/);
    if (fnMatch) {
      const params = fnMatch[1].trim();
      let body = fnMatch[2].trim();
      expr = `(${params}) => { ${body} }`;
    }
  }

  // 'with' statement is used to update the itemContext,
  //  when expr tries to update variable from itemContext
  const func = new Function(`
    try {
      with(this) {
        return (${expr});
      }
    } catch (e) {
      try {
        return (${expr});
      } catch (e2) {
        return ${JSON.stringify(expr)};
      }
    }
  `).bind({ ...context, ...additionalContext }); //expression evaluation needs both contexts

  // if (itemContext !== stateRefs['_completeContext']) console.error("something is wrong")
  // debugLog("itemContext", itemContext)
  // console.log("expr", expr)
  console.log("itemContext", context)
  const result = func();
  // console.log("result", typeof (result))
  if (debugMode) console.log('evaluateExpression result:', result);
  return result;
}


export function findFunctionInParents(functionId, currentItemId) {
  // First try to find in current item
  const currentItem = state.items[currentItemId];
  if (currentItem?.state?.functions?.[functionId]) {
    return currentItem.state.functions[functionId];
  }

  // Find parent of current item
  const parentEntry = Object.entries(state.containers).find(([_, children]) =>
    children.includes(currentItemId)
  );

  if (!parentEntry) return null;

  // Find which panel owns this container
  const [containerId] = parentEntry;
  const parentId = Object.entries(state.items).find(([_, item]) =>
    item.containerIds?.includes(containerId)
  )?.[0];

  if (!parentId) return null;

  // Recursively look in parent
  return findFunctionInParents(functionId, parentId);
};

// Resolve prop values based on type - IMPROVED to generically handle all variable references
export function resolvePropValue(prop, context, additionalContext) {
  if (!prop) return null;

  switch (prop.type) {
    case 'static':
      return prop.value;

    case 'variable':
    case 'useMemo':
    case 'function': {

      // Determine what to evaluate
      const toEvaluate = prop.reference || prop.body || prop.value;
      if (!toEvaluate) return null;

      // evaluateExpression handles everything:
      const result = evaluateExpression(toEvaluate, context, additionalContext);
      return result
    }

    default:
      return null;
  }
};

// Get text content considering state variables, with improved handling for combined content
export function getTextContent(
  currentItemId,
  evaluationContext,
  additionalContext

) {
  let content = '';
  const item = evaluationContext.state.items[currentItemId]
  if (item.children && Array.isArray(item.children)) {
    item.children.forEach((child) => {
      if (child.type === 'static') {
        // For static content, just use the value directly
        content += child.value || '';
      } else if (child.type === 'variable') {
        // Only evaluate variables when needed
        if (child.reference) {
          // content += child.reference || '';
          // console.log('child', child)
          const evalContext = getCompleteEvaluationContext(evaluationContext);
          // console.log('evalContext', evalContext)
          const result = evaluateExpression(child.reference, evalContext, additionalContext);
          // console.log('result', result)
          content += result !== undefined && result !== null ? String(result) : '';
        }
      }
    });
  }

  return content;
};


// Helper to get parent component variables for evaluation context
export function getParentVariables(currentItemId) {
  const parentVars = {};

  // Find parent of current item
  const parentEntry = Object.entries(state.containers).find(([_, children]) =>
    children.includes(currentItemId)
  );

  if (!parentEntry) return parentVars;

  // Find which panel owns this container
  const [containerId] = parentEntry;
  const parentPanelEntry = Object.entries(state.items).find(([_, item]) =>
    item.containerIds?.includes(containerId)
  );

  if (!parentPanelEntry) return parentVars;

  // Get parent ID and variables
  const [parentId] = parentPanelEntry;
  const parentItem = state.items[parentId];

  if (parentItem?.state?.variables) {
    // Add all parent variables to the context
    Object.entries(parentItem.state.variables).forEach(([key, variable]) => {
      if (variable.value !== undefined) {
        parentVars[key] = variable.value;
      }
    });

    // Recursively get grandparent variables
    const grandparentVars = getParentVariables(parentId);
    Object.assign(parentVars, grandparentVars);
  }

  return parentVars;
};
// Get all resolved props for component
export function getResolvedProps(
  {
    currentItemId,
    evaluationContext,
    additionalContext,
    className = null,
    style = null
  }) {
  const resolvedProps = {};
  let resolvedKey = undefined;
  let customRef = null; // Store separately

  const item = evaluationContext.state.items[currentItemId]
  // if (!item) console.error(currentItemId, 'not found in items')
  const context = getCompleteEvaluationContext(evaluationContext);
  // Resolve props from item definition
  Object.entries(item.props || {}).forEach(([key, prop]) => {
    if (key === 'key') {
      // Handle 'key' prop separately
      resolvedKey = resolvePropValue(prop, context, additionalContext);
    } else if (key === 'ref') {
      // Special handling for ref prop - DON'T add to resolvedProps yet
      const refObject = resolvePropValue(prop, context, additionalContext);
      if (refObject && typeof refObject === 'object' && 'current' in refObject) {
        // Store the callback ref separately
        customRef = (element) => {
          refObject.current = element;
          console.log('Setting ref.current to:', element);
        };
      }
    } else if (key !== 'children') { // Handle children separately
      resolvedProps[key] = resolvePropValue(prop, context, additionalContext);
    }
  });

  // Handle className merging
  if (className || item.props?.className) {
    resolvedProps.className = [
      resolvePropValue(item.props?.className, context, additionalContext),
      className
    ].filter(Boolean).join(' ');
  }

  // Handle style merging
  if (style || item.props?.style) {
    resolvedProps.style = {
      ...resolvePropValue(item.props?.style, context, additionalContext),
      ...style
    };
  }

  return { props: resolvedProps, key: resolvedKey, customRef };
};
