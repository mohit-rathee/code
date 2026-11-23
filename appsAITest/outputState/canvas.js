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
              "name": "useRef",
              "isTypeOnly": false
            },
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
          "canvasRef": {
            "type": "useRef",
            "value": null
          },
          "isDrawing": {
            "type": "useState",
            "value": false,
            "setter": "setIsDrawing"
          },
          "lastPosition": {
            "type": "useState",
            "value": null,
            "setter": "setLastPosition"
          },
          "getMousePosition": {
            "type": "basic",
            "value": "event => {\n  const canvas = canvasRef.current;\n  if (!canvas) return null;\n  const rect = canvas.getBoundingClientRect();\n  return {\n    x: event.clientX - rect.left,\n    y: event.clientY - rect.top\n  };\n}"
          },
          "handleMouseDown": {
            "type": "basic",
            "value": "event => {\n  const position = getMousePosition(event);\n  if (!position) return;\n  setIsDrawing(true);\n  setLastPosition(position);\n\n  // Draw initial dot\n  const canvas = canvasRef.current;\n  const ctx = canvas.getContext('2d');\n  ctx.fillStyle = 'black';\n  ctx.beginPath();\n  ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);\n  ctx.fill();\n}"
          },
          "handleMouseMove": {
            "type": "basic",
            "value": "event => {\n  if (!isDrawing || !lastPosition) return;\n  const currentPosition = getMousePosition(event);\n  if (!currentPosition) return;\n  const canvas = canvasRef.current;\n  const ctx = canvas.getContext('2d');\n\n  // Draw line from last position to current position\n  ctx.strokeStyle = 'black';\n  ctx.lineWidth = 3;\n  ctx.lineCap = 'round';\n  ctx.lineJoin = 'round';\n  ctx.beginPath();\n  ctx.moveTo(lastPosition.x, lastPosition.y);\n  ctx.lineTo(currentPosition.x, currentPosition.y);\n  ctx.stroke();\n  setLastPosition(currentPosition);\n}"
          },
          "handleMouseUp": {
            "type": "basic",
            "value": "() => {\n  setIsDrawing(false);\n  setLastPosition(null);\n}"
          },
          "handleMouseLeave": {
            "type": "basic",
            "value": "() => {\n  setIsDrawing(false);\n  setLastPosition(null);\n}"
          },
          "clearCanvas": {
            "type": "basic",
            "value": "() => {\n  const canvas = canvasRef.current;\n  if (!canvas) return;\n  const ctx = canvas.getContext('2d');\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n}"
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
          "value": "min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8 flex flex-col items-center justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "canvas-container": {
      "id": "canvas-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "canvas-container-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "canvas-title": {
      "id": "canvas-title",
      "type": "item",
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl font-bold text-center mb-6 text-gray-800"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Draw by Dragging on Canvas"
        }
      ]
    },
    "canvas-instructions": {
      "id": "canvas-instructions",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center mb-6 text-lg text-gray-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Click and drag on the canvas to draw smooth lines!"
        }
      ]
    },
    "drawing-canvas": {
      "id": "drawing-canvas",
      "type": "item",
      "componentType": "canvas",
      "containerIds": [],
      "props": {
        "ref": {
          "type": "variable",
          "reference": "canvasRef"
        },
        "width": {
          "type": "variable",
          "reference": "800"
        },
        "height": {
          "type": "variable",
          "reference": "600"
        },
        "onMouseDown": {
          "type": "variable",
          "reference": "handleMouseDown"
        },
        "onMouseMove": {
          "type": "variable",
          "reference": "handleMouseMove"
        },
        "onMouseUp": {
          "type": "variable",
          "reference": "handleMouseUp"
        },
        "onMouseLeave": {
          "type": "variable",
          "reference": "handleMouseLeave"
        },
        "className": {
          "type": "static",
          "value": "border-2 border-gray-300 rounded-lg cursor-crosshair bg-gray-50 hover:bg-gray-100 transition-colors mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "control-panel": {
      "id": "control-panel",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "control-panel-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-center gap-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "clear-button": {
      "id": "clear-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        },
        "onClick": {
          "type": "variable",
          "reference": "clearCanvas"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Clear Canvas"
        }
      ]
    },
    "canvas-info": {
      "id": "canvas-info",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Canvas Size: 800x600 | Line Width: 3px"
        }
      ]
    }
  },
  "containers": {
    "root-container": [
      "panel-1"
    ],
    "root-container-1": [
      "root-panel"
    ],
    "root-panel-container-1": [
      "canvas-container"
    ],
    "canvas-container-container-1": [
      "canvas-title",
      "canvas-instructions",
      "drawing-canvas",
      "control-panel"
    ],
    "control-panel-container-1": [
      "clear-button",
      "canvas-info"
    ]
  }
}