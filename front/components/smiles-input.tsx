'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { exampleSmilesList } from '@/lib/dummy-data';

interface SmilesInputProps {
  smiles: string;
  onChange: (value: string) => void;
  onRunPrediction: () => void;
  onReset: () => void;
  onLoadExample: (example: string) => void;
  isLoading: boolean;
}

export function SmilesInput({
  smiles,
  onChange,
  onRunPrediction,
  onReset,
  onLoadExample,
  isLoading,
}: SmilesInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section data-section="input" className="scroll-mt-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Enter SMILES String</h2>
          <p className="text-gray-400">Input a valid SMILES notation to predict molecular toxicity</p>
        </div>

        <div className="glass-dark rounded-xl p-6 md:p-8 space-y-4">
          <textarea
            ref={textareaRef}
            value={smiles}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter SMILES string (e.g., CC(=O)OC1=CC=CC=C1C(=O)O)"
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none font-mono text-sm"
            disabled={isLoading}
          />

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onRunPrediction}
              disabled={isLoading || !smiles.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Predicting...' : 'Run Prediction'}
            </Button>

            <Button
              onClick={handleCopy}
              variant="outline"
              className="border-slate-600 hover:bg-slate-800 text-gray-300"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy SMILES'}
            </Button>

            <Button
              onClick={onReset}
              variant="outline"
              className="border-slate-600 hover:bg-slate-800 text-gray-300"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-sm text-gray-400 mb-3">Load example molecules:</p>
            <div className="flex flex-wrap gap-2">
              {exampleSmilesList.map((example, idx) => (
                <Button
                  key={idx}
                  onClick={() => onLoadExample(example.smiles)}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 hover:bg-slate-800 text-gray-300 text-xs"
                  title={example.description}
                >
                  {example.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
