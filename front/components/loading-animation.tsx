'use client';

import React, { useState, useEffect } from 'react';

const loadingSteps = [
  'Encoding SMILES string...',
  'Building molecular graph...',
  'Processing neural networks...',
  'Computing ensemble prediction...',
];

export function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="glass-dark rounded-xl p-8 md:p-12 max-w-md w-full text-center space-y-6">
        {/* Animated spinner */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-slate-700 border-t-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-blue-400">
            {loadingSteps[currentStep]}
          </p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500"
                style={{
                  opacity: i === currentStep ? 1 : 0.3,
                  transition: 'opacity 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-400">
          Analyzing molecular structure...
        </p>
      </div>
    </div>
  );
}
