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
          ]
        }
      ],
      "state": {
        "variables": {
          "activeTab": {
            "type": "useState",
            "value": "all",
            "setter": "setActiveTab"
          },
          "search": {
            "type": "useState",
            "value": "",
            "setter": "setSearch"
          },
          "currentPage": {
            "type": "useState",
            "value": 1,
            "setter": "setCurrentPage"
          },
          "selectedUser": {
            "type": "useState",
            "value": null,
            "setter": "setSelectedUser"
          },
          "users": {
            "type": "method_call",
            "value": "Array.from",
            "object": "Array",
            "method": "from",
            "arguments": [
              "{\n  length: 42\n}",
              "(_, i) => ({\n  id: i + 1,\n  name: `User ${i + 1}`,\n  email: `user${i + 1}@example.com`,\n  role: i % 2 === 0 ? \"Admin\" : \"User\"\n})"
            ]
          },
          "usersPerPage": {
            "type": "basic",
            "value": 10
          },
          "filteredUsers": {
            "type": "method_call",
            "value": "users.filter",
            "object": "users",
            "method": "filter",
            "arguments": [
              "user => {\n  const matchesTab = activeTab === \"all\" || user.role.toLowerCase() === activeTab;\n  const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());\n  return matchesTab && matchesSearch;\n}"
            ]
          },
          "paginatedUsers": {
            "type": "method_call",
            "value": "filteredUsers.slice",
            "object": "filteredUsers",
            "method": "slice",
            "arguments": [
              "(currentPage - 1) * usersPerPage",
              "currentPage * usersPerPage"
            ]
          },
          "totalPages": {
            "type": "method_call",
            "value": "Math.ceil",
            "object": "Math",
            "method": "ceil",
            "arguments": [
              "filteredUsers.length / usersPerPage"
            ]
          },
          "list": {
            "type": "basic",
            "value": [
              "all",
              "admin",
              "user"
            ]
          }
        },
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
          "value": "p-6 max-w-5xl mx-auto text-white"
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
          "value": "text-3xl font-bold mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "User Dashboard"
        }
      ]
    },
    "element-1-expr-1": {
      "id": "element-1-expr-1",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "/* Tabs */"
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
      "props": {
        "className": {
          "type": "static",
          "value": "flex gap-4 mb-4"
        }
      },
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
        "key": {
          "type": "variable",
          "reference": "tab"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => {\n  setActiveTab(tab);\n  setCurrentPage(1);\n}"
        },
        "className": {
          "type": "variable",
          "reference": "`px-4 py-2 rounded-lg ${activeTab === tab ? \"bg-blue-600\" : \"bg-gray-700\"} hover:bg-blue-500 transition`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "tab.charAt(0).toUpperCase() + tab.slice(1)"
        }
      ]
    },
    "dynamic-1": {
      "id": "dynamic-1",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "list",
        "itemVariable": "tab",
        "indexVariable": null,
        "templateId": "element-4"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-1-expr-3": {
      "id": "element-1-expr-3",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "/* Search */"
        }
      ]
    },
    "element-5": {
      "id": "element-5",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "text"
        },
        "placeholder": {
          "type": "static",
          "value": "Search users..."
        },
        "className": {
          "type": "static",
          "value": "w-full px-4 py-2 rounded-lg mb-4 bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
        },
        "value": {
          "type": "variable",
          "reference": "search"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => {\n  setSearch(e.target.value);\n  setCurrentPage(1);\n}"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "element-1-expr-5": {
      "id": "element-1-expr-5",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "/* Table */"
        }
      ]
    },
    "element-6": {
      "id": "element-6",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-6-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "overflow-x-auto rounded-lg border border-gray-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-7": {
      "id": "element-7",
      "type": "panel",
      "componentType": "table",
      "containerIds": [
        "element-7-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full text-left bg-gray-900"
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
      "componentType": "thead",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "element-15": {
      "id": "element-15",
      "type": "panel",
      "componentType": "tbody",
      "containerIds": [
        "element-15-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-16": {
      "id": "element-16",
      "type": "panel",
      "componentType": "tr",
      "containerIds": [
        "element-16-container-1"
      ],
      "props": {
        "key": {
          "type": "variable",
          "reference": "user.id"
        },
        "className": {
          "type": "static",
          "value": "hover:bg-gray-700"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-17": {
      "id": "element-17",
      "type": "item",
      "componentType": "td",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "user.id"
        }
      ]
    },
    "element-18": {
      "id": "element-18",
      "type": "item",
      "componentType": "td",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "user.name"
        }
      ]
    },
    "element-19": {
      "id": "element-19",
      "type": "item",
      "componentType": "td",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "user.email"
        }
      ]
    },
    "element-20": {
      "id": "element-20",
      "type": "item",
      "componentType": "td",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "user.role"
        }
      ]
    },
    "element-21": {
      "id": "element-21",
      "type": "panel",
      "componentType": "td",
      "containerIds": [
        "element-21-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-22": {
      "id": "element-22",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => setSelectedUser(user)"
        },
        "className": {
          "type": "static",
          "value": "text-blue-400 hover:underline"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "View"
        }
      ]
    },
    "dynamic-2": {
      "id": "dynamic-2",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "paginatedUsers",
        "itemVariable": "user",
        "indexVariable": null,
        "templateId": "element-16"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-1-expr-7": {
      "id": "element-1-expr-7",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "/* Pagination */"
        }
      ]
    },
    "element-23": {
      "id": "element-23",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-23-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-center mt-4 gap-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-24": {
      "id": "element-24",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "key": {
          "type": "variable",
          "reference": "i"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => setCurrentPage(i + 1)"
        },
        "className": {
          "type": "variable",
          "reference": "`px-3 py-1 rounded ${currentPage === i + 1 ? \"bg-blue-600\" : \"bg-gray-700\"} hover:bg-blue-500`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "i + 1"
        }
      ]
    },
    "dynamic-3": {
      "id": "dynamic-3",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "Array.from({\n  length: totalPages\n}, (_, i) => i)",
        "itemVariable": "i",
        "indexVariable": null,
        "templateId": "element-24"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-1-expr-9": {
      "id": "element-1-expr-9",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "/* Modal */"
        }
      ]
    },
    "element-25": {
      "id": "element-25",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-25-container-1"
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
    "element-26": {
      "id": "element-26",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-26-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gray-800 p-6 rounded-lg w-full max-w-md relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-27": {
      "id": "element-27",
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
          "type": "static",
          "value": "User Details"
        }
      ]
    },
    "element-28": {
      "id": "element-28",
      "type": "panel",
      "componentType": "p",
      "containerIds": [
        "element-28-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-29": {
      "id": "element-29",
      "type": "item",
      "componentType": "strong",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "ID:"
        }
      ]
    },
    "element-28-expr-1": {
      "id": "element-28-expr-1",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "selectedUser.id"
        }
      ]
    },
    "element-30": {
      "id": "element-30",
      "type": "panel",
      "componentType": "p",
      "containerIds": [
        "element-30-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-31": {
      "id": "element-31",
      "type": "item",
      "componentType": "strong",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Name:"
        }
      ]
    },
    "element-30-expr-1": {
      "id": "element-30-expr-1",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "selectedUser.name"
        }
      ]
    },
    "element-32": {
      "id": "element-32",
      "type": "panel",
      "componentType": "p",
      "containerIds": [
        "element-32-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-33": {
      "id": "element-33",
      "type": "item",
      "componentType": "strong",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Email:"
        }
      ]
    },
    "element-32-expr-1": {
      "id": "element-32-expr-1",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "selectedUser.email"
        }
      ]
    },
    "element-34": {
      "id": "element-34",
      "type": "panel",
      "componentType": "p",
      "containerIds": [
        "element-34-container-1"
      ],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-35": {
      "id": "element-35",
      "type": "item",
      "componentType": "strong",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Role:"
        }
      ]
    },
    "element-34-expr-1": {
      "id": "element-34-expr-1",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "selectedUser.role"
        }
      ]
    },
    "element-36": {
      "id": "element-36",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "onClick": {
          "type": "variable",
          "reference": "() => setSelectedUser(null)"
        },
        "className": {
          "type": "static",
          "value": "absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "×"
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
        "condition": "selectedUser",
        "trueTemplateId": "element-25",
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
      "element-1"
    ],
    "element-1-container-1": [
      "element-2",
      "element-1-expr-1",
      "element-3",
      "element-1-expr-3",
      "element-5",
      "element-1-expr-5",
      "element-6",
      "element-1-expr-7",
      "element-23",
      "element-1-expr-9",
      "dynamic-4"
    ],
    "element-3-container-1": [
      "dynamic-1"
    ],
    "element-6-container-1": [
      "element-7"
    ],
    "element-7-container-1": [
      "element-8",
      "element-15"
    ],
    "element-15-container-1": [
      "dynamic-2"
    ],
    "element-16-container-1": [
      "element-17",
      "element-18",
      "element-19",
      "element-20",
      "element-21"
    ],
    "element-21-container-1": [
      "element-22"
    ],
    "element-23-container-1": [
      "dynamic-3"
    ],
    "element-25-container-1": [
      "element-26"
    ],
    "element-26-container-1": [
      "element-27",
      "element-28",
      "element-30",
      "element-32",
      "element-34",
      "element-36"
    ],
    "element-28-container-1": [
      "element-29",
      "element-28-expr-1"
    ],
    "element-30-container-1": [
      "element-31",
      "element-30-expr-1"
    ],
    "element-32-container-1": [
      "element-33",
      "element-32-expr-1"
    ],
    "element-34-container-1": [
      "element-35",
      "element-34-expr-1"
    ]
  }
}