'use client';

import React from 'react';
import { PredictionResult } from '@/lib/dummy-data';
import { ToxicityGauge } from './toxicity-gauge';
import { PredictionsBarChart } from './predictions-bar-chart';
import { ModelAgreementPanel } from './model-agreement-panel';

interface VisualizationsSectionProps {
  result: PredictionResult;
  researchMode?: boolean;
}

export function VisualizationsSection({ result, researchMode = false }: VisualizationsSectionProps) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Visualizations</h2>
        <p className="text-gray-400">Interactive charts showing prediction details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-dark rounded-xl p-8 flex flex-col justify-center items-center animate-slide-up">
          <h3 className="text-xl font-bold text-white mb-8">Ensemble Toxicity Gauge</h3>
          <ToxicityGauge value={result.ensemble.ld50} maxValue={5} />
        </div>

        <PredictionsBarChart result={result} />
      </div>

      {researchMode && (
        <div className="animate-slide-up">
          <ModelAgreementPanel
            modelAgreement={result.researchMetrics.modelAgreement}
            uncertaintyScore={result.researchMetrics.uncertaintyScore}
            experimentalDataPoints={result.researchMetrics.experimentalDataPoints}
            modelConsensus={result.researchMetrics.modelConsensus}
          />
        </div>
      )}
    </section>
  );
}
