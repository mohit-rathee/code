"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
  setIsToggled(!isToggled);
}


  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        style={{
  "width": "100%",
  "height": "100%"
}}
        data-component-id="panel-1">
        <div
          style={{
  "width": "100%",
  "height": "100%"
}}
          data-component-id="panel-2">
          <div
            style={{
  "width": "100%",
  "height": "100%"
}}
            data-component-id="panel-3">
            <div
              className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8"
              data-component-id="root-panel">
              <div
                className={isToggled ? 'text-6xl text-green-600 font-bold mb-8' : 'text-6xl text-red-600 font-bold mb-8'}
                data-component-id="status-display">
                {isToggled ? 'off' : 'on'}
              </div>
              <div
                className={isToggled ? 'text-6xl text-green-600 font-bold mb-8' : 'text-6xl text-red-600 font-bold mb-8'}
                data-component-id="calculation">
                {2 + 2}
              </div>
              <button
                onClick={handleToggle}
                className={isToggled ? 'bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors' : 'bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors'}
                data-component-id="toggle-button">
                change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}