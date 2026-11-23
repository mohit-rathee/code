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
          "value": "min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white overflow-hidden"
        }
      },
      "state": {
        "variables": {
          "dogsArrayRef": {
            "type": "useRef",
            "value": "[]"
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
            "value": `async () => {
              if (currentImageIndex > 0) {
                setCurrentImageIndex(currentImageIndex - 1);
                console.log(\`⬅️ Going to previous: \${currentImageIndex - 1}\`);
              }
            }`,
            "dependencies": ["currentImageIndex"]
          },
          "goToNext": {
            "type": "useCallback",
            "value": `async () => {
              if (currentImageIndex >= 0 && currentImageIndex < dogsArrayRef.current.length - 1) {
                setCurrentImageIndex(currentImageIndex + 1);
                console.log(\`➡️ Going to next: \${currentImageIndex + 1}\`);
                
                // Smart fetch: Load more when within 2 images of the end
                const remainingImages = dogsArrayRef.current.length - (currentImageIndex + 1);
                if (remainingImages <= 2 && !isLoading) {
                  console.log('🤖 Smart fetch: Loading more dogs proactively...');
                  await fetchDogImage();
                }
              } else {
                // At the end, fetch new image
                await fetchDogImage();
              }
            }`,
            "dependencies": ["currentImageIndex", "isLoading"]
          },
          "jumpToIndex": {
            "type": "useCallback",
            "value": `(targetIndex) => {
              if (targetIndex !== currentImageIndex && targetIndex >= 0 && targetIndex < dogsArrayRef.current.length) {
                setCurrentImageIndex(targetIndex);
                console.log(\`🎯 Jumping to index: \${targetIndex}\`);
              }
            }`,
            "dependencies": ["currentImageIndex"]
          },
          "toggleLike": {
            "type": "useCallback",
            "value": `(dogId) => {
              const dogIndex = dogsArrayRef.current.findIndex(dog => dog.id === dogId);
              if (dogIndex !== -1) {
                dogsArrayRef.current[dogIndex].liked = !dogsArrayRef.current[dogIndex].liked;
                setScrollTrigger(prev => prev + 1); // Trigger re-render
                console.log(\`❤️ Toggled like for: \${dogsArrayRef.current[dogIndex].breedName}\`);
              }
            }`,
            "dependencies": []
          },
          "removeDog": {
            "type": "useCallback",
            "value": `async (dogId) => {
              const dogIndex = dogsArrayRef.current.findIndex(dog => dog.id === dogId);
              if (dogIndex !== -1) {
                const removedDog = dogsArrayRef.current[dogIndex];
                dogsArrayRef.current = dogsArrayRef.current.filter(dog => dog.id !== dogId);
                
                // Adjust current index if necessary
                if (currentImageIndex >= dogsArrayRef.current.length && dogsArrayRef.current.length > 0) {
                  setCurrentImageIndex(dogsArrayRef.current.length - 1);
                } else if (dogsArrayRef.current.length === 0) {
                  setCurrentImageIndex(0);
                  await fetchDogImage(); // Fetch new image if array is empty
                }
                
                setScrollTrigger(prev => prev + 1); // Trigger re-render
                console.log(\`🗑️ Removed dog: \${removedDog.breedName}\`);
              }
            }`,
            "dependencies": ["currentImageIndex"]
          }
        },
        "functions": {
          "initializeApp": {
            "type": "effect",
            "body": `() => {
              const initialize = async () => {
                if (!hasInitialized) {
                  await fetchDogImage();
                  await fetchDogImage();
                  setHasInitialized(true);
                  setCurrentImageIndex(0);
                }
              };
              
              initialize();
            }`,
            "dependencies": ["hasInitialized"]
          },
          "extractImageInfo": {
            "type": "function",
            "body": `(imageUrl) => {
              try {
                const urlParts = imageUrl.split('/');
                const fileName = urlParts[urlParts.length - 1];
                const breedInfo = urlParts.find(part => part.includes('breeds'));
                const breedIndex = urlParts.indexOf(breedInfo);
                const breedName = urlParts[breedIndex + 1] || 'unknown';
                
                // Clean breed name (remove sub-breed info)
                const cleanBreedName = breedName.split('-')[0];
                const photoName = fileName.split('.')[0];
                
                return {
                  breedName: cleanBreedName,
                  photoName: photoName,
                  fullBreed: breedName
                };
              } catch (err) {
                return {
                  breedName: 'unknown',
                  photoName: 'unknown',
                  fullBreed: 'unknown'
                };
              }
            }`
          },
          "fetchDogImage": {
            "type": "function",
            "body": `async () => {
              if (isLoading) return;
              
              setIsLoading(true);
              setError(null);
              
              try {
                console.log('🐕 Fetching new dog image...');
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                
                if (data.status === 'success') {
                  const imageInfo = extractImageInfo(data.message);
                  
                  const newDog = {
                    id: Date.now() + Math.random(),
                    url: data.message,
                    breedName: imageInfo.breedName,
                    photoName: imageInfo.photoName,
                    fullBreed: imageInfo.fullBreed,
                    liked: false,
                    timestamp: new Date().toISOString(),
                    status: data.status
                  };
                  
                  dogsArrayRef.current = [...dogsArrayRef.current, newDog];
                  console.log(\`📸 Added new dog: \${newDog.breedName} - \${newDog.photoName}\`);
                  console.log(\`📊 Total dogs in array: \${dogsArrayRef.current.length}\`);
                } else {
                  setError('Failed to fetch dog image');
                }
              } catch (err) {
                console.error('Error fetching dog:', err);
                setError('Network error occurred');
              } finally {
                setIsLoading(false);
              }
            }`
          }
        }
      }
    },
    "header": {
      "id": "header",
      "type": "panel",
      "componentType": "header",
      "containerIds": ["header-container-1"],
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
      "containerIds": ["header-content-container-1"],
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
        },
        "children": {
          "type": "static",
          "value": "🐕 DogFeed"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stats": {
      "id": "stats",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stats-container-1"],
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
        },
        "children": {
          "type": "variable",
          "reference": "`📊 Total: ${dogsArrayRef.current.length}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "`❤️ Liked: ${dogsArrayRef.current.filter(dog => dog.liked).length}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "`📍 Current: ${currentImageIndex + 1}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "main-content": {
      "id": "main-content",
      "type": "panel",
      "componentType": "main",
      "containerIds": ["main-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto p-4"
        }
      },
      "state": {
        "variables": {
          "leftDog": {
            "type": "useMemo",
            "value": "()=>(currentImageIndex > 0 ? dogsArrayRef.current[currentImageIndex - 1] : null)",
            "dependencies": ["currentImageIndex", "scrollTrigger"]
          },
          "centerDog": {
            "type": "useMemo",
            "value": "()=>(currentImageIndex >= 0 ? dogsArrayRef.current[currentImageIndex] || null : null)",
            "dependencies": ["currentImageIndex", "scrollTrigger"]
          },
          "rightDog": {
            "type": "useMemo",
            "value": "()=>(currentImageIndex >= 0 && currentImageIndex < dogsArrayRef.current.length - 1 ? dogsArrayRef.current[currentImageIndex + 1] : null)",
            "dependencies": ["currentImageIndex", "scrollTrigger"]
          }
        },
        "functions": {
          "handleKeyboardNavigation": {
            "type": "effect",
            "body": `() => {
              const handleKeyDown = async (event) => {
                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  await goToPrevious();
                } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                  event.preventDefault();
                  await goToNext();
                }
              };
              
              window.addEventListener('keydown', handleKeyDown);
              return () => window.removeEventListener('keydown', handleKeyDown);
            }`,
            "dependencies": ["goToPrevious", "goToNext"]
          },
          "smartPreload": {
            "type": "effect",
            "body": `() => {
              const checkAndPreload = async () => {
                // Check if we need to preload more dogs when currentImageIndex changes
                const remainingImages = dogsArrayRef.current.length - currentImageIndex;
                if (currentImageIndex >= 0 && remainingImages <= 3 && !isLoading && dogsArrayRef.current.length > 0) {
                  console.log(\`🧠 Smart preload: Only \${remainingImages} images left, fetching more...\`);
                  await fetchDogImage();
                }
              };
              
              checkAndPreload();
            }`,
            "dependencies": ["currentImageIndex", "isLoading"]
          }
        }
      }
    },
    "controls-section": {
      "id": "controls-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["controls-container-1"],
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
          "type": "function",
          "reference": "() => fetchDogImage()"
        },
        "disabled": {
          "type": "variable",
          "reference": "isLoading"
        },
        "children": {
          "type": "variable",
          "reference": "isLoading ? '🔄 Fetching...' : '🐕 Fetch New Dog!'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "error-display": {
      "id": "error-display",
      "type": "dynamic-operation",
      "operation": {
        "type": "conditional",
        "condition": "error",
        "trueTemplateId": "error-message"
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "`❌ Error: ${error}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "carousel-section": {
      "id": "carousel-section",
      "type": "dynamic-operation",
      "operation": {
        "type": "conditional",
        "condition": "centerDog",
        "trueTemplateId": "carousel-container"
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "carousel-container": {
      "id": "carousel-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["carousel-container-1"],
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
        },
        "children": {
          "type": "static",
          "value": "Use ↑↓ or ←→ arrow keys to navigate • Click side cards to jump"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "carousel-track": {
      "id": "carousel-track",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["carousel-track-container-1"],
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
    "left-card": {
      "id": "left-card",
      "type": "dynamic-operation",
      "operation": {
        "type": "conditional",
        "condition": "leftDog",
        "trueTemplateId": "left-card-template"
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
      "containerIds": ["left-card-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "w-64 h-80 cursor-pointer transition-all duration-300 hover:scale-105 opacity-50"
        },
        "onClick": {
          "type": "function",
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
      "containerIds": ["left-card-inner-container-1"],
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
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "leftDog?.liked ? '❤️' : '🤍'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "left-card-content": {
      "id": "left-card-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["left-card-content-container-1"],
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
        },
        "children": {
          "type": "variable",
          "reference": "leftDog ? leftDog.breedName : 'Previous'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "← Previous"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "center-card": {
      "id": "center-card",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["center-card-container-1"],
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
      "containerIds": ["center-card-inner-container-1"],
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
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "centerDog?.liked ? '❤️' : '🤍'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "center-card-content": {
      "id": "center-card-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["center-card-content-container-1"],
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
        },
        "children": {
          "type": "variable",
          "reference": "`🐕 ${centerDog?.breedName}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "`📸 ${centerDog?.photoName}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "`🕒 ${new Date(centerDog?.timestamp).toLocaleTimeString()}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "right-card": {
      "id": "right-card",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["right-card-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "w-64 h-80 cursor-pointer transition-all duration-300 hover:scale-105 opacity-50"
        },
        "onClick": {
          "type": "function",
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
      "containerIds": ["right-card-inner-container-1"],
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
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "rightDog?.liked ? '❤️' : '🤍'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "right-card-content": {
      "id": "right-card-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["right-card-content-container-1"],
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
        },
        "children": {
          "type": "variable",
          "reference": "rightDog ? rightDog.breedName : 'Next'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "Next →"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "navigation-controls": {
      "id": "navigation-controls",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["navigation-controls-container-1"],
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
          "type": "function",
          "reference": "goToPrevious"
        },
        "disabled": {
          "type": "variable",
          "reference": "currentImageIndex <= 0"
        },
        "children": {
          "type": "static",
          "value": "⬅️ Previous"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
          "type": "function",
          "reference": "goToNext"
        },
        "disabled": {
          "type": "static",
          "value": false
        },
        "children": {
          "type": "variable",
          "reference": "currentImageIndex >= 0 && currentImageIndex >= dogsArrayRef.current.length - 1 ? '➡️ Fetch Next' : '➡️ Next'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "action-buttons": {
      "id": "action-buttons",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["action-buttons-container-1"],
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
          "type": "function",
          "reference": "() => toggleLike(centerDog?.id)"
        },
        "children": {
          "type": "variable",
          "reference": "centerDog?.liked ? '❤️ Liked!' : '🤍 Like'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
          "type": "function",
          "reference": "() => removeDog(centerDog?.id)"
        },
        "children": {
          "type": "static",
          "value": "🗑️ Remove"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-section": {
      "id": "history-section",
      "type": "dynamic-operation",
      "operation": {
        "type": "conditional",
        "condition": "dogsArrayRef.current.length > 1",
        "trueTemplateId": "history-display"
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-display": {
      "id": "history-display",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["history-container-1"],
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
        },
        "children": {
          "type": "variable",
          "reference": "`📚 Dog History (${dogsArrayRef.current.length} total)`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "history-grid": {
      "id": "history-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["history-grid-container-1"],
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
    "history-map": {
      "id": "history-map",
      "type": "dynamic-operation",
      "operation": {
        "type": "map",
        "dataSource": "dogsArrayRef.current",
        "itemVariable": "dog",
        "indexVariable": "index",
        "templateId": "history-item-template"
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
      "containerIds": ["history-item-container-1"],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`relative group cursor-pointer transition-all duration-300 hover:scale-110 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-purple-900 scale-105' : 'hover:ring-1 hover:ring-white/30'}`"
        },
        "onClick": {
          "type": "function",
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
      }
    },
    "history-item-overlay": {
      "id": "history-item-overlay",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["history-item-overlay-container-1"],
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
        },
        "children": {
          "type": "variable",
          "reference": "`${dog.breedName}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "variable",
          "reference": "dog.liked ? '❤️' : '🤍'"
        }
      },
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
        },
        "children": {
          "type": "static",
          "value": "🎮 Use arrow keys to navigate • Click side cards or thumbnails to jump"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container-1": [
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
    "main-container-1": [
      "controls-section",
      "error-display",
      "carousel-section",
      "history-section",
      "scroll-indicator"
    ],
    "controls-container-1": [
      "fetch-button"
    ],
    "carousel-container-1": [
      "keyboard-hint",
      "carousel-track",
      "navigation-controls",
      "action-buttons"
    ],
    "carousel-track-container-1": [
      "left-card",
      "center-card",
      "right-card"
    ],
    "left-card-container-1": [
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
    "history-container-1": [
      "history-title",
      "history-grid"
    ],
    "history-grid-container-1": [
      "history-map"
    ],
    "history-item-container-1": [
      "history-item-image",
      "history-item-overlay"
    ],
    "history-item-overlay-container-1": [
      "history-item-info",
      "history-item-status"
    ]
  }
};
