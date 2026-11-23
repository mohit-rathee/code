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
          "count": {
            "type": "useState",
            "value": 0,
            "setter": "setCount"
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
    "element-1": {
      "id": "element-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-1-container-1"
      ],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{\n  display: \"flex\",\n  flexDirection: \"column\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  height: \"100vh\",\n  backgroundColor: \"#f9f9f9\",\n  fontFamily: \"Arial, sans-serif\"\n}"
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
        "style": {
          "type": "variable",
          "reference": "{\n  fontSize: \"28px\",\n  fontWeight: \"bold\",\n  marginBottom: \"20px\"\n}"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Counter:"
        },
        {
          "type": "variable",
          "reference": "count"
        }
      ]
    },
    "element-3": {
      "id": "element-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-3-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-4": {
      "id": "element-4",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{\n  padding: \"10px 20px\",\n  margin: \"5px\",\n  border: \"none\",\n  borderRadius: \"6px\",\n  cursor: \"pointer\",\n  fontSize: \"16px\",\n  color: \"white\",\n  backgroundColor: \"green\"\n}"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => setCount(count + 1)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Increment"
        }
      ]
    },
    "element-5": {
      "id": "element-5",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{{\n  padding: \"10px 20px\",\n  margin: \"5px\",\n  border: \"none\",\n  borderRadius: \"6px\",\n  cursor: \"pointer\",\n  fontSize: \"16px\",\n  color: \"white\",\n  backgroundColor: \"red\"\n}}"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => setCount(count - 1)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Decrement"
        }
      ]
    },
    "element-6": {
      "id": "element-6",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "style": {
          "type": "variable",
          "reference": "{\n  marginTop: \"20px\",\n  fontSize: \"18px\",\n  color: count % 2 === 0 ? \"blue\" : \"orange\"\n}"
        },
        "className": {
          "type": "variable",
          "reference": "count % 2 === 0 ? \"even\" : \"odd\""
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "count % 2 === 0 ? \"Even Number\" : \"Odd Number\""
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
      "element-1"
    ],
    "element-1-container-1": [
      "element-2",
      "element-3",
      "element-6"
    ],
    "element-3-container-1": [
      "element-4",
      "element-5"
    ]
  }
}
