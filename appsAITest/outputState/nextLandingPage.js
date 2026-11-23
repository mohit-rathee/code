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
          "source": "next/image",
          "specifiers": [],
          "defaultImport": "Image"
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
      "componentType": "main",
      "containerIds": [
        "element-1-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex min-h-screen flex-col items-center justify-between p-24"
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
          "type": "static",
          "value": "z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"
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
      "componentType": "p",
      "containerIds": [
        "element-3-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
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
      "componentType": "code",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "font-mono font-bold"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "app/page.tsx"
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
          "value": "fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-6": {
      "id": "element-6",
      "type": "panel",
      "componentType": "a",
      "containerIds": [
        "element-6-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        },
        "href": {
          "type": "static",
          "value": "https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        },
        "target": {
          "type": "static",
          "value": "_blank"
        },
        "rel": {
          "type": "static",
          "value": "noopener noreferrer"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-6-expr-0": {
      "id": "element-6-expr-0",
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
          "reference": "\" \""
        }
      ]
    },
    "element-7": {
      "id": "element-7",
      "type": "item",
      "componentType": "Image",
      "containerIds": [],
      "props": {
        "src": {
          "type": "static",
          "value": "/vercel.svg"
        },
        "alt": {
          "type": "static",
          "value": "Vercel Logo"
        },
        "className": {
          "type": "static",
          "value": "dark:invert"
        },
        "width": {
          "type": "variable",
          "reference": "100"
        },
        "height": {
          "type": "variable",
          "reference": "24"
        },
        "priority": {
          "type": "static",
          "value": true
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "element-8": {
      "id": "element-8",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-8-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-9": {
      "id": "element-9",
      "type": "item",
      "componentType": "Image",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        },
        "src": {
          "type": "static",
          "value": "/next.svg"
        },
        "alt": {
          "type": "static",
          "value": "Next.js Logo"
        },
        "width": {
          "type": "variable",
          "reference": "180"
        },
        "height": {
          "type": "variable",
          "reference": "37"
        },
        "priority": {
          "type": "static",
          "value": true
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
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "element-10-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-11": {
      "id": "element-11",
      "type": "panel",
      "componentType": "a",
      "containerIds": [
        "element-11-container-1"
      ],
      "props": {
        "href": {
          "type": "static",
          "value": "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        },
        "className": {
          "type": "static",
          "value": "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        },
        "target": {
          "type": "static",
          "value": "_blank"
        },
        "rel": {
          "type": "static",
          "value": "noopener noreferrer"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-12": {
      "id": "element-12",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`mb-3 text-2xl font-semibold`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Docs"
        },
        {
          "type": "variable",
          "reference": "\" \""
        }
      ]
    },
    "element-14": {
      "id": "element-14",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`m-0 max-w-[30ch] text-sm opacity-50`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Find in-depth information about Next.js features and API."
        }
      ]
    },
    "element-15": {
      "id": "element-15",
      "type": "panel",
      "componentType": "a",
      "containerIds": [
        "element-15-container-1"
      ],
      "props": {
        "href": {
          "type": "static",
          "value": "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        },
        "className": {
          "type": "static",
          "value": "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        },
        "target": {
          "type": "static",
          "value": "_blank"
        },
        "rel": {
          "type": "static",
          "value": "noopener noreferrer"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "element-16": {
      "id": "element-16",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`mb-3 text-2xl font-semibold`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Learn"
        },
        {
          "type": "variable",
          "reference": "\" \""
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
          "type": "variable",
          "reference": "`m-0 max-w-[30ch] text-sm opacity-50`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Learn about Next.js in an interactive course with quizzes!"
        }
      ]
    },
    "element-19": {
      "id": "element-19",
      "type": "panel",
      "componentType": "a",
      "containerIds": [
        "element-19-container-1"
      ],
      "props": {
        "href": {
          "type": "static",
          "value": "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        },
        "className": {
          "type": "static",
          "value": "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        },
        "target": {
          "type": "static",
          "value": "_blank"
        },
        "rel": {
          "type": "static",
          "value": "noopener noreferrer"
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
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`mb-3 text-2xl font-semibold`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Templates"
        },
        {
          "type": "variable",
          "reference": "\" \""
        }
      ]
    },
    "element-22": {
      "id": "element-22",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`m-0 max-w-[30ch] text-sm opacity-50`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Discover and deploy boilerplate example Next.js projects."
        }
      ]
    },
    "element-23": {
      "id": "element-23",
      "type": "panel",
      "componentType": "a",
      "containerIds": [
        "element-23-container-1"
      ],
      "props": {
        "href": {
          "type": "static",
          "value": "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        },
        "className": {
          "type": "static",
          "value": "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        },
        "target": {
          "type": "static",
          "value": "_blank"
        },
        "rel": {
          "type": "static",
          "value": "noopener noreferrer"
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
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`mb-3 text-2xl font-semibold`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Deploy"
        },
        {
          "type": "variable",
          "reference": "\" \""
        }
      ]
    },
    "element-26": {
      "id": "element-26",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`m-0 max-w-[30ch] text-sm opacity-50`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Instantly deploy your Next.js site to a shareable URL with Vercel."
        }
      ]
    }
  },
  "containers": {
    "root-container": [
      "element-1"
    ],
    "element-1-container-1": [
      "element-2",
      "element-8",
      "element-10"
    ],
    "element-2-container-1": [
      "element-3",
      "element-5"
    ],
    "element-3-container-1": [
      "element-4"
    ],
    "element-5-container-1": [
      "element-6"
    ],
    "element-6-container-1": [
      "element-6-expr-0",
      "element-7"
    ],
    "element-8-container-1": [
      "element-9"
    ],
    "element-10-container-1": [
      "element-11",
      "element-15",
      "element-19",
      "element-23"
    ],
    "element-11-container-1": [
      "element-12",
      "element-14"
    ],
    "element-15-container-1": [
      "element-16",
      "element-18"
    ],
    "element-19-container-1": [
      "element-20",
      "element-22"
    ],
    "element-23-container-1": [
      "element-24",
      "element-26"
    ]
  }
}