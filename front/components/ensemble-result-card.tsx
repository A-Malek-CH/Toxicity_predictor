'use client';

import React from 'react';
import { ModelPrediction } from '@/lib/dummy-data';
import { Zap } from 'lucide-react';

interface EnsembleResultCardProps {
  model: ModelPrediction;
}

export function EnsembleResultCard({ model }: EnsembleResultCardProps) {
  const toxicityLevel = model.ld50 < 2.0 ? 'High' : model.ld50 < 2.5 ? 'Medium' : 'Low';
  const toxicityColor =
    model.ld50 < 2.0 ? 'text-red-400' : model.ld50 < 2.5 ? 'text-yellow-400' : 'text-green-400';

  return (
    <div className="glass-dark rounded-xl p-8 space-y-6 border border-blue-500/30 animate-pulse-glow relative overflow-hidden col-span-full md:col-span-2 lg:col-span-1 animate-slide-up">
      {/* Animated glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Ensemble Prediction</h3>
            <p className="text-sm text-gray-400">Weighted average of all models</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-gray-300 font-medium">LD50 Value</span>
              <span className="text-4xl font-bold text-blue-400">{model.ld50}</span>
            </div>
            <p className="text-sm text-gray-500">mg/kg (estimated)</p>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Toxicity Level</span>
              <span className={`text-lg font-bold ${toxicityColor}`}>{toxicityLevel}</span>
            </div>
            <div className="text-xs text-gray-500">
              {toxicityLevel === 'High'
                ? 'Potentially toxic compound'
                : toxicityLevel === 'Medium'
                  ? 'Moderate toxicity risk'
                  : 'Low toxicity expected'}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Prediction Confidence</span>
              <span className="bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text text-transparent font-bold">
                {(model.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-700 shadow-lg shadow-cyan-500/50"
                style={{ width: `${model.confidence * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-4 text-xs text-gray-500 space-y-1">
          <p>Model architecture: Ensemble of Transformer + GNN + Fingerprint</p>
          <p>Training data: ECHA, PubChem, and proprietary datasets</p>
        </div>
      </div>
    </div>
  );
}
