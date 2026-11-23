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
            },
            {
              "name": "useCallback",
              "isTypeOnly": false
            },
            {
              "name": "useEffect",
              "isTypeOnly": false
            },
            {
              "name": "useMemo",
              "isTypeOnly": false
            }
          ],
          "defaultImport": "React"
        }
      ],
      "state": {
        "variables": {
          "dogsArrayRef": {
            "type": "useRef",
            "value": []
          },
          "currentImageIndex": {
            "type": "useState",
            "value": -1,
            "setter": "setCurrentImageIndex"
          },
          "isLoading": {
            "type": "useState",
            "value": false,
            "setter": "setIsLoading"
          },
          "error": {
            "type": "useState",
            "value": null,
            "setter": "setError"
          },
          "hasInitialized": {
            "type": "useState",
            "value": false,
            "setter": "setHasInitialized"
          },
          "scrollTrigger": {
            "type": "useState",
            "value": 0,
            "setter": "setScrollTrigger"
          },
          "goToPrevious": {
            "type": "useCallback",
            "value": "async () => {\n  if (currentImageIndex > 0) {\n    setCurrentImageIndex(currentImageIndex - 1);\n    console.log(`⬅️ Going to previous: ${currentImageIndex - 1}`);\n  }\n}",
            "dependencies": [
              "currentImageIndex"
            ]
          },
          "goToNext": {
            "type": "useCallback",
            "value": "async () => {\n  if (currentImageIndex >= 0 && currentImageIndex < dogsArrayRef.current.length - 1) {\n    setCurrentImageIndex(currentImageIndex + 1);\n    console.log(`➡️ Going to next: ${currentImageIndex + 1}`);\n\n    // Smart fetch: Load more when within 2 images of the end\n    const remainingImages = dogsArrayRef.current.length - (currentImageIndex + 1);\n    if (remainingImages <= 2 && !isLoading) {\n      console.log('🤖 Smart fetch: Loading more dogs proactively...');\n      await fetchDogImage();\n    }\n  } else {\n    // At the end, fetch new image\n    await fetchDogImage();\n  }\n}",
            "dependencies": [
              "currentImageIndex",
              "isLoading"
            ]
          },
          "jumpToIndex": {
            "type": "useCallback",
            "value": "targetIndex => {\n  if (targetIndex !== currentImageIndex && targetIndex >= 0 && targetIndex < dogsArrayRef.current.length) {\n    setCurrentImageIndex(targetIndex);\n    console.log(`🎯 Jumping to index: ${targetIndex}`);\n  }\n}",
            "dependencies": [
              "currentImageIndex"
            ]
          },
          "toggleLike": {
            "type": "useCallback",
            "value": "dogId => {\n  const dogIndex = dogsArrayRef.current.findIndex(dog => dog.id === dogId);\n  if (dogIndex !== -1) {\n    dogsArrayRef.current[dogIndex].liked = !dogsArrayRef.current[dogIndex].liked;\n    setScrollTrigger(prev => prev + 1); // Trigger re-render\n    console.log(`❤️ Toggled like for: ${dogsArrayRef.current[dogIndex].breedName}`);\n  }\n}",
            "dependencies": []
          },
          "removeDog": {
            "type": "useCallback",
            "value": "async dogId => {\n  const dogIndex = dogsArrayRef.current.findIndex(dog => dog.id === dogId);\n  if (dogIndex !== -1) {\n    const removedDog = dogsArrayRef.current[dogIndex];\n    dogsArrayRef.current = dogsArrayRef.current.filter(dog => dog.id !== dogId);\n\n    // Adjust current index if necessary\n    if (currentImageIndex >= dogsArrayRef.current.length && dogsArrayRef.current.length > 0) {\n      setCurrentImageIndex(dogsArrayRef.current.length - 1);\n    } else if (dogsArrayRef.current.length === 0) {\n      setCurrentImageIndex(0);\n      await fetchDogImage(); // Fetch new image if array is empty\n    }\n    setScrollTrigger(prev => prev + 1); // Trigger re-render\n    console.log(`🗑️ Removed dog: ${removedDog.breedName}`);\n  }\n}",
            "dependencies": [
              "currentImageIndex"
            ]
          },
          "extractImageInfo": {
            "type": "basic",
            "value": "imageUrl => {\n  try {\n    const urlParts = imageUrl.split('/');\n    const fileName = urlParts[urlParts.length - 1];\n    const breedInfo = urlParts.find(part => part.includes('breeds'));\n    const breedIndex = urlParts.indexOf(breedInfo);\n    const breedName = urlParts[breedIndex + 1] || 'unknown';\n\n    // Clean breed name (remove sub-breed info)\n    const cleanBreedName = breedName.split('-')[0];\n    const photoName = fileName.split('.')[0];\n    return {\n      breedName: cleanBreedName,\n      photoName: photoName,\n      fullBreed: breedName\n    };\n  } catch (err) {\n    return {\n      breedName: 'unknown',\n      photoName: 'unknown',\n      fullBreed: 'unknown'\n    };\n  }\n}"
          },
          "fetchDogImage": {
            "type": "basic",
            "value": "async () => {\n  if (isLoading) return;\n  setIsLoading(true);\n  setError(null);\n  try {\n    console.log('🐕 Fetching new dog image...');\n    const response = await fetch('https://dog.ceo/api/breeds/image/random');\n    const data = await response.json();\n    if (data.status === 'success') {\n      const imageInfo = extractImageInfo(data.message);\n      const newDog = {\n        id: Date.now() + Math.random(),\n        url: data.message,\n        breedName: imageInfo.breedName,\n        photoName: imageInfo.photoName,\n        fullBreed: imageInfo.fullBreed,\n        liked: false,\n        timestamp: new Date().toISOString(),\n        status: data.status\n      };\n      dogsArrayRef.current = [...dogsArrayRef.current, newDog];\n      console.log(`📸 Added new dog: ${newDog.breedName} - ${newDog.photoName}`);\n      console.log(`📊 Total dogs in array: ${dogsArrayRef.current.length}`);\n    } else {\n      setError('Failed to fetch dog image');\n    }\n  } catch (err) {\n    console.error('Error fetching dog:', err);\n    setError('Network error occurred');\n  } finally {\n    setIsLoading(false);\n  }\n}"
          },
          "leftDog": {
            "type": "useMemo",
            "value": "() => currentImageIndex > 0 ? dogsArrayRef.current[currentImageIndex - 1] : null",
            "dependencies": [
              "currentImageIndex",
              "scrollTrigger"
            ]
          },
          "centerDog": {
            "type": "useMemo",
            "value": "() => currentImageIndex >= 0 ? dogsArrayRef.current[currentImageIndex] || null : null",
            "dependencies": [
              "currentImageIndex",
              "scrollTrigger"
            ]
          },
          "rightDog": {
            "type": "useMemo",
            "value": "() => currentImageIndex >= 0 && currentImageIndex < dogsArrayRef.current.length - 1 ? dogsArrayRef.current[currentImageIndex + 1] : null",
            "dependencies": [
              "currentImageIndex",
              "scrollTrigger"
            ]
          }
        },
        "functions": {
          "effect-0": {
            "type": "effect",
            "body": "() => {\n  const initialize = async () => {\n    if (!hasInitialized) {\n      await fetchDogImage();\n      await fetchDogImage();\n      setHasInitialized(true);\n      setCurrentImageIndex(0);\n    }\n  };\n  initialize();\n}",
            "dependencies": [
              "hasInitialized"
            ]
          },
          "effect-1": {
            "type": "effect",
            "body": "() => {\n  const handleKeyDown = async event => {\n    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {\n      event.preventDefault();\n      await goToPrevious();\n    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {\n      event.preventDefault();\n      await goToNext();\n    }\n  };\n  window.addEventListener('keydown', handleKeyDown);\n  return () => window.removeEventListener('keydown', handleKeyDown);\n}",
            "dependencies": [
              "goToPrevious",
              "goToNext"
            ]
          },
          "effect-2": {
            "type": "effect",
            "body": "() => {\n  const checkAndPreload = async () => {\n    // Check if we need to preload more dogs when currentImageIndex changes\n    const remainingImages = dogsArrayRef.current.length - currentImageIndex;\n    if (currentImageIndex >= 0 && remainingImages <= 3 && !isLoading && dogsArrayRef.current.length > 0) {\n      console.log(`🧠 Smart preload: Only ${remainingImages} images left, fetching more...`);\n      await fetchDogImage();\n    }\n  };\n  checkAndPreload();\n}",
            "dependencies": [
              "currentImageIndex",
              "isLoading"
            ]
          }
        }
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
          "value": "min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white overflow-hidden"
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
      "componentType": "header",
      "containerIds": [
        "header-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "header-content": {
      "id": "header-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "header-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "logo": {
      "id": "logo",
      "type": "item",
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "🐕 DogFeed"
        }
      ]
    },
    "stats": {
      "id": "stats",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "stats-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center gap-4 text-sm text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "total-count": {
      "id": "total-count",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-3 py-1 bg-blue-500/20 rounded-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`📊 Total: ${dogsArrayRef.current.length}`"
        }
      ]
    },
    "liked-count": {
      "id": "liked-count",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-3 py-1 bg-red-500/20 rounded-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`❤️ Liked: ${dogsArrayRef.current.filter(dog => dog.liked).length}`"
        }
      ]
    },
    "current-position": {
      "id": "current-position",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-3 py-1 bg-green-500/20 rounded-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`📍 Current: ${currentImageIndex + 1}`"
        }
      ]
    },
    "main-content": {
      "id": "main-content",
      "type": "panel",
      "componentType": "main",
      "containerIds": [
        "main-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto p-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "controls-section": {
      "id": "controls-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": [
        "controls-section-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "fetch-button": {
      "id": "fetch-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/25'}`"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => fetchDogImage()"
        },
        "disabled": {
          "type": "variable",
          "reference": "isLoading"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "isLoading ? '🔄 Fetching...' : '🐕 Fetch New Dog!'"
        }
      ]
    },
    "error-message": {
      "id": "error-message",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`❌ Error: ${error}`"
        }
      ]
    },
    "dynamic-1": {
      "id": "dynamic-1",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "error",
        "trueTemplateId": "error-message",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "carousel-container": {
      "id": "carousel-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "carousel-container-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "relative mb-8 overflow-hidden"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "keyboard-hint": {
      "id": "keyboard-hint",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center text-sm text-gray-400 mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Use ↑↓ or ←→ arrow keys to navigate • Click side cards to jump"
        }
      ]
    },
    "carousel-track": {
      "id": "carousel-track",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "carousel-track-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center justify-center gap-8 h-[500px]"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "left-card-template": {
      "id": "left-card-template",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "left-card-template-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-64 h-80 cursor-pointer transition-all duration-300 hover:scale-105 opacity-50"
        },
        "onClick": {
          "type": "variable",
          "reference": "leftDog ? () => jumpToIndex(currentImageIndex - 1) : undefined"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "left-card-inner": {
      "id": "left-card-inner",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "left-card-inner-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "left-card-image": {
      "id": "left-card-image",
      "type": "item",
      "componentType": "img",
      "containerIds": [],
      "props": {
        "src": {
          "type": "variable",
          "reference": "leftDog?.url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIERvZzwvdGV4dD48L3N2Zz4='"
        },
        "alt": {
          "type": "variable",
          "reference": "leftDog ? `${leftDog.breedName} - ${leftDog.photoName}` : 'No previous dog'"
        },
        "className": {
          "type": "static",
          "value": "w-full h-64 object-cover"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "left-card-like-overlay": {
      "id": "left-card-like-overlay",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`absolute top-2 right-2 text-2xl ${leftDog?.liked ? 'text-red-500' : 'text-gray-400'} transition-all duration-300`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "leftDog?.liked ? '❤️' : '🤍'"
        }
      ]
    },
    "left-card-content": {
      "id": "left-card-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "left-card-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "left-card-breed": {
      "id": "left-card-breed",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg font-bold capitalize text-yellow-300 mb-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "leftDog ? leftDog.breedName : 'Previous'"
        }
      ]
    },
    "left-card-label": {
      "id": "left-card-label",
      "type": "item",
      "componentType": "p",
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
          "type": "static",
          "value": "← Previous"
        }
      ]
    },
    "dynamic-3": {
      "id": "dynamic-3",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "leftDog",
        "trueTemplateId": "left-card-template",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "center-card": {
      "id": "center-card",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "center-card-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-80 h-96 relative z-10 mx-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "center-card-inner": {
      "id": "center-card-inner",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "center-card-inner-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border-2 border-yellow-400/50 overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "center-card-image": {
      "id": "center-card-image",
      "type": "item",
      "componentType": "img",
      "containerIds": [],
      "props": {
        "src": {
          "type": "variable",
          "reference": "centerDog?.url"
        },
        "alt": {
          "type": "variable",
          "reference": "`${centerDog?.breedName} - ${centerDog?.photoName}`"
        },
        "className": {
          "type": "static",
          "value": "w-full h-72 object-cover"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "center-like-overlay": {
      "id": "center-like-overlay",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`absolute top-3 right-3 text-3xl ${centerDog?.liked ? 'text-red-500' : 'text-gray-400'} transition-all duration-300`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "centerDog?.liked ? '❤️' : '🤍'"
        }
      ]
    },
    "center-card-content": {
      "id": "center-card-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "center-card-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "center-card-breed": {
      "id": "center-card-breed",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold capitalize text-yellow-300 mb-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`🐕 ${centerDog?.breedName}`"
        }
      ]
    },
    "center-card-photo": {
      "id": "center-card-photo",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-300 mb-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`📸 ${centerDog?.photoName}`"
        }
      ]
    },
    "center-card-timestamp": {
      "id": "center-card-timestamp",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xs text-gray-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`🕒 ${new Date(centerDog?.timestamp).toLocaleTimeString()}`"
        }
      ]
    },
    "right-card": {
      "id": "right-card",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "right-card-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-64 h-80 cursor-pointer transition-all duration-300 hover:scale-105 opacity-50"
        },
        "onClick": {
          "type": "variable",
          "reference": "rightDog ? () => jumpToIndex(currentImageIndex + 1) : undefined"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "right-card-inner": {
      "id": "right-card-inner",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "right-card-inner-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "right-card-image": {
      "id": "right-card-image",
      "type": "item",
      "componentType": "img",
      "containerIds": [],
      "props": {
        "src": {
          "type": "variable",
          "reference": "rightDog?.url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIERvZzwvdGV4dD48L3N2Zz4='"
        },
        "alt": {
          "type": "variable",
          "reference": "rightDog ? `${rightDog.breedName} - ${rightDog.photoName}` : 'No next dog'"
        },
        "className": {
          "type": "static",
          "value": "w-full h-64 object-cover"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "right-card-like-overlay": {
      "id": "right-card-like-overlay",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`absolute top-2 right-2 text-2xl ${rightDog?.liked ? 'text-red-500' : 'text-gray-400'} transition-all duration-300`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "rightDog?.liked ? '❤️' : '🤍'"
        }
      ]
    },
    "right-card-content": {
      "id": "right-card-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "right-card-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "right-card-breed": {
      "id": "right-card-breed",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg font-bold capitalize text-yellow-300 mb-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "rightDog ? rightDog.breedName : 'Next'"
        }
      ]
    },
    "right-card-label": {
      "id": "right-card-label",
      "type": "item",
      "componentType": "p",
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
          "type": "static",
          "value": "Next →"
        }
      ]
    },
    "navigation-controls": {
      "id": "navigation-controls",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "navigation-controls-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-center gap-6 mt-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "prev-button": {
      "id": "prev-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold ${currentImageIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'}`"
        },
        "onClick": {
          "type": "variable",
          "reference": "goToPrevious"
        },
        "disabled": {
          "type": "variable",
          "reference": "currentImageIndex <= 0"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "⬅️ Previous"
        }
      ]
    },
    "next-button": {
      "id": "next-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
        },
        "onClick": {
          "type": "variable",
          "reference": "goToNext"
        },
        "disabled": {
          "type": "variable",
          "reference": "false"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "currentImageIndex >= 0 && currentImageIndex >= dogsArrayRef.current.length - 1 ? '➡️ Fetch Next' : '➡️ Next'"
        }
      ]
    },
    "action-buttons": {
      "id": "action-buttons",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "action-buttons-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-center gap-4 mt-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "like-button": {
      "id": "like-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${centerDog?.liked ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' : 'bg-gray-600 hover:bg-gray-700 text-gray-200'}`"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => toggleLike(centerDog?.id)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "centerDog?.liked ? '❤️ Liked!' : '🤍 Like'"
        }
      ]
    },
    "remove-button": {
      "id": "remove-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => removeDog(centerDog?.id)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "🗑️ Remove"
        }
      ]
    },
    "dynamic-2": {
      "id": "dynamic-2",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "centerDog",
        "trueTemplateId": "carousel-container",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-display": {
      "id": "history-display",
      "type": "panel",
      "componentType": "section",
      "containerIds": [
        "history-display-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-12 p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-title": {
      "id": "history-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-4 text-center text-purple-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`📚 Dog History (${dogsArrayRef.current.length} total)`"
        }
      ]
    },
    "history-grid": {
      "id": "history-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "history-grid-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-3"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-item-template": {
      "id": "history-item-template",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "history-item-template-container-1"
      ],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`relative group cursor-pointer transition-all duration-300 hover:scale-110 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-purple-900 scale-105' : 'hover:ring-1 hover:ring-white/30'}`"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => jumpToIndex(index)"
        },
        "key": {
          "type": "variable",
          "reference": "dog.id"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-item-image": {
      "id": "history-item-image",
      "type": "item",
      "componentType": "img",
      "containerIds": [],
      "props": {
        "src": {
          "type": "variable",
          "reference": "dog.url"
        },
        "alt": {
          "type": "variable",
          "reference": "`${dog.breedName} - ${dog.photoName}`"
        },
        "className": {
          "type": "static",
          "value": "w-full h-16 object-cover"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "history-item-overlay": {
      "id": "history-item-overlay",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "history-item-overlay-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-item-info": {
      "id": "history-item-info",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-white text-xs text-center font-medium"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`${dog.breedName}`"
        }
      ]
    },
    "history-item-status": {
      "id": "history-item-status",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-right text-sm"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "dog.liked ? '❤️' : '🤍'"
        }
      ]
    },
    "dynamic-5": {
      "id": "dynamic-5",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "dogsArrayRef.current",
        "itemVariable": "dog",
        "indexVariable": "index",
        "templateId": "history-item-template"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-4": {
      "id": "dynamic-4",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "dogsArrayRef.current.length > 1",
        "trueTemplateId": "history-display",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "scroll-indicator": {
      "id": "scroll-indicator",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-8 mb-20 text-center text-gray-400 text-sm"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "🎮 Use arrow keys to navigate • Click side cards or thumbnails to jump"
        }
      ]
    }
  },
  "containers": {
    "root-container": [
      "root-panel"
    ],
    "root-panel-container-1": [
      "header",
      "main-content"
    ],
    "header-container-1": [
      "header-content"
    ],
    "header-content-container-1": [
      "logo",
      "stats"
    ],
    "stats-container-1": [
      "total-count",
      "liked-count",
      "current-position"
    ],
    "main-content-container-1": [
      "controls-section",
      "dynamic-1",
      "dynamic-2",
      "dynamic-4",
      "scroll-indicator"
    ],
    "controls-section-container-1": [
      "fetch-button"
    ],
    "carousel-container-container-1": [
      "keyboard-hint",
      "carousel-track",
      "navigation-controls",
      "action-buttons"
    ],
    "carousel-track-container-1": [
      "dynamic-3",
      "center-card",
      "right-card"
    ],
    "left-card-template-container-1": [
      "left-card-inner"
    ],
    "left-card-inner-container-1": [
      "left-card-image",
      "left-card-like-overlay",
      "left-card-content"
    ],
    "left-card-content-container-1": [
      "left-card-breed",
      "left-card-label"
    ],
    "center-card-container-1": [
      "center-card-inner"
    ],
    "center-card-inner-container-1": [
      "center-card-image",
      "center-like-overlay",
      "center-card-content"
    ],
    "center-card-content-container-1": [
      "center-card-breed",
      "center-card-photo",
      "center-card-timestamp"
    ],
    "right-card-container-1": [
      "right-card-inner"
    ],
    "right-card-inner-container-1": [
      "right-card-image",
      "right-card-like-overlay",
      "right-card-content"
    ],
    "right-card-content-container-1": [
      "right-card-breed",
      "right-card-label"
    ],
    "navigation-controls-container-1": [
      "prev-button",
      "next-button"
    ],
    "action-buttons-container-1": [
      "like-button",
      "remove-button"
    ],
    "history-display-container-1": [
      "history-title",
      "history-grid"
    ],
    "history-grid-container-1": [
      "dynamic-5"
    ],
    "history-item-template-container-1": [
      "history-item-image",
      "history-item-overlay"
    ],
    "history-item-overlay-container-1": [
      "history-item-info",
      "history-item-status"
    ]
  }
}