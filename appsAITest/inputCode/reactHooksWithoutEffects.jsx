"use client";

import React, {
  useState,
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useContext,
  useId,
  useSyncExternalStore,
  useDeferredValue,
  useTransition,
  createContext,
  useDebugValue,
} from "react";


// --------------------------------------------------
// Theme context
// --------------------------------------------------
const ThemeContext = createContext();

// --------------------------------------------------
// External store for useSyncExternalStore
// --------------------------------------------------
let subscribers = [];
let storeValue = 0;


// --------------------------------------------------
// Reducer function for useReducer
// --------------------------------------------------
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function subscribe(callback) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);
  };
}

function getSnapshot() {
  return storeValue;
}

function incrementStore() {
  storeValue++;
  subscribers.forEach((cb) => cb());
}

// --------------------------------------------------
// Custom hook with useDebugValue
// --------------------------------------------------
function use_custom_counter(initialValue = 0) {
  const [value, setValue] = useState(initialValue);
  useDebugValue(value > 5 ? "High count" : "Low count");

  const increment = () => setValue((v) => v + 1);
  return [value, increment];
}
// --------------------------------------------------
// Single JSX App component
// --------------------------------------------------
export default function App() {
  // Theme state
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  // All other hooks
  const [name, setName] = useState("");
  const [count, dispatch] = useReducer(counterReducer, 0);
  const inputRef = useRef();
  const expensiveCalc = useMemo(() => count * 1000, [count]);
  const handleFocus = useCallback(() => inputRef.current?.focus(), []);
  const id = useId();
  const storeVal = useSyncExternalStore(subscribe, getSnapshot, () => { });
  const deferredName = useDeferredValue(name);
  const [isPending, startTransition] = useTransition();
  const [debugCount, incDebugCount] = use_custom_counter(2);

  useEffect(() => { }, [])
  useLayoutEffect(() => { }, [])
  useInsertionEffect(() => { }, [])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
          }`}
      >
        <h1 className="text-4xl font-bold mb-6">
          React Hooks Playground (No Effects)
        </h1>

        {/* Theme Toggle */}
        <div className="mb-6">
          <p className="text-lg mb-2">Current Theme: {theme}</p>
          <button
            onClick={toggleTheme}
            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* useState + useDeferredValue */}
        <div className="mb-6">
          <label htmlFor={id} className="mr-2 font-medium">
            Enter Name:
          </label>
          <input
            id={id}
            ref={inputRef}
            className="border px-2 py-1 rounded text-black"
            value={name}
            onChange={(e) =>
              startTransition(() => {
                setName(e.target.value);
              })
            }
          />
          <button
            onClick={handleFocus}
            className="ml-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Focus Input
          </button>
          <p className="mt-2">Immediate Name: {name}</p>
          <p className="mt-1 text-gray-400">Deferred Name: {deferredName}</p>
          {isPending && <p className="text-sm text-orange-500">Updating...</p>}
        </div>

        {/* useReducer + useMemo */}
        <div className="mb-6">
          <p className="text-lg">Reducer Counter: {count}</p>
          <button
            onClick={() => dispatch({ type: "increment" })}
            className="mr-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            +
          </button>
          <button
            onClick={() => dispatch({ type: "decrement" })}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            -
          </button>
          <p className="mt-2 text-gray-400">Expensive Calculation: {expensiveCalc}</p>
        </div>

        {/* useSyncExternalStore */}
        <div className="mb-6">
          <p className="text-lg">Store Value: {storeVal}</p>
          <button
            onClick={incrementStore}
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          >
            Increment Store
          </button>
        </div>

        {/* useDebugValue */}
        <div className="mb-6">
          <p className="text-lg">Debug Counter: {debugCount}</p>
          <button
            onClick={incDebugCount}
            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
          >
            Increment Debug Counter
          </button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}


