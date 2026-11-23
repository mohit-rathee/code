"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';

const App = () => {
  // ============ STATE VARIABLES ============
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [logs, setLogs] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [localStorage, setLocalStorage] = useState('');
  const [wsMessage, setWsMessage] = useState('');
  const [keyPressed, setKeyPressed] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [elementInView, setElementInView] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [mediaQuery, setMediaQuery] = useState(false);
  
  const intervalRef = useRef(null);
  const wsRef = useRef(null);
  const observerRef = useRef(null);
  const targetElementRef = useRef(null);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);

  // ============ EFFECT #1: Run once on mount ============
  useEffect(() => {
    addLog('Component mounted');
    
    // Cleanup function
    return () => {
      addLog('Component will unmount');
    };
  }, []); // Empty dependency array

  // ============ EFFECT #2: Run on every render ============
  useEffect(() => {
    console.log('Component rendered/updated');
  }); // No dependency array

  // ============ EFFECT #3: Run when specific state changes ============
  useEffect(() => {
    if (count > 0) {
      addLog(`Count changed to ${count}`);
    }
  }, [count, addLog]); // Dependencies

  // ============ EFFECT #4: Cleanup with interval ============
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Setup interval on mount

  // ============ EFFECT #5: Window resize listener ============
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ============ EFFECT #6: Mouse move tracker ============
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // ============ EFFECT #7: Debounced search ============
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      if (searchTerm) {
        addLog(`Searching for: ${searchTerm}`);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, addLog]);

  // ============ EFFECT #8: Fetch data (async) ============
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedTerm) return;
      
      setLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(`Results for "${debouncedTerm}"`);
        addLog(`Data fetched for: ${debouncedTerm}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedTerm, addLog]);

  // ============ EFFECT #9: Online/Offline detector ============
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addLog('Back online');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      addLog('Went offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addLog]);

  // ============ EFFECT #10: LocalStorage sync ============
  useEffect(() => {
    const stored = window.localStorage.getItem('useEffectExample');
    if (stored) {
      setLocalStorage(stored);
    }
  }, []);

  useEffect(() => {
    if (count > 0) {
      window.localStorage.setItem('useEffectExample', `Count: ${count}`);
      setLocalStorage(`Count: ${count}`);
    }
  }, [count]);

  // ============ EFFECT #11: WebSocket connection (simulated) ============
  useEffect(() => {
    // Simulating WebSocket connection
    const simulateWebSocket = () => {
      const messages = ['Connected', 'Message 1', 'Message 2', 'Heartbeat'];
      let index = 0;
      
      const interval = setInterval(() => {
        setWsMessage(messages[index % messages.length]);
        index++;
      }, 3000);

      return () => clearInterval(interval);
    };

    const cleanup = simulateWebSocket();
    
    return cleanup;
  }, []);

  // ============ EFFECT #12: Keyboard listener ============
  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeyPressed(e.key);
      setTimeout(() => setKeyPressed(''), 1000);
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  // ============ EFFECT #13: Scroll position ============
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ============ EFFECT #14: Intersection Observer ============
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setElementInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          addLog('Target element is in view');
        }
      });
    }, options);

    if (targetElementRef.current) {
      observerRef.current.observe(targetElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [addLog]);

  // ============ EFFECT #15: Battery API ============
  useEffect(() => {
    const getBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          
          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });
        } catch (error) {
          console.log('Battery API not supported');
        }
      }
    };

    getBattery();
  }, []);

  // ============ EFFECT #16: Media Query ============
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    
    const handleMediaChange = (e) => {
      setMediaQuery(e.matches);
    };

    // Set initial value
    setMediaQuery(mediaQueryList.matches);

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleMediaChange);
      return () => {
        mediaQueryList.removeEventListener('change', handleMediaChange);
      };
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleMediaChange);
      return () => {
        mediaQueryList.removeListener(handleMediaChange);
      };
    }
  }, []);

  // ============ EFFECT #17: Document title ============
  useEffect(() => {
    document.title = `Count: ${count} | Timer: ${timer}s`;
  }, [count, timer]);

  // ============ EFFECT #18: Focus management ============
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addLog('Page hidden');
      } else {
        addLog('Page visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [addLog]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          React useEffect Examples
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Counter Card */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Counter & Timer</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-center">{count}</p>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setCount(c => c + 1)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Increment
                  </button>
                  <button 
                    onClick={() => setCount(0)}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Timer</p>
                <p className="text-2xl font-mono">{timer}s</p>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Debounced Search</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-4 py-2 border rounded-lg"
            />
            {loading && <p className="mt-2 text-blue-500">Loading...</p>}
            {data && <p className="mt-2 text-green-600">{data}</p>}
            <p className="text-sm text-gray-500 mt-2">
              Debounced: {debouncedTerm}
            </p>
          </div>

          {/* System Info Card */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">System Info</h3>
            <div className="space-y-2 text-sm">
              <p>Window: {windowSize.width} x {windowSize.height}</p>
              <p>Mouse: ({mousePos.x}, {mousePos.y})</p>
              <p>Online: {isOnline ? '🟢' : '🔴'}</p>
              <p>Scroll Y: {scrollY}px</p>
              <p>Desktop View: {mediaQuery ? 'Yes' : 'No'}</p>
              {batteryLevel !== null && <p>Battery: {batteryLevel}%</p>}
            </div>
          </div>

          {/* WebSocket Card */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">WebSocket Sim</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-mono text-sm">{wsMessage || 'Waiting...'}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">Updates every 3s</p>
          </div>

          {/* LocalStorage Card */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">LocalStorage</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm">{localStorage || 'No data'}</p>
            </div>
            <p className="text-xs text-gray-700 mt-2">
              Synced with counter
            </p>
          </div>

          {/* Keyboard Card */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Keyboard Input</h3>
            <div className="bg-gray-100 p-8 rounded text-center">
              <p className="text-3xl font-bold">
                {keyPressed || 'Press any key'}
              </p>
            </div>
          </div>

          {/* Observer Target */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Intersection Observer</h3>
            <div className="h-32 overflow-y-auto border rounded p-4">
              <div className="h-64">
                <p className="mb-20">Scroll down to see the target element...</p>
                <div 
                  ref={targetElementRef}
                  className={`p-4 rounded text-center font-bold ${
                    elementInView ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {elementInView ? '👁️ In View!' : 'Not visible'}
                </div>
              </div>
            </div>
          </div>

          {/* Event Logs */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Event Logs</h3>
            <div className="h-48 overflow-y-auto bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
