"use client";

import React, { useRef, useState } from 'react';

export default function AppComponent() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);
  const getMousePosition = event => {
  const canvas = canvasRef.current;
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
  const handleMouseDown = event => {
  const position = getMousePosition(event);
  if (!position) return;
  setIsDrawing(true);
  setLastPosition(position);

  // Draw initial dot
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
  ctx.fill();
}
  const handleMouseMove = event => {
  if (!isDrawing || !lastPosition) return;
  const currentPosition = getMousePosition(event);
  if (!currentPosition) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  // Draw line from last position to current position
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(lastPosition.x, lastPosition.y);
  ctx.lineTo(currentPosition.x, currentPosition.y);
  ctx.stroke();
  setLastPosition(currentPosition);
}
  const handleMouseUp = () => {
  setIsDrawing(false);
  setLastPosition(null);
}
  const handleMouseLeave = () => {
  setIsDrawing(false);
  setLastPosition(null);
}
  const clearCanvas = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
          className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8 flex flex-col items-center justify-center"
          data-component-id="root-panel">
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full"
            data-component-id="canvas-container">
            <h1
              className="text-4xl font-bold text-center mb-6 text-gray-800"
              data-component-id="canvas-title">
              Draw by Dragging on Canvas
            </h1>
            <p
              className="text-center mb-6 text-lg text-gray-600"
              data-component-id="canvas-instructions">
              Click and drag on the canvas to draw smooth lines!
            </p>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-gray-50 hover:bg-gray-100 transition-colors mb-6"
              data-component-id="drawing-canvas" />
            <div
              className="flex justify-center gap-4"
              data-component-id="control-panel">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                onClick={clearCanvas}
                data-component-id="clear-button">
                Clear Canvas
              </button>
              <div
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium"
                data-component-id="canvas-info">
                Canvas Size: 800x600 | Line Width: 3px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}