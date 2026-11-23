"use client";

import React, { useState, useReducer, useRef, useMemo, useCallback, useContext, useId, useSyncExternalStore, useDeferredValue, useTransition, createContext, useDebugValue, useEffect, useLayoutEffect, useInsertionEffect } from 'react';


const ThemeContext = createContext();
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
};
function subscribe(callback) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
};
function getSnapshot() {
  return storeValue;
};
function incrementStore() {
  storeValue++;
  subscribers.forEach(cb => cb());
}

// --------------------------------------------------
// Custom hook with useDebugValue
// --------------------------------------------------;
// --------------------------------------------------
// Custom hook with useDebugValue
// --------------------------------------------------
function use_custom_counter(initialValue = 0) {
  const [value, setValue] = useState(initialValue);
  useDebugValue(value > 5 ? "High count" : "Low count");
  const increment = () => setValue(v => v + 1);
  return [value, increment];
}
// --------------------------------------------------
// Single JSX App component
// --------------------------------------------------;


export default function AppComponent() {
  const [value, setValue] = useState(null);
  const increment = () => setValue(v => v + 1);
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => setTheme(prev => prev === "light" ? "dark" : "light"), []);
  const [name, setName] = useState("");
  const [count, dispatch] = useReducer(counterReducer, 0);
  const inputRef = useRef(null);
  const expensiveCalc = useMemo(() => count * 1000, [count]);
  const handleFocus = useCallback(() => inputRef.current?.focus(), []);
  const id = useId();
  const storeVal = useSyncExternalStore(subscribe, getSnapshot, () => { });
  const deferredName = useDeferredValue(name);
  const [isPending, startTransition] = useTransition();
  const [debugCount, incDebugCount] = use_custom_counter(2);
  useEffect(() => { }, []);
  useLayoutEffect(() => { }, []);
  useInsertionEffect(() => { }, []);


  return (<div
    style={{ "width": "100%", "height": "100%" }}
    data-component-id="root">
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
      data-component-id="element-1">
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
        data-component-id="element-2">
        <h1
          className="text-4xl font-bold mb-6"
          data-component-id="element-3">
          React Hooks Playground (No Effects)
        </h1>
        <div
          className="mb-6"
          data-component-id="element-4">
          <p
            className="text-lg mb-2"
            data-component-id="element-5">
            Current Theme:{theme}
          </p>
          <button
            onClick={toggleTheme}
            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
            data-component-id="element-6">
            Toggle Theme
          </button>
        </div>
        <div
          className="mb-6"
          data-component-id="element-7">
          <label
            htmlFor={id}
            className="mr-2 font-medium"
            data-component-id="element-8">
            Enter Name:
          </label>
          <input
            id={id}
            ref={inputRef}
            className="border px-2 py-1 rounded text-black"
            value={name}
            onChange={e => startTransition(() => {
              setName(e.target.value);
            })}
            data-component-id="element-9" />
          <button
            onClick={handleFocus}
            className="ml-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            data-component-id="element-10">
            Focus Input
          </button>
          <p
            className="mt-2"
            data-component-id="element-11">
            Immediate Name:{name}
          </p>
          <p
            className="mt-1 text-gray-400"
            data-component-id="element-12">
            Deferred Name:{deferredName}
          </p>
          {isPending && (
            <p
              className="text-sm text-orange-500"
              data-component-id="element-13">
              Updating...
            </p>
          )}          </div>
        <div
          className="mb-6"
          data-component-id="element-14">
          <p
            className="text-lg"
            data-component-id="element-15">
            Reducer Counter:{count}
          </p>
          <button
            onClick={() => dispatch({
              type: "increment"
            })}
            className="mr-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            data-component-id="element-16">
            +
          </button>
          <button
            onClick={() => dispatch({
              type: "decrement"
            })}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            data-component-id="element-17">
            -
          </button>
          <p
            className="mt-2 text-gray-400"
            data-component-id="element-18">
            Expensive Calculation:{expensiveCalc}
          </p>
        </div>
        <div
          className="mb-6"
          data-component-id="element-19">
          <p
            className="text-lg"
            data-component-id="element-20">
            Store Value:{storeVal}
          </p>
          <button
            onClick={incrementStore}
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
            data-component-id="element-21">
            Increment Store
          </button>
        </div>
        <div
          className="mb-6"
          data-component-id="element-22">
          <p
            className="text-lg"
            data-component-id="element-23">
            Debug Counter:{debugCount}
          </p>
          <button
            onClick={incDebugCount}
            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
            data-component-id="element-24">
            Increment Debug Counter
          </button>
        </div>
      </div>
    </ThemeContext.Provider>
  </div>
  );
}
