"use client";
import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Counter: {count}
      </h1>

      <div>
        <button
          style={{
            padding: "10px 20px",
            margin: "5px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            color: "white",
            backgroundColor: "green",
          }}
          onClick={() => setCount(count + 1)}
        >
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
            backgroundColor: "red",
          }}
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
      </div>

      <p
        style={{
          marginTop: "20px",
          fontSize: "18px",
          color: count % 2 === 0 ? "blue" : "orange",
        }}
        className={count % 2 === 0 ? "even" : "odd"}
      >
        {count % 2 === 0 ? "Even Number" : "Odd Number"}
      </p>
    </div>
  );
}

