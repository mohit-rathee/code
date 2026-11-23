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
          "specifiers": [],
          "defaultImport": "React"
        },
        {
          "source": "@/components/FancyButton",
          "specifiers": [],
          "defaultImport": "FancyButton"
        },
        {
          "source": "@/components/Counter",
          "specifiers": [],
          "defaultImport": "Counter"
        }
      ],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-1": {
      "id": "element-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-1-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-2": {
      "id": "element-2",
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
          "value": "Welcome to Our Landing Page"
        }
      ]
    },
    "element-3": {
      "id": "element-3",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg mb-8 text-center max-w-md"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "This is a simple landing page with a reusable FancyButton component."
        }
      ]
    },
    "element-4": {
      "id": "element-4",
      "type": "panel",
      "componentType": "FancyButton",
      "containerIds": [
        "element-4-container-1"
      ],
      "props": {
        "hello": {
          "type": "variable",
          "reference": "ans"
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
      "componentType": "div",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "wwwooooowww"
        }
      ]
    },
    "element-6": {
      "id": "element-6",
      "type": "item",
      "componentType": "Counter",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    }
  },
  "containers": {
    "root-container": [
      "element-1"
    ],
    "element-1-container-1": [
      "element-2",
      "element-3",
      "element-4",
      "element-6"
    ],
    "element-4-container-1": [
      "element-5"
    ]
  }
}
