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

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-2 md:p-8 flex items-center justify-center min-h-[300px] overflow-hidden">
        {/* Load the actual 2D molecule image from the RDKit Python Backend */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={`http://localhost:5000/api/molecule/image?smiles=${encodeURIComponent(smiles)}&width=400&height=400`} 
            alt="Molecular Structure" 
            className="max-w-full max-h-[350px] object-contain drop-shadow-2xl"
            onError={(e) => {
              // Fallback styling if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-slate-800');
            }}
          />
          {/* Subtle glow effect behind the image */}
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
        </div>
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
