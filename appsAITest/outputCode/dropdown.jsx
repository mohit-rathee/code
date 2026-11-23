"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [isToggled, setIsToggled] = useState(false);


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
          className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8"
          data-component-id="root-panel">
          <div
            className="max-w-4xl mx-auto bg-white/10 rounded-xl p-8 backdrop-blur-sm"
            data-component-id="test-container">
            <h1
              className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              data-component-id="title">
              Dropdown Test
            </h1>
            <div
              className="grid md:grid-cols-3 gap-6 mb-8"
              data-component-id="dropdowns-grid">
              <div
                className="space-y-3"
                data-component-id="color-dropdown-section">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="color-label">
                  Choose Color
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  data-component-id="color-select">
                  <option
                    value="blue"
                    className="bg-gray-800 text-white"
                    data-component-id="color-option-blue">
                    Blue
                  </option>
                  <option
                    value="red"
                    className="bg-gray-800 text-white"
                    data-component-id="color-option-red">
                    Red
                  </option>
                  <option
                    value="green"
                    className="bg-gray-800 text-white"
                    data-component-id="color-option-green">
                    Green
                  </option>
                  <option
                    value="purple"
                    className="bg-gray-800 text-white"
                    data-component-id="color-option-purple">
                    Purple
                  </option>
                </select>
              </div>
              <div
                className="space-y-3"
                data-component-id="size-dropdown-section">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="size-label">
                  Choose Size
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  data-component-id="size-select">
                  <option
                    value="small"
                    className="bg-gray-800 text-white"
                    data-component-id="size-option-small">
                    Small
                  </option>
                  <option
                    value="medium"
                    className="bg-gray-800 text-white"
                    data-component-id="size-option-medium">
                    Medium
                  </option>
                  <option
                    value="large"
                    className="bg-gray-800 text-white"
                    data-component-id="size-option-large">
                    Large
                  </option>
                  <option
                    value="xlarge"
                    className="bg-gray-800 text-white"
                    data-component-id="size-option-xlarge">
                    X-Large
                  </option>
                </select>
              </div>
              <div
                className="space-y-3"
                data-component-id="toggle-section">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="toggle-label">
                  Enable Feature
                </label>
                <input
                  type="checkbox"
                  className="w-6 h-6 text-purple-600 bg-transparent border-gray-300 rounded focus:ring-purple-500"
                  checked={isToggled}
                  onChange={e => setIsToggled(e.target.checked)}
                  data-component-id="toggle-checkbox" />
              </div>
            </div>
            <div
              className="p-6 bg-white/5 rounded-lg border border-white/10"
              data-component-id="results-section">
              <h3
                className="text-xl font-semibold mb-4"
                data-component-id="results-title">
                Current Selections:
              </h3>
              <p
                className="text-gray-300 mb-2"
                data-component-id="color-result">
                {`Color: ${selectedColor}`}
              </p>
              <p
                className="text-gray-300 mb-2"
                data-component-id="size-result">
                {`Size: ${selectedSize}`}
              </p>
              <p
                className="text-gray-300"
                data-component-id="toggle-result">
                {`Feature Enabled: ${isToggled ? 'Yes' : 'No'}`}
              </p>
              <div
                className={`mt-6 w-32 h-32 mx-auto rounded-lg transition-all duration-300 ${selectedColor === 'blue' ? 'bg-blue-500' : selectedColor === 'red' ? 'bg-red-500' : selectedColor === 'green' ? 'bg-green-500' : 'bg-purple-500'} ${selectedSize === 'small' ? 'scale-75' : selectedSize === 'medium' ? 'scale-100' : selectedSize === 'large' ? 'scale-125' : 'scale-150'} ${isToggled ? 'shadow-lg shadow-current animate-pulse' : ''}`}
                data-component-id="demo-box">
                {`${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} ${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}