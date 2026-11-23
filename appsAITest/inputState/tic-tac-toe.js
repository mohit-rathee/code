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
          "board": {
            "type": "useState",
            "value": ["", "", "", "", "", "", "", "", ""],
            "setter": "setBoard"
          },
          "currentPlayer": {
            "type": "useState",
            "value": "X",
            "setter": "setCurrentPlayer"
          },
          "gameStatus": {
            "type": "useState",
            "value": "playing",
            "setter": "setGameStatus"
          },
          "winner": {
            "type": "useState",
            "value": null,
            "setter": "setWinner"
          },
          "isComputerTurn": {
            "type": "useState",
            "value": false,
            "setter": "setIsComputerTurn"
          }
        },
        "functions": {
          "checkWinner": {
            "type": "function",
            "body": `(board) => {
              const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6] // diagonals
              ];
              
              for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                  return board[a];
                }
              }
              
              if (board.every(cell => cell !== "")) {
                return "draw";
              }
              
              return null;
            }`
          },
          "makeMove": {
            "type": "function",
            "body": `(index) => {
              if (board[index] !== "" || gameStatus !== "playing" || isComputerTurn) return;
              
              const newBoard = [...board];
              newBoard[index] = "X";
              setBoard(newBoard);
              
              const result = checkWinner(newBoard);
              if (result) {
                setGameStatus("finished");
                setWinner(result);
                return;
              }
              
              setIsComputerTurn(true);
              
              // Computer move after a delay
              setTimeout(() => {
                const emptyCells = newBoard.map((cell, i) => cell === "" ? i : null).filter(i => i !== null);
                if (emptyCells.length > 0) {
                  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                  newBoard[randomIndex] = "O";
                  setBoard([...newBoard]);
                  
                  const computerResult = checkWinner(newBoard);
                  if (computerResult) {
                    setGameStatus("finished");
                    setWinner(computerResult);
                  }
                }
                setIsComputerTurn(false);
              }, 500);
            }`
          },
          "resetGame": {
            "type": "function",
            "body": `() => {
              setBoard(["", "", "", "", "", "", "", "", ""]);
              setCurrentPlayer("X");
              setGameStatus("playing");
              setWinner(null);
              setIsComputerTurn(false);
            }`
          }
        }
      }
    },
    "game-container": {
      "id": "game-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["game-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "game-title": {
      "id": "game-title",
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
          "value": "Tic-Tac-Toe"
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
          "type": "static",
          "value": "text-center mb-6 text-lg font-semibold"
        },
        "children": {
          "type": "variable",
          "reference": "gameStatus === 'playing' ? (isComputerTurn ? 'Computer thinking...' : 'Your turn (X)') : (winner === 'X' ? 'You Win! 🎉' : winner === 'O' ? 'Computer Wins! 🤖' : 'It\\'s a Draw! 🤝')"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "game-board": {
      "id": "game-board",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["game-board-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "grid grid-cols-3 gap-2 mb-6 bg-gray-200 p-4 rounded-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-0": {
      "id": "cell-0",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(0)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[0] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[0]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-1": {
      "id": "cell-1",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(1)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[1] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[1]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-2": {
      "id": "cell-2",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(2)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[2] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[2]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-3": {
      "id": "cell-3",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(3)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[3] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[3]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-4": {
      "id": "cell-4",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(4)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[4] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[4]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-5": {
      "id": "cell-5",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(5)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[5] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[5]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-6": {
      "id": "cell-6",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(6)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[6] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[6]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-7": {
      "id": "cell-7",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(7)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[7] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[7]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cell-8": {
      "id": "cell-8",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        },
        "onClick": {
          "type": "function",
          "reference": "() => makeMove(8)"
        },
        "disabled": {
          "type": "variable",
          "reference": "board[8] !== '' || gameStatus !== 'playing' || isComputerTurn"
        },
        "children": {
          "type": "variable",
          "reference": "board[8]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "reset-button": {
      "id": "reset-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full"
        },
        "onClick": {
          "type": "function",
          "reference": "resetGame"
        },
        "children": {
          "type": "static",
          "value": "New Game"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container-1": ["game-container"],
    "game-container-1": [
      "game-title",
      "status-display",
      "game-board",
      "reset-button"
    ],
    "game-board-container-1": [
      "cell-0", "cell-1", "cell-2",
      "cell-3", "cell-4", "cell-5",
      "cell-6", "cell-7", "cell-8"
    ]
  }
};
