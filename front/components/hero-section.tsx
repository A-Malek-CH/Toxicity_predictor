'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const handleScroll = () => {
    const inputSection = document.querySelector('[data-section="input"]');
    inputSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-background pt-20">
      {/* Animated background molecules */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <div className="inline-block mb-4 px-4 py-2 rounded-full glass-dark">
            <span className="text-sm font-medium text-blue-300">AI-Powered Toxicity Prediction</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          <span className="text-gradient">AI Molecular Toxicity Predictor</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
          Predict molecular toxicity from SMILES using advanced AI models. Ensemble predictions powered by Transformers, Graph Neural Networks, and Fingerprint analysis.
        </p>

        <Button
          onClick={handleScroll}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
        >
          Start Prediction
        </Button>
      </div>
    </section>
  );
}
