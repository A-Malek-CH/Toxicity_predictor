'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Brain, Network, Fingerprint } from 'lucide-react';

export function ModelExplanations() {
  return (
    <div className="glass-dark rounded-xl p-8 space-y-6 animate-slide-up">
      <h3 className="text-2xl font-bold text-white">Model Architecture</h3>

      <Accordion type="single" collapsible className="w-full space-y-3">
        <AccordionItem value="text" className="border-slate-700">
          <AccordionTrigger className="hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">SMILES Transformer</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-slate-900/30 rounded-lg space-y-3">
            <p className="text-gray-300">
              A deep learning transformer model specifically designed to parse and understand SMILES (Simplified Molecular Input Line Entry System) strings.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-blue-400 font-semibold">Architecture:</span> 6-layer Transformer encoder
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Parameters:</span> 110M trainable parameters
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Strengths:</span> Captures long-range molecular patterns and chemical context
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="graph" className="border-slate-700">
          <AccordionTrigger className="hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Network className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Graph Neural Network</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-slate-900/30 rounded-lg space-y-3">
            <p className="text-gray-300">
              A graph neural network that constructs an explicit molecular graph and learns node and edge representations.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-cyan-400 font-semibold">Architecture:</span> GraphSAGE with 4 layers
              </p>
              <p>
                <span className="text-cyan-400 font-semibold">Input:</span> Molecular connectivity, atomic properties
              </p>
              <p>
                <span className="text-cyan-400 font-semibold">Strengths:</span> Captures 3D molecular structure and atom relationships
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fingerprint" className="border-slate-700">
          <AccordionTrigger className="hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Fingerprint-based Model</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-slate-900/30 rounded-lg space-y-3">
            <p className="text-gray-300">
              Extracts extended connectivity fingerprints (ECFP4) from molecules and uses XGBoost for classification.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-purple-400 font-semibold">Fingerprint:</span> ECFP4 (1024-bit vectors)
              </p>
              <p>
                <span className="text-purple-400 font-semibold">Classifier:</span> Gradient Boosting (XGBoost)
              </p>
              <p>
                <span className="text-purple-400 font-semibold">Strengths:</span> Fast inference, interpretable molecular patterns
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ensemble" className="border-slate-700">
          <AccordionTrigger className="hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">3</span>
              <span className="text-white font-semibold">Ensemble Strategy</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-slate-900/30 rounded-lg space-y-3">
            <p className="text-gray-300">
              Combines predictions from all three models using weighted voting for robust and reliable predictions.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-blue-400 font-semibold">Weights:</span> SMILES (40%) + GNN (30%) + Fingerprint (30%)
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Output:</span> Consensus toxicity prediction with confidence
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Advantage:</span> Combines different perspectives for better generalization
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="border-t border-slate-700 pt-6">
        <p className="text-sm text-gray-400">
          Training data includes ECHA REACH documents, PubChem, and proprietary chemical datasets with verified toxicity labels.
        </p>
      </div>
    </div>
  );
}
