"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [count, setCount] = useState(0);


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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f9f9f9",
  fontFamily: "Arial, sans-serif"
}}
            data-component-id="element-1">
            <h1
              style={{
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px"
}}
              data-component-id="element-2">
              Counter:{count}
            </h1>
            <div
              data-component-id="element-3">
              <button
                style={{
  padding: "10px 20px",
  margin: "5px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  color: "white",
  backgroundColor: "green"
}}
                onClick={() => setCount(count + 1)}
                data-component-id="element-4">
                Increment
              </button>
              <button
                style={{
  padding: "10px 20px",
  margin: "5px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  color: "white",
  backgroundColor: "red"
}}
                onClick={() => setCount(count - 1)}
                data-component-id="element-5">
                Decrement
              </button>
            </div>
            <p
              style={{
  marginTop: "20px",
  fontSize: "18px",
  color: count % 2 === 0 ? "blue" : "orange"
}}
              className={count % 2 === 0 ? "even" : "odd"}
              data-component-id="element-6">
              {count % 2 === 0 ? "Even Number" : "Odd Number"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
