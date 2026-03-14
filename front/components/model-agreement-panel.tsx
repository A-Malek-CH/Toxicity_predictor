'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface ModelAgreementPanelProps {
  modelAgreement: number;
  uncertaintyScore: number;
  experimentalDataPoints: number;
  modelConsensus: 'strong' | 'moderate' | 'weak';
}

export function ModelAgreementPanel({
  modelAgreement,
  uncertaintyScore,
  experimentalDataPoints,
  modelConsensus,
}: ModelAgreementPanelProps) {
  const [displayAgreement, setDisplayAgreement] = useState(0);
  const [displayUncertainty, setDisplayUncertainty] = useState(0);

  useEffect(() => {
    // Animate the agreement score
    let start = 0;
    const timer = setInterval(() => {
      start += 0.05;
      if (start >= modelAgreement) {
        setDisplayAgreement(modelAgreement);
        clearInterval(timer);
      } else {
        setDisplayAgreement(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [modelAgreement]);

  useEffect(() => {
    // Animate the uncertainty score
    let start = 0;
    const timer = setInterval(() => {
      start += 0.02;
      if (start >= uncertaintyScore) {
        setDisplayUncertainty(uncertaintyScore);
        clearInterval(timer);
      } else {
        setDisplayUncertainty(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [uncertaintyScore]);

  const getConsensusColor = (consensus: string) => {
    switch (consensus) {
      case 'strong':
        return 'from-emerald-500 to-teal-500';
      case 'moderate':
        return 'from-amber-500 to-orange-500';
      case 'weak':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const getConsensusText = (consensus: string) => {
    switch (consensus) {
      case 'strong':
        return 'Strong Agreement';
      case 'moderate':
        return 'Moderate Agreement';
      case 'weak':
        return 'Weak Agreement';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="glass-dark border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-purple-950/40">
      <CardHeader>
        <CardTitle className="text-lg text-cyan-300">Model Consensus Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Agreement */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Model Agreement</span>
            <span className="text-sm font-bold text-cyan-300">{(displayAgreement * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 transition-all duration-300"
              style={{ width: `${displayAgreement * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {displayAgreement > 0.85
              ? 'All models show strong consensus'
              : displayAgreement > 0.65
                ? 'Models generally agree'
                : 'Models diverge significantly'}
          </p>
        </div>

        {/* Consensus Badge */}
        <div className="flex items-center gap-3 rounded-lg bg-black/30 px-4 py-3">
          <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${getConsensusColor(modelConsensus)}`} />
          <div>
            <p className="text-xs font-semibold text-gray-400">Consensus Level</p>
            <p className="text-sm font-bold text-white">{getConsensusText(modelConsensus)}</p>
          </div>
        </div>

        {/* Uncertainty Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Prediction Uncertainty</span>
            <span className="text-sm font-bold text-orange-300">{(displayUncertainty * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/50 transition-all duration-300"
              style={{ width: `${displayUncertainty * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {displayUncertainty < 0.2
              ? 'Low uncertainty - high confidence'
              : displayUncertainty < 0.35
                ? 'Moderate uncertainty'
                : 'High uncertainty - use with caution'}
          </p>
        </div>

        {/* Experimental Data Points */}
        <div className="rounded-lg bg-black/30 px-4 py-3">
          <p className="text-xs font-semibold text-gray-400">Experimental Data</p>
          <p className="text-lg font-bold text-emerald-300">{experimentalDataPoints} references</p>
          <p className="text-xs text-gray-500">Trained on peer-reviewed toxicity datasets</p>
        </div>
      </CardContent>
    </Card>
  );
}
