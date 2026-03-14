'use client';

import React from 'react';
import { Beaker } from 'lucide-react';
import { MolecularProperties } from '@/lib/dummy-data';

interface MoleculePreviewProps {
  smiles: string;
  properties?: MolecularProperties;
}

export function MoleculePreview({ smiles, properties }: MoleculePreviewProps) {
  return (
    <div className="glass-dark rounded-xl p-8 space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
          <Beaker className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Molecular Structure</h3>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 flex items-center justify-center min-h-64">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-96">
          {/* Simple benzene ring visualization */}
          <circle cx="200" cy="200" r="60" fill="none" stroke="#0080ff" strokeWidth="2" opacity="0.5" />

          {/* Hexagon (benzene ring simplified) */}
          <polygon
            points="200,140 260,170 260,230 200,260 140,230 140,170"
            fill="none"
            stroke="#0080ff"
            strokeWidth="3"
            opacity="0.8"
          />

          {/* Add atom nodes */}
          <circle cx="200" cy="140" r="8" fill="#00d4ff" className="animate-pulse" />
          <circle cx="260" cy="170" r="8" fill="#00d4ff" className="animate-pulse" />
          <circle cx="260" cy="230" r="8" fill="#00d4ff" className="animate-pulse" />
          <circle cx="200" cy="260" r="8" fill="#00d4ff" className="animate-pulse" />
          <circle cx="140" cy="230" r="8" fill="#00d4ff" className="animate-pulse" />
          <circle cx="140" cy="170" r="8" fill="#00d4ff" className="animate-pulse" />

          {/* Center atom */}
          <circle cx="200" cy="200" r="6" fill="#b700ff" />

          {/* Electrons orbital */}
          <circle cx="200" cy="200" r="80" fill="none" stroke="#b700ff" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" />

          {/* Glow effect */}
          <circle cx="200" cy="200" r="60" fill="none" stroke="#0080ff" strokeWidth="1" opacity="0.2" />

          {/* Labels */}
          <text x="200" y="330" textAnchor="middle" className="text-sm fill-gray-400" fontSize="14">
            Molecular Preview
          </text>
          <text x="200" y="350" textAnchor="middle" className="text-xs fill-gray-500" fontSize="12">
            SMILES: {smiles.substring(0, 30)}...
          </text>
        </svg>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-700">
        <div>
          <p className="text-sm text-gray-400 mb-2">SMILES String</p>
          <p className="font-mono text-xs text-blue-300 break-all bg-slate-900/50 p-2 rounded border border-slate-700">
            {smiles}
          </p>
        </div>
        {properties && (
          <div>
            <p className="text-sm text-gray-400 mb-2">Molecular Properties</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-gray-500">Molecular Weight</p>
                <p className="text-cyan-400 font-semibold">{properties.molecularWeight} g/mol</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-gray-500">LogP</p>
                <p className="text-cyan-400 font-semibold">{properties.logP}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-gray-500">Formula</p>
                <p className="text-cyan-400 font-semibold">{properties.formula}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-gray-500">Atom Count</p>
                <p className="text-cyan-400 font-semibold">{properties.atomCount}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-gray-500">H-Bond Donors</p>
                <p className="text-cyan-400 font-semibold">{properties.hydrogenBondDonors}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-gray-500">H-Bond Acceptors</p>
                <p className="text-cyan-400 font-semibold">{properties.hydrogenBondAcceptors}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
