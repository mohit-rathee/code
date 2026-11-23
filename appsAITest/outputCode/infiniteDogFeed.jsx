"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';

export default function AppComponent() {
  const dogsArrayRef = useRef([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const goToPrevious = useCallback(async () => {
  if (currentImageIndex > 0) {
    setCurrentImageIndex(currentImageIndex - 1);
    console.log(`⬅️ Going to previous: ${currentImageIndex - 1}`);
  }
}, [currentImageIndex]);
  const goToNext = useCallback(async () => {
  if (currentImageIndex >= 0 && currentImageIndex < dogsArrayRef.current.length - 1) {
    setCurrentImageIndex(currentImageIndex + 1);
    console.log(`➡️ Going to next: ${currentImageIndex + 1}`);

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
}, [currentImageIndex, isLoading]);
  const jumpToIndex = useCallback(targetIndex => {
  if (targetIndex !== currentImageIndex && targetIndex >= 0 && targetIndex < dogsArrayRef.current.length) {
    setCurrentImageIndex(targetIndex);
    console.log(`🎯 Jumping to index: ${targetIndex}`);
  }
}, [currentImageIndex]);
  const toggleLike = useCallback(dogId => {
  const dogIndex = dogsArrayRef.current.findIndex(dog => dog.id === dogId);
  if (dogIndex !== -1) {
    dogsArrayRef.current[dogIndex].liked = !dogsArrayRef.current[dogIndex].liked;
    setScrollTrigger(prev => prev + 1); // Trigger re-render
    console.log(`❤️ Toggled like for: ${dogsArrayRef.current[dogIndex].breedName}`);
  }
}, []);
  const removeDog = useCallback(async dogId => {
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
    console.log(`🗑️ Removed dog: ${removedDog.breedName}`);
  }
}, [currentImageIndex]);
  const extractImageInfo = imageUrl => {
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
}
  const fetchDogImage = async () => {
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
      console.log(`📸 Added new dog: ${newDog.breedName} - ${newDog.photoName}`);
      console.log(`📊 Total dogs in array: ${dogsArrayRef.current.length}`);
    } else {
      setError('Failed to fetch dog image');
    }
  } catch (err) {
    console.error('Error fetching dog:', err);
    setError('Network error occurred');
  } finally {
    setIsLoading(false);
  }
}
  const leftDog = useMemo(() => currentImageIndex > 0 ? dogsArrayRef.current[currentImageIndex - 1] : null, [currentImageIndex, scrollTrigger]);
  const centerDog = useMemo(() => currentImageIndex >= 0 ? dogsArrayRef.current[currentImageIndex] || null : null, [currentImageIndex, scrollTrigger]);
  const rightDog = useMemo(() => currentImageIndex >= 0 && currentImageIndex < dogsArrayRef.current.length - 1 ? dogsArrayRef.current[currentImageIndex + 1] : null, [currentImageIndex, scrollTrigger]);
  useEffect(() => {
  const initialize = async () => {
    if (!hasInitialized) {
      await fetchDogImage();
      await fetchDogImage();
      setHasInitialized(true);
      setCurrentImageIndex(0);
    }
  };
  initialize();
}, [hasInitialized]);
  useEffect(() => {
  const handleKeyDown = async event => {
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
}, [goToPrevious, goToNext]);
  useEffect(() => {
  const checkAndPreload = async () => {
    // Check if we need to preload more dogs when currentImageIndex changes
    const remainingImages = dogsArrayRef.current.length - currentImageIndex;
    if (currentImageIndex >= 0 && remainingImages <= 3 && !isLoading && dogsArrayRef.current.length > 0) {
      console.log(`🧠 Smart preload: Only ${remainingImages} images left, fetching more...`);
      await fetchDogImage();
    }
  };
  checkAndPreload();
}, [currentImageIndex, isLoading]);


  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white overflow-hidden"
        data-component-id="root-panel">
        <header
          className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50"
          data-component-id="header">
          <div
            className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
            data-component-id="header-content">
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              data-component-id="logo">
              🐕 DogFeed
            </h1>
            <div
              className="flex items-center gap-4 text-sm text-gray-300"
              data-component-id="stats">
              <span
                className="px-3 py-1 bg-blue-500/20 rounded-full"
                data-component-id="total-count">
                {`📊 Total: ${dogsArrayRef.current.length}`}
              </span>
              <span
                className="px-3 py-1 bg-red-500/20 rounded-full"
                data-component-id="liked-count">
                {`❤️ Liked: ${dogsArrayRef.current.filter(dog => dog.liked).length}`}
              </span>
              <span
                className="px-3 py-1 bg-green-500/20 rounded-full"
                data-component-id="current-position">
                {`📍 Current: ${currentImageIndex + 1}`}
              </span>
            </div>
          </div>
        </header>
        <main
          className="max-w-6xl mx-auto p-4"
          data-component-id="main-content">
          <section
            className="mb-6 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
            data-component-id="controls-section">
            <button
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/25'}`}
              onClick={() => fetchDogImage()}
              disabled={isLoading}
              data-component-id="fetch-button">
              {isLoading ? '🔄 Fetching...' : '🐕 Fetch New Dog!'}
            </button>
          </section>
          {error && (
            <div
              className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200"
              data-component-id="error-message">
              {`❌ Error: ${error}`}
            </div>
          )}          {centerDog && (
            <div
              className="relative mb-8 overflow-hidden"
              data-component-id="carousel-container">
              <div
                className="text-center text-sm text-gray-400 mb-6"
                data-component-id="keyboard-hint">
                Use ↑↓ or ←→ arrow keys to navigate • Click side cards to jump
              </div>
              <div
                className="flex items-center justify-center gap-8 h-[500px]"
                data-component-id="carousel-track">
                {leftDog && (
                  <div
                    className="w-64 h-80 cursor-pointer transition-all duration-300 hover:scale-105 opacity-50"
                    onClick={leftDog ? () => jumpToIndex(currentImageIndex - 1) : undefined}
                    data-component-id="left-card-template">
                    <div
                      className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg"
                      data-component-id="left-card-inner">
                      <img
                        src={leftDog?.url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIERvZzwvdGV4dD48L3N2Zz4='}
                        alt={leftDog ? `${leftDog.breedName} - ${leftDog.photoName}` : 'No previous dog'}
                        className="w-full h-64 object-cover"
                        data-component-id="left-card-image" />
                      <div
                        className={`absolute top-2 right-2 text-2xl ${leftDog?.liked ? 'text-red-500' : 'text-gray-400'} transition-all duration-300`}
                        data-component-id="left-card-like-overlay">
                        {leftDog?.liked ? '❤️' : '🤍'}
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white"
                        data-component-id="left-card-content">
                        <h3
                          className="text-lg font-bold capitalize text-yellow-300 mb-1"
                          data-component-id="left-card-breed">
                          {leftDog ? leftDog.breedName : 'Previous'}
                        </h3>
                        <p
                          className="text-sm text-gray-300"
                          data-component-id="left-card-label">
                          ← Previous
                        </p>
                      </div>
                    </div>
                  </div>
                )}                <div
                  className="w-80 h-96 relative z-10 mx-4"
                  data-component-id="center-card">
                  <div
                    className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border-2 border-yellow-400/50 overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105"
                    data-component-id="center-card-inner">
                    <img
                      src={centerDog?.url}
                      alt={`${centerDog?.breedName} - ${centerDog?.photoName}`}
                      className="w-full h-72 object-cover"
                      data-component-id="center-card-image" />
                    <div
                      className={`absolute top-3 right-3 text-3xl ${centerDog?.liked ? 'text-red-500' : 'text-gray-400'} transition-all duration-300`}
                      data-component-id="center-like-overlay">
                      {centerDog?.liked ? '❤️' : '🤍'}
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white"
                      data-component-id="center-card-content">
                      <h2
                        className="text-xl font-bold capitalize text-yellow-300 mb-1"
                        data-component-id="center-card-breed">
                        {`🐕 ${centerDog?.breedName}`}
                      </h2>
                      <p
                        className="text-sm text-gray-300 mb-1"
                        data-component-id="center-card-photo">
                        {`📸 ${centerDog?.photoName}`}
                      </p>
                      <p
                        className="text-xs text-gray-400"
                        data-component-id="center-card-timestamp">
                        {`🕒 ${new Date(centerDog?.timestamp).toLocaleTimeString()}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="w-64 h-80 cursor-pointer transition-all duration-300 hover:scale-105 opacity-50"
                  onClick={rightDog ? () => jumpToIndex(currentImageIndex + 1) : undefined}
                  data-component-id="right-card">
                  <div
                    className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg"
                    data-component-id="right-card-inner">
                    <img
                      src={rightDog?.url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIERvZzwvdGV4dD48L3N2Zz4='}
                      alt={rightDog ? `${rightDog.breedName} - ${rightDog.photoName}` : 'No next dog'}
                      className="w-full h-64 object-cover"
                      data-component-id="right-card-image" />
                    <div
                      className={`absolute top-2 right-2 text-2xl ${rightDog?.liked ? 'text-red-500' : 'text-gray-400'} transition-all duration-300`}
                      data-component-id="right-card-like-overlay">
                      {rightDog?.liked ? '❤️' : '🤍'}
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white"
                      data-component-id="right-card-content">
                      <h3
                        className="text-lg font-bold capitalize text-yellow-300 mb-1"
                        data-component-id="right-card-breed">
                        {rightDog ? rightDog.breedName : 'Next'}
                      </h3>
                      <p
                        className="text-sm text-gray-300"
                        data-component-id="right-card-label">
                        Next →
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex justify-center gap-6 mt-6"
                data-component-id="navigation-controls">
                <button
                  className={`px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold ${currentImageIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'}`}
                  onClick={goToPrevious}
                  disabled={currentImageIndex <= 0}
                  data-component-id="prev-button">
                  ⬅️ Previous
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  onClick={goToNext}
                  disabled={false}
                  data-component-id="next-button">
                  {currentImageIndex >= 0 && currentImageIndex >= dogsArrayRef.current.length - 1 ? '➡️ Fetch Next' : '➡️ Next'}
                </button>
              </div>
              <div
                className="flex justify-center gap-4 mt-4"
                data-component-id="action-buttons">
                <button
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${centerDog?.liked ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' : 'bg-gray-600 hover:bg-gray-700 text-gray-200'}`}
                  onClick={() => toggleLike(centerDog?.id)}
                  data-component-id="like-button">
                  {centerDog?.liked ? '❤️ Liked!' : '🤍 Like'}
                </button>
                <button
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                  onClick={() => removeDog(centerDog?.id)}
                  data-component-id="remove-button">
                  🗑️ Remove
                </button>
              </div>
            </div>
          )}          {dogsArrayRef.current.length > 1 && (
            <section
              className="mt-12 p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              data-component-id="history-display">
              <h3
                className="text-xl font-bold mb-4 text-center text-purple-300"
                data-component-id="history-title">
                {`📚 Dog History (${dogsArrayRef.current.length} total)`}
              </h3>
              <div
                className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-3"
                data-component-id="history-grid">
                {dogsArrayRef.current.map((dog, index) => (
                  <div
                    className={`relative group cursor-pointer transition-all duration-300 hover:scale-110 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-purple-900 scale-105' : 'hover:ring-1 hover:ring-white/30'}`}
                    onClick={() => jumpToIndex(index)}
                    key={dog.id}
                    data-component-id="history-item-template">
                    <img
                      src={dog.url}
                      alt={`${dog.breedName} - ${dog.photoName}`}
                      className="w-full h-16 object-cover"
                      data-component-id="history-item-image" />
                    <div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-1"
                      data-component-id="history-item-overlay">
                      <div
                        className="text-white text-xs text-center font-medium"
                        data-component-id="history-item-info">
                        {`${dog.breedName}`}
                      </div>
                      <div
                        className="text-right text-sm"
                        data-component-id="history-item-status">
                        {dog.liked ? '❤️' : '🤍'}
                      </div>
                    </div>
                  </div>
                ))}              </div>
            </section>
          )}          <div
            className="mt-8 mb-20 text-center text-gray-400 text-sm"
            data-component-id="scroll-indicator">
            🎮 Use arrow keys to navigate • Click side cards or thumbnails to jump
          </div>
        </main>
      </div>
    </div>
  );
}