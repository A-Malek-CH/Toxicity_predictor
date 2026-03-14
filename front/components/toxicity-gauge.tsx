'use client';

import React from 'react';

interface ToxicityGaugeProps {
  value: number;
  maxValue?: number;
}

export function ToxicityGauge({ value, maxValue = 5 }: ToxicityGaugeProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const angle = (percentage / 100) * 180 - 90; // Convert percentage to angle (-90 to 90)

  return (
    <div className="flex justify-center items-end">
      <div className="relative w-64 h-32">
        {/* Background gauge */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Base arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Safe zone (green) */}
          <path
            d="M 10 100 A 90 90 0 0 1 70 30.9"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Warning zone (yellow) */}
          <path
            d="M 70 30.9 A 90 90 0 0 1 130 30.9"
            fill="none"
            stroke="#eab308"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Danger zone (red) */}
          <path
            d="M 130 30.9 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Needle */}
          <g transform={`translate(100, 100) rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="-70" stroke="#0080ff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="0" r="6" fill="#0080ff" />
          </g>

          {/* Center circle */}
          <circle cx="100" cy="100" r="8" fill="#1a1f3a" stroke="#0080ff" strokeWidth="2" />

          {/* Labels */}
          <text x="30" y="95" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">
            Low
          </text>
          <text x="100" y="25" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">
            Medium
          </text>
          <text x="170" y="95" textAnchor="middle" className="text-xs fill-gray-500" fontSize="10">
            High
          </text>
        </svg>

        {/* Value display */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-3xl font-bold text-blue-400">{value}</div>
          <div className="text-xs text-gray-500">LD50 (mg/kg)</div>
        </div>
      </div>
    </div>
  );
}
