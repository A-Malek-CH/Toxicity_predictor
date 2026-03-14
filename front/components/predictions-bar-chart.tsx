'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { PredictionResult } from '@/lib/dummy-data';

interface PredictionsBarChartProps {
  result: PredictionResult;
}

export function PredictionsBarChart({ result }: PredictionsBarChartProps) {
  const data = [
    {
      name: 'SMILES',
      ld50: result.textModel.ld50,
      confidence: (result.textModel.confidence * 100).toFixed(0),
    },
    {
      name: 'GNN',
      ld50: result.graphModel.ld50,
      confidence: (result.graphModel.confidence * 100).toFixed(0),
    },
    {
      name: 'Fingerprint',
      ld50: result.fingerprintModel.ld50,
      confidence: (result.fingerprintModel.confidence * 100).toFixed(0),
    },
    {
      name: 'Ensemble',
      ld50: result.ensemble.ld50,
      confidence: (result.ensemble.confidence * 100).toFixed(0),
    },
  ];

  const colors = ['#00d4ff', '#b700ff', '#00ff88', '#0080ff'];

  return (
    <div className="glass-dark rounded-xl p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-white mb-6">LD50 Predictions Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2f4a" />
          <XAxis dataKey="name" stroke="#8090b0" />
          <YAxis stroke="#8090b0" label={{ value: 'LD50 (mg/kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1f3a',
              border: '1px solid #0080ff',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#0080ff' }}
          />
          <Legend />
          <Bar dataKey="ld50" fill="#0080ff" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="text-sm text-gray-400">{item.name}</div>
            <div className="text-2xl font-bold text-white">{item.ld50}</div>
            <div className="text-xs text-gray-500">{item.confidence}% confidence</div>
            <div className="w-full h-1 bg-slate-800 rounded-full">
              <div
                className="h-1 rounded-full transition-all"
                style={{
                  width: `${item.confidence}%`,
                  backgroundColor: colors[idx],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
