'use client';

import React, { useState, useCallback } from 'react';
import { generateDummyPrediction, PredictionResult, exampleSmiles } from '@/lib/dummy-data';
import { HeroSection } from './hero-section';
import { SmilesInput } from './smiles-input';
import { EnhancedInferenceAnimation } from './enhanced-inference-animation';
import { ResultsSection } from './results-section';
import { VisualizationsSection } from './visualizations-section';
import { MoleculePreview } from './molecule-preview';
import { ModelExplanations } from './model-explanations';
import { Footer } from './footer';
import { ResearchModeToggle } from './research-mode-toggle';

export function ToxicityPredictor() {
  const [smiles, setSmiles] = useState(exampleSmiles);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [hasRunPrediction, setHasRunPrediction] = useState(false);
  const [researchMode, setResearchMode] = useState(false);

  const handleRunPrediction = useCallback(async () => {
    if (!smiles.trim()) return;

    setIsLoading(true);
    setHasRunPrediction(true);

    try {
      // Fetch molecular properties from our new Flask backend
      const response = await fetch(`http://localhost:5000/api/molecule/properties?smiles=${encodeURIComponent(smiles)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch molecular properties');
      }
      
      const propertiesData = await response.json();
      
      // We still use dummy data for the ML model predictions (since they aren't built yet)
      const basePrediction = generateDummyPrediction(smiles);
      
      // Override the dummy properties with real data from the backend
      const prediction = {
        ...basePrediction,
        molecularProperties: {
          molecularWeight: propertiesData.molecularWeight,
          formula: propertiesData.formula,
          atomCount: propertiesData.atomCount,
          hydrogenBondDonors: propertiesData.hydrogenBondDonors,
          hydrogenBondAcceptors: propertiesData.hydrogenBondAcceptors,
          logP: propertiesData.logP,
          // Extract any extra properties if needed in the future
          ...propertiesData 
        }
      };
      
      setResult(prediction);
    } catch (error) {
      console.error("Error fetching properties:", error);
      // Fallback to pure dummy data if backend fails
      const prediction = generateDummyPrediction(smiles);
      setResult(prediction);
    } finally {
      setIsLoading(false);
    }
  }, [smiles]);

  const handleReset = useCallback(() => {
    setSmiles(exampleSmiles);
    setResult(null);
    setIsLoading(false);
    setHasRunPrediction(false);
  }, []);

  const handleLoadExample = useCallback((example: string) => {
    setSmiles(example);
    setResult(null);
    setIsLoading(false);
    setHasRunPrediction(false);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />

      <section className="relative px-4 py-20 md:py-32 max-w-6xl mx-auto">
        <SmilesInput
          smiles={smiles}
          onChange={setSmiles}
          onRunPrediction={handleRunPrediction}
          onReset={handleReset}
          onLoadExample={handleLoadExample}
          isLoading={isLoading}
        />
      </section>

      {isLoading && (
        <section className="relative px-4 py-16 max-w-6xl mx-auto">
          <EnhancedInferenceAnimation isLoading={isLoading} />
        </section>
      )}

      {hasRunPrediction && result && !isLoading && (
        <>
          <section className="relative px-4 py-20 max-w-6xl mx-auto">
            <div className="mb-8">
              <ResearchModeToggle isResearchMode={researchMode} onToggle={setResearchMode} />
            </div>
            <ResultsSection result={result} />
          </section>

          <section className="relative px-4 py-20 max-w-6xl mx-auto">
            <VisualizationsSection result={result} researchMode={researchMode} />
          </section>

          <section className="relative px-4 py-20 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <MoleculePreview smiles={result.smiles} properties={result.molecularProperties} />
              <ModelExplanations />
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
