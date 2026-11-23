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
          "value": "min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8 flex flex-col items-center justify-center"
        }
      },
      "state": {
        "variables": {
          "canvasRef": {
            "type": "useRef",
            "value": "null"
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
          }
        },
        "functions": {
          "getMousePosition": {
            "type": "function",
            "body": `(event) => {
              const canvas = canvasRef.current;
              if (!canvas) return null;
              
              const rect = canvas.getBoundingClientRect();
              return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
              };
            }`
          },
          "handleMouseDown": {
            "type": "function",
            "body": `(event) => {
              const position = getMousePosition(event);
              if (!position) return;
              
              setIsDrawing(true);
              setLastPosition(position);
              
              // Draw initial dot
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = 'black';
              ctx.beginPath();
              ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
              ctx.fill();
            }`
          },
          "handleMouseMove": {
            "type": "function",
            "body": `(event) => {
              if (!isDrawing || !lastPosition) return;
              
              const currentPosition = getMousePosition(event);
              if (!currentPosition) return;
              
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              
              // Draw line from last position to current position
              ctx.strokeStyle = 'black';
              ctx.lineWidth = 3;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              
              ctx.beginPath();
              ctx.moveTo(lastPosition.x, lastPosition.y);
              ctx.lineTo(currentPosition.x, currentPosition.y);
              ctx.stroke();
              
              setLastPosition(currentPosition);
            }`
          },
          "handleMouseUp": {
            "type": "function",
            "body": `() => {
              setIsDrawing(false);
              setLastPosition(null);
            }`
          },
          "handleMouseLeave": {
            "type": "function",
            "body": `() => {
              setIsDrawing(false);
              setLastPosition(null);
            }`
          },
          "clearCanvas": {
            "type": "function",
            "body": `() => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }`
          }
        }
      }
    },
    "canvas-container": {
      "id": "canvas-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["canvas-container-1"],
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
        },
        "children": {
          "type": "static",
          "value": "Draw by Dragging on Canvas"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "Click and drag on the canvas to draw smooth lines!"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
          "type": "static",
          "value": 800
        },
        "height": {
          "type": "static",
          "value": 600
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
      }
    },
    "control-panel": {
      "id": "control-panel",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["control-panel-1"],
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
          "type": "function",
          "reference": "clearCanvas"
        },
        "children": {
          "type": "static",
          "value": "Clear Canvas"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "Canvas Size: 800x600 | Line Width: 3px"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container-1": ["canvas-container"],
    "canvas-container-1": [
      "canvas-title",
      "canvas-instructions",
      "drawing-canvas",
      "control-panel"
    ],
    "control-panel-1": [
      "clear-button",
      "canvas-info"
    ]
  }
};
