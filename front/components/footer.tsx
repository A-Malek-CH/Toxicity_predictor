'use client';

import React from 'react';
import { Brain, Beaker, Network } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-slate-950 to-background border-t border-slate-800 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* AI/ML */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">AI/ML Models</span>
            </div>
            <p className="text-sm text-gray-400">
              Powered by advanced machine learning architectures for accurate toxicity prediction
            </p>
          </div>

          {/* Chemistry */}
          <div className="space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Beaker className="w-6 h-6 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400">Chemistry</span>
            </div>
            <p className="text-sm text-gray-400">
              SMILES parsing and molecular graph analysis for comprehensive chemical understanding
            </p>
          </div>

          {/* Research */}
          <div className="space-y-3 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
              <Network className="w-6 h-6 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Research</span>
            </div>
            <p className="text-sm text-gray-400">
              Built on cutting-edge research in computational chemistry and deep learning
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">AI Molecular Toxicity Predictor</h3>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              This is a demonstration interface showcasing AI-powered molecular toxicity prediction with ensemble machine learning models.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Documentation
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              API Reference
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Research Paper
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              GitHub
            </a>
          </div>

          <div className="text-center text-xs text-gray-600 space-y-1">
            <p>&copy; {currentYear} AI Molecular Toxicity Research Project. All rights reserved.</p>
            <p>
              Built with React, Next.js, and modern machine learning frameworks. Data for demonstration purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
