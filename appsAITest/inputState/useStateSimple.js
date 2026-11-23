export const state = {
  "items": {
    "root-panel": {
      "id": "root-panel",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["root-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8"
        }
      },
      "state": {
        "variables": {
          "isToggled": {
            "type": "useState",
            "value": false,
            "setter": "setIsToggled"
          }
        },
        "functions": {
          "handleToggle": {
            "type": "function",
            "body": "() => { setIsToggled(!isToggled); }"
          }
        }
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
        "variables": {
          "displayText": {
            "type": "variable",
            "reference": "isToggled ? 'ON ✅' : 'OFF ❌'"
          }
        },
        "functions": {}
      }
    },
    "toggle-button": {
      "id": "toggle-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "function",
          "reference": "handleToggle"
        },
        "className": {
          "type": "variable",
          "reference": "isToggled ? 'bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors' : 'bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors'"
        }
      },
      "state": {
        "variables": {
          "buttonText": {
            "type": "variable",
            "reference": "isToggled ? 'Turn OFF' : 'Turn ON'"
          }
        },
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container-1": [
      "status-display",
      "toggle-button"
    ]
  }
}
