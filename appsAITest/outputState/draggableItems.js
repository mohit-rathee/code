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
          "initialTasks": {
            "type": "basic",
            "value": [
              {
                "id": 1,
                "title": "Design UI",
                "status": "Todo",
                "color": "blue",
                "group": "Design"
              },
              {
                "id": 2,
                "title": "Write backend",
                "status": "In Progress",
                "color": "green",
                "group": "Backend"
              },
              {
                "id": 3,
                "title": "Deploy to server",
                "status": "Done",
                "color": "purple",
                "group": "DevOps"
              }
            ]
          },
          "columns": {
            "type": "basic",
            "value": [
              "Todo",
              "In Progress",
              "Done"
            ]
          },
          "tasks": {
            "type": "useState",
            "reference": "initialTasks",
            "setter": "setTasks"
          },
          "newTask": {
            "type": "useState",
            "value": {
              "title": "",
              "color": "gray",
              "group": ""
            },
            "setter": "setNewTask"
          },
          "editingTask": {
            "type": "useState",
            "value": null,
            "setter": "setEditingTask"
          },
          "isModalOpen": {
            "type": "useState",
            "value": false,
            "setter": "setIsModalOpen"
          },
          "handleDrop": {
            "type": "basic",
            "value": "(e, status) => {\n  const taskId = e.dataTransfer.getData(\"task-id\");\n  setTasks(prev => prev.map(task => task.id === Number(taskId) ? {\n    ...task,\n    status\n  } : task));\n}"
          },
          "handleDragStart": {
            "type": "basic",
            "value": "(e, id) => {\n  e.dataTransfer.setData(\"task-id\", id);\n}"
          },
          "handleSaveTask": {
            "type": "basic",
            "value": "() => {\n  if (!newTask.title.trim()) return;\n  if (editingTask) {\n    setTasks(prev => prev.map(t => t.id === editingTask.id ? {\n      ...editingTask,\n      ...newTask\n    } : t));\n  } else {\n    setTasks([...tasks, {\n      id: Date.now(),\n      ...newTask,\n      status: \"Todo\"\n    }]);\n  }\n  setNewTask({\n    title: \"\",\n    color: \"gray\",\n    group: \"\"\n  });\n  setEditingTask(null);\n  setIsModalOpen(false);\n}"
          },
          "handleEdit": {
            "type": "basic",
            "value": "task => {\n  setEditingTask(task);\n  setNewTask({\n    title: task.title,\n    color: task.color,\n    group: task.group\n  });\n  setIsModalOpen(true);\n}"
          },
          "handleDelete": {
            "type": "basic",
            "value": "id => {\n  setTasks(prev => prev.filter(task => task.id !== id));\n}"
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
    "task-manager-root": {
      "id": "task-manager-root",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "task-manager-root-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "min-h-screen bg-gray-900 text-white p-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "header": {
      "id": "header",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "header-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-between items-center mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "app-title": {
      "id": "app-title",
      "type": "item",
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-3xl font-bold"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Task Manager"
        }
      ]
    },
    "add-task-button": {
      "id": "add-task-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => {\n  setNewTask({\n    title: \"\",\n    color: \"gray\",\n    group: \"\"\n  });\n  setEditingTask(null);\n  setIsModalOpen(true);\n}"
        },
        "className": {
          "type": "static",
          "value": "bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "editingTask ? \"Edit Task\" : \"Add Task\""
        }
      ]
    },
    "columns-container": {
      "id": "columns-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "columns-container-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex gap-6"
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
        "key": {
          "type": "variable",
          "reference": "col"
        },
        "onDrop": {
          "type": "variable",
          "reference": "e => {\n  const taskId = e.dataTransfer.getData(\"task-id\");\n  setTasks(prev => prev.map(task => task.id === Number(taskId) ? {\n    ...task,\n    status: col\n  } : task));\n}"
        },
        "onDragOver": {
          "type": "variable",
          "reference": "e => e.preventDefault()"
        },
        "className": {
          "type": "static",
          "value": "flex-1 bg-gray-800 p-4 rounded-xl shadow-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "column-title": {
      "id": "column-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold text-white mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "col"
        }
      ]
    },
    "task-list": {
      "id": "task-list",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "task-list-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex flex-col gap-3"
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
        "key": {
          "type": "variable",
          "reference": "task.id"
        },
        "draggable": {
          "type": "variable",
          "reference": "true"
        },
        "onDragStart": {
          "type": "variable",
          "reference": "e => e.dataTransfer.setData(\"task-id\", task.id)"
        },
        "className": {
          "type": "variable",
          "reference": "`bg-${task.color}-700 text-white p-3 rounded-lg shadow-md cursor-grab hover:bg-${task.color}-600`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-3": {
      "id": "element-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-3-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-between items-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-4": {
      "id": "element-4",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-4-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "task-title": {
      "id": "task-title",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "font-semibold"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "task.title"
        }
      ]
    },
    "task-group": {
      "id": "task-group",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "task.group"
        }
      ]
    },
    "element-5": {
      "id": "element-5",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-5-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex gap-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "edit-task-button": {
      "id": "edit-task-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => {\n  setEditingTask(task);\n  setNewTask({\n    title: task.title,\n    color: task.color,\n    group: task.group\n  });\n  setIsModalOpen(true);\n}"
        },
        "className": {
          "type": "static",
          "value": "text-xs bg-yellow-500 hover:bg-yellow-400 px-2 py-1 rounded"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Edit"
        }
      ]
    },
    "delete-task-button": {
      "id": "delete-task-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => setTasks(prev => prev.filter(t => t.id !== task.id))"
        },
        "className": {
          "type": "static",
          "value": "text-xs bg-red-600 hover:bg-red-500 px-2 py-1 rounded"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Delete"
        }
      ]
    },
    "dynamic-3": {
      "id": "dynamic-3",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": true,
      "operation": {
        "type": "conditional",
        "condition": "task.status === col",
        "trueTemplateId": "element-2",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-2": {
      "id": "dynamic-2",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "tasks",
        "itemVariable": "task",
        "indexVariable": "index",
        "templateId": "dynamic-3"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-1": {
      "id": "dynamic-1",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "columns",
        "itemVariable": "col",
        "indexVariable": "index",
        "templateId": "element-1"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "modal-overlay": {
      "id": "modal-overlay",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "modal-overlay-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "modal": {
      "id": "modal",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "modal-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gray-800 p-6 rounded-lg w-full max-w-md"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "modal-title": {
      "id": "modal-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "editingTask ? \"Edit Task\" : \"Add New Task\""
        }
      ]
    },
    "input-title": {
      "id": "input-title",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "text"
        },
        "value": {
          "type": "variable",
          "reference": "newTask.title"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setNewTask({\n  ...newTask,\n  title: e.target.value\n})"
        },
        "placeholder": {
          "type": "static",
          "value": "Enter task title..."
        },
        "className": {
          "type": "static",
          "value": "w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "input-group": {
      "id": "input-group",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "text"
        },
        "value": {
          "type": "variable",
          "reference": "newTask.group"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setNewTask({\n  ...newTask,\n  group: e.target.value\n})"
        },
        "placeholder": {
          "type": "static",
          "value": "Enter group name..."
        },
        "className": {
          "type": "static",
          "value": "w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "select-color": {
      "id": "select-color",
      "type": "panel",
      "componentType": "select",
      "containerIds": [
        "select-color-container-1"
      ],
      "props": {
        "value": {
          "type": "variable",
          "reference": "newTask.color"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setNewTask({\n  ...newTask,\n  color: e.target.value\n})"
        },
        "className": {
          "type": "static",
          "value": "w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-6": {
      "id": "element-6",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "gray"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Gray"
        }
      ]
    },
    "element-7": {
      "id": "element-7",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "blue"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Blue"
        }
      ]
    },
    "element-8": {
      "id": "element-8",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "green"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Green"
        }
      ]
    },
    "element-9": {
      "id": "element-9",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "purple"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Purple"
        }
      ]
    },
    "element-10": {
      "id": "element-10",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "red"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Red"
        }
      ]
    },
    "element-11": {
      "id": "element-11",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "yellow"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Yellow"
        }
      ]
    },
    "modal-actions": {
      "id": "modal-actions",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "modal-actions-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-end gap-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cancel-button": {
      "id": "cancel-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => {\n  setIsModalOpen(false);\n  setEditingTask(null);\n  setNewTask({\n    title: \"\",\n    color: \"gray\",\n    group: \"\"\n  });\n}"
        },
        "className": {
          "type": "static",
          "value": "px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Cancel"
        }
      ]
    },
    "save-button": {
      "id": "save-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "handleSaveTask"
        },
        "className": {
          "type": "static",
          "value": "px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "editingTask ? \"Update\" : \"Add\""
        }
      ]
    },
    "dynamic-4": {
      "id": "dynamic-4",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "isModalOpen",
        "trueTemplateId": "modal-overlay",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container": [
      "panel-1"
    ],
    "root-container-1": [
      "task-manager-root"
    ],
    "task-manager-root-container-1": [
      "header",
      "columns-container",
      "dynamic-4"
    ],
    "header-container-1": [
      "app-title",
      "add-task-button"
    ],
    "columns-container-container-1": [
      "dynamic-1"
    ],
    "element-1-container-1": [
      "column-title",
      "task-list"
    ],
    "task-list-container-1": [
      "dynamic-2"
    ],
    "element-2-container-1": [
      "element-3"
    ],
    "element-3-container-1": [
      "element-4",
      "element-5"
    ],
    "element-4-container-1": [
      "task-title",
      "task-group"
    ],
    "element-5-container-1": [
      "edit-task-button",
      "delete-task-button"
    ],
    "modal-overlay-container-1": [
      "modal"
    ],
    "modal-container-1": [
      "modal-title",
      "input-title",
      "input-group",
      "select-color",
      "modal-actions"
    ],
    "select-color-container-1": [
      "element-6",
      "element-7",
      "element-8",
      "element-9",
      "element-10",
      "element-11"
    ],
    "modal-actions-container-1": [
      "cancel-button",
      "save-button"
    ]
  }
}