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
            }
          ],
          "defaultImport": "React"
        }
      ],
      "state": {
        "variables": {
          "isToggled": {
            "type": "useState",
            "value": false,
            "setter": "setIsToggled"
          },
          "handleToggle": {
            "type": "basic",
            "value": "() => {\n  setIsToggled(!isToggled);\n}"
          }
        },
        "functions": {}
      }
    },
    "panel-1": {
      "id": "panel-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "root-container-1"
      ],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{\n  \"width\": \"100%\",\n  \"height\": \"100%\"\n}"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "panel-2": {
      "id": "panel-2",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "panel-1-container-1"
      ],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{\n  \"width\": \"100%\",\n  \"height\": \"100%\"\n}"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "panel-3": {
      "id": "panel-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "panel-2-container-1"
      ],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{\n  \"width\": \"100%\",\n  \"height\": \"100%\"\n}"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "root-panel": {
      "id": "root-panel",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "root-panel-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "status-display": {
      "id": "status-display",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "isToggled ? 'text-6xl text-green-600 font-bold mb-8' : 'text-6xl text-red-600 font-bold mb-8'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "isToggled ? 'off' : 'on'"
        }
      ]
    },
    "calculation": {
      "id": "calculation",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "isToggled ? 'text-6xl text-green-600 font-bold mb-8' : 'text-6xl text-red-600 font-bold mb-8'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "2 + 2"
        }
      ]
    },
    "toggle-button": {
      "id": "toggle-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "handleToggle"
        },
        "className": {
          "type": "variable",
          "reference": "isToggled ? 'bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors' : 'bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "change"
        }
      ]
    }
  },
  "containers": {
    "root-container": [
      "panel-1"
    ],
    "root-container-1": [
      "panel-2"
    ],
    "panel-1-container-1": [
      "panel-3"
    ],
    "panel-2-container-1": [
      "root-panel"
    ],
    "root-panel-container-1": [
      "status-display",
      "calculation",
      "toggle-button"
    ]
  }
}