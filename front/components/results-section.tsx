'use client';

import React from 'react';
import { PredictionResult } from '@/lib/dummy-data';
import { ModelResultCard } from './model-result-card';
import { EnsembleResultCard } from './ensemble-result-card';

interface ResultsSectionProps {
  result: PredictionResult;
}

export function ResultsSection({ result }: ResultsSectionProps) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Prediction Results</h2>
        <p className="text-gray-400">
          SMILES: <span className="font-mono text-blue-300">{result.smiles}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModelResultCard model={result.textModel} />
        <ModelResultCard model={result.graphModel} />
        <ModelResultCard model={result.fingerprintModel} />
        <EnsembleResultCard model={result.ensemble} />
      </div>
    </section>
  );
}
