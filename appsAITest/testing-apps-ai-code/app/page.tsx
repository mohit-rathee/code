import React from 'react';
import FancyButton from '@/components/FancyButton';
import Counter from '@/components/Counter';


  
  export default function AppComponent() {
    
    return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800"
        data-component-id="element-1">
        <h1
          className="text-4xl font-bold mb-6"
          data-component-id="element-2">
          Welcome to Our Landing Page
        </h1>
        <p
          className="text-lg mb-8 text-center max-w-md"
          data-component-id="element-3">
          This is a simple landing page with a reusable FancyButton component.
        </p>
        <FancyButton
          hello={ans}
          data-component-id="element-4">
          <div
            data-component-id="element-5">
            wwwooooowww
          </div>
        </FancyButton>
        <Counter
          data-component-id="element-6" />
      </div>
    </div>
  );
  }