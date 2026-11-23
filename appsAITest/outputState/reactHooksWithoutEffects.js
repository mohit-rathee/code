export const state = {
  "items": {
    "root": {
      "id": "root",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "root-container"
      ],
      "props": {
        "style": {
          "type": "static",
          "value": {
            "width": "100%",
            "height": "100%"
          }
        }
      },
      "imports": [
        {
          "source": "react",
          "specifiers": [
            {
              "name": "useState",
              "isTypeOnly": false
            },
            {
              "name": "useReducer",
              "isTypeOnly": false
            },
            {
              "name": "useRef",
              "isTypeOnly": false
            },
            {
              "name": "useMemo",
              "isTypeOnly": false
            },
            {
              "name": "useCallback",
              "isTypeOnly": false
            },
            {
              "name": "useContext",
              "isTypeOnly": false
            },
            {
              "name": "useId",
              "isTypeOnly": false
            },
            {
              "name": "useSyncExternalStore",
              "isTypeOnly": false
            },
            {
              "name": "useDeferredValue",
              "isTypeOnly": false
            },
            {
              "name": "useTransition",
              "isTypeOnly": false
            },
            {
              "name": "createContext",
              "isTypeOnly": false
            },
            {
              "name": "useDebugValue",
              "isTypeOnly": false
            }
          ],
          "defaultImport": "React"
        }
      ],
      "state": {
        "variables": {
          "ThemeContext": {
            "type": "basic",
            "value": "createContext()",
            "declarationKind": "const",
            "isRootLevel": true
          },
          "subscribers": {
            "type": "basic",
            "value": [],
            "declarationKind": "let",
            "isRootLevel": true
          },
          "storeValue": {
            "type": "basic",
            "value": 0,
            "declarationKind": "let",
            "isRootLevel": true
          },
          "counterReducer": {
            "type": "function",
            "reference": "// --------------------------------------------------\n// Reducer function for useReducer\n// --------------------------------------------------\nfunction counterReducer(state, action) {\n  switch (action.type) {\n    case \"increment\":\n      return state + 1;\n    case \"decrement\":\n      return state - 1;\n    default:\n      return state;\n  }\n}",
            "isRootLevel": true
          },
          "subscribe": {
            "type": "function",
            "reference": "function subscribe(callback) {\n  subscribers.push(callback);\n  return () => {\n    subscribers = subscribers.filter(cb => cb !== callback);\n  };\n}",
            "isRootLevel": true
          },
          "getSnapshot": {
            "type": "function",
            "reference": "function getSnapshot() {\n  return storeValue;\n}",
            "isRootLevel": true
          },
          "incrementStore": {
            "type": "function",
            "reference": "function incrementStore() {\n  storeValue++;\n  subscribers.forEach(cb => cb());\n}\n\n// --------------------------------------------------\n// Custom hook with useDebugValue\n// --------------------------------------------------",
            "isRootLevel": true
          },
          "use_custom_counter": {
            "type": "function",
            "reference": "// --------------------------------------------------\n// Custom hook with useDebugValue\n// --------------------------------------------------\nfunction use_custom_counter(initialValue = 0) {\n  const [value, setValue] = useState(initialValue);\n  useDebugValue(value > 5 ? \"High count\" : \"Low count\");\n  const increment = () => setValue(v => v + 1);\n  return [value, increment];\n}\n// --------------------------------------------------\n// Single JSX App component\n// --------------------------------------------------",
            "isRootLevel": true
          },
          "value": {
            "type": "useState",
            "declarationKind": "const",
            "reference": "initialValue",
            "setter": "setValue"
          },
          "increment": {
            "type": "basic",
            "value": "() => setValue(v => v + 1)",
            "declarationKind": "const",
            "isRootLevel": false
          },
          "theme": {
            "type": "useState",
            "declarationKind": "const",
            "value": "light",
            "setter": "setTheme"
          },
          "toggleTheme": {
            "type": "useCallback",
            "declarationKind": "const",
            "value": "() => setTheme(prev => prev === \"light\" ? \"dark\" : \"light\")",
            "dependencies": []
          },
          "name": {
            "type": "useState",
            "declarationKind": "const",
            "value": "",
            "setter": "setName"
          },
          "count": {
            "type": "useReducer",
            "reducer": "counterReducer",
            "value": "0",
            "dispatch": "dispatch",
            "declarationKind": "const",
            "isRootLevel": false
          },
          "inputRef": {
            "type": "useRef",
            "declarationKind": "const"
          },
          "expensiveCalc": {
            "type": "useMemo",
            "declarationKind": "const",
            "value": "() => count * 1000",
            "dependencies": [
              "count"
            ]
          },
          "handleFocus": {
            "type": "useCallback",
            "declarationKind": "const",
            "value": "() => inputRef.current?.focus()",
            "dependencies": []
          },
          "id": {
            "type": "useId",
            "declarationKind": "const"
          },
          "storeVal": {
            "type": "useSyncExternalStore",
            "declarationKind": "const",
            "subscribe": "subscribe",
            "getSnapshot": "getSnapshot",
            "getServerSnapshot": "() => {}"
          },
          "deferredName": {
            "type": "useDeferredValue",
            "declarationKind": "const",
            "value": "name"
          },
          "isPending": {
            "type": "useTransition",
            "value": false,
            "startTransition": "startTransition",
            "declarationKind": "const",
            "isRootLevel": false
          },
          "debugCount_incDebugCount": {
            "type": "arrayDestructuring",
            "variables": [
              "debugCount",
              "incDebugCount"
            ],
            "value": "use_custom_counter(2)",
            "declarationKind": "const",
            "isRootLevel": false
          }
        },
        "functions": {
          "effect-0": {
            "type": "useEffect",
            "body": "() => {}",
            "dependencies": []
          },
          "effect-1": {
            "type": "useLayoutEffect",
            "body": "() => {}",
            "dependencies": []
          },
          "effect-2": {
            "type": "useInsertionEffect",
            "body": "() => {}",
            "dependencies": []
          }
        }
      }
    },
    "element-1": {
      "id": "element-1",
      "type": "panel",
      "componentType": "ThemeContext.Provider",
      "containerIds": [
        "element-1-container-1"
      ],
      "props": {
        "value": {
          "type": "variable",
          "reference": "{\n  theme,\n  toggleTheme\n}"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-2": {
      "id": "element-2",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-2-container-1"
      ],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${theme === \"dark\" ? \"bg-gray-900 text-white\" : \"bg-gray-50 text-gray-800\"}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-3": {
      "id": "element-3",
      "type": "item",
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl font-bold mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "React Hooks Playground (No Effects)"
        }
      ]
    },
    "element-4": {
      "id": "element-4",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-4-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-5": {
      "id": "element-5",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg mb-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Current Theme:"
        },
        {
          "type": "variable",
          "reference": "theme"
        }
      ]
    },
    "element-6": {
      "id": "element-6",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "toggleTheme"
        },
        "className": {
          "type": "static",
          "value": "bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Toggle Theme"
        }
      ]
    },
    "element-7": {
      "id": "element-7",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-7-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-8": {
      "id": "element-8",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "htmlFor": {
          "type": "variable",
          "reference": "id"
        },
        "className": {
          "type": "static",
          "value": "mr-2 font-medium"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Enter Name:"
        }
      ]
    },
    "element-9": {
      "id": "element-9",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "id": {
          "type": "variable",
          "reference": "id"
        },
        "ref": {
          "type": "variable",
          "reference": "inputRef"
        },
        "className": {
          "type": "static",
          "value": "border px-2 py-1 rounded text-black"
        },
        "value": {
          "type": "variable",
          "reference": "name"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => startTransition(() => {\n  setName(e.target.value);\n})"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "element-10": {
      "id": "element-10",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "handleFocus"
        },
        "className": {
          "type": "static",
          "value": "ml-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Focus Input"
        }
      ]
    },
    "element-11": {
      "id": "element-11",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Immediate Name:"
        },
        {
          "type": "variable",
          "reference": "name"
        }
      ]
    },
    "element-12": {
      "id": "element-12",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-1 text-gray-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Deferred Name:"
        },
        {
          "type": "variable",
          "reference": "deferredName"
        }
      ]
    },
    "element-13": {
      "id": "element-13",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-orange-500"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Updating..."
        }
      ]
    },
    "dynamic-1": {
      "id": "dynamic-1",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "isPending",
        "trueTemplateId": "element-13",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-14": {
      "id": "element-14",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-14-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-15": {
      "id": "element-15",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Reducer Counter:"
        },
        {
          "type": "variable",
          "reference": "count"
        }
      ]
    },
    "element-16": {
      "id": "element-16",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => dispatch({\n  type: \"increment\"\n})"
        },
        "className": {
          "type": "static",
          "value": "mr-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "+"
        }
      ]
    },
    "element-17": {
      "id": "element-17",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => dispatch({\n  type: \"decrement\"\n})"
        },
        "className": {
          "type": "static",
          "value": "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "-"
        }
      ]
    },
    "element-18": {
      "id": "element-18",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-2 text-gray-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Expensive Calculation:"
        },
        {
          "type": "variable",
          "reference": "expensiveCalc"
        }
      ]
    },
    "element-19": {
      "id": "element-19",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-19-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-20": {
      "id": "element-20",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Store Value:"
        },
        {
          "type": "variable",
          "reference": "storeVal"
        }
      ]
    },
    "element-21": {
      "id": "element-21",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "incrementStore"
        },
        "className": {
          "type": "static",
          "value": "bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Increment Store"
        }
      ]
    },
    "element-22": {
      "id": "element-22",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-22-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-23": {
      "id": "element-23",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Debug Counter:"
        },
        {
          "type": "variable",
          "reference": "debugCount"
        }
      ]
    },
    "element-24": {
      "id": "element-24",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "incDebugCount"
        },
        "className": {
          "type": "static",
          "value": "bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Increment Debug Counter"
        }
      ]
    }
  },
  "containers": {
    "root-container": [
      "element-1"
    ],
    "element-1-container-1": [
      "element-2"
    ],
    "element-2-container-1": [
      "element-3",
      "element-4",
      "element-7",
      "element-14",
      "element-19",
      "element-22"
    ],
    "element-4-container-1": [
      "element-5",
      "element-6"
    ],
    "element-7-container-1": [
      "element-8",
      "element-9",
      "element-10",
      "element-11",
      "element-12",
      "dynamic-1"
    ],
    "element-14-container-1": [
      "element-15",
      "element-16",
      "element-17",
      "element-18"
    ],
    "element-19-container-1": [
      "element-20",
      "element-21"
    ],
    "element-22-container-1": [
      "element-23",
      "element-24"
    ]
  }
}