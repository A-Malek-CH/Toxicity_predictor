'use client';

import React from 'react';
import { ModelPrediction } from '@/lib/dummy-data';
import { Brain, Network, Fingerprint } from 'lucide-react';

interface ModelResultCardProps {
  model: ModelPrediction;
}

export function ModelResultCard({ model }: ModelResultCardProps) {
  const getIcon = () => {
    switch (model.modelType) {
      case 'text':
        return <Brain className="w-8 h-8 text-blue-400" />;
      case 'graph':
        return <Network className="w-8 h-8 text-cyan-400" />;
      case 'fingerprint':
        return <Fingerprint className="w-8 h-8 text-purple-400" />;
      default:
        return null;
    }
  };

  const confidenceColor =
    model.confidence > 0.9
      ? 'bg-green-500/20 text-green-300'
      : model.confidence > 0.85
        ? 'bg-blue-500/20 text-blue-300'
        : 'bg-yellow-500/20 text-yellow-300';

  return (
    <div
      className="glass-dark rounded-xl p-6 space-y-4 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 animate-slide-up"
      style={{
        animationDelay: model.modelType === 'text' ? '0s' : model.modelType === 'graph' ? '0.1s' : '0.2s',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">{model.modelName}</h3>
          <p className="text-sm text-gray-400">{model.description}</p>
        </div>
        {getIcon()}
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-700">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">LD50 Value</span>
            <span className="font-mono text-lg font-bold text-blue-400">{model.ld50}</span>
          </div>
          <p className="text-xs text-gray-500">mg/kg (estimated)</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Model Confidence</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${confidenceColor}`}>
              {(model.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${model.confidence * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
