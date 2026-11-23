import React from "react";
import FancyButton from "@/components/FancyButton";
import Counter from "@/components/Counter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Landing Page</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        This is a simple landing page with a reusable FancyButton component.
      </p>
      <FancyButton hello={ans}>
        <div > wwwooooowww  </div>
      </FancyButton>
      <Counter />
    </div>
  );
}


