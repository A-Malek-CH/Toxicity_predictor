'use client';

import { Check, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EnhancedInferenceAnimationProps {
  isLoading: boolean;
}

const INFERENCE_STEPS = [
  { label: 'Parsing SMILES', description: 'Converting molecular string to graph representation' },
  { label: 'Feature Extraction', description: 'Computing molecular properties and descriptors' },
  { label: 'Text Model', description: 'Running SMILES Transformer inference' },
  { label: 'Graph Model', description: 'Processing with Graph Neural Network' },
  { label: 'Ensemble', description: 'Aggregating predictions from all models' },
];

export function EnhancedInferenceAnimation({ isLoading }: EnhancedInferenceAnimationProps) {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setCompletedSteps(0);
      setCurrentText('');
      return;
    }

    // Animate steps
    const stepInterval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < INFERENCE_STEPS.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    return () => clearInterval(stepInterval);
  }, [isLoading]);

  // Animate current step text
  useEffect(() => {
    if (!isLoading || completedSteps === 0 || completedSteps > INFERENCE_STEPS.length) {
      setCurrentText('');
      return;
    }

    const currentStep = INFERENCE_STEPS[completedSteps - 1];
    let textIndex = 0;

    const textInterval = setInterval(() => {
      if (textIndex < currentStep.label.length) {
        setCurrentText(currentStep.label.substring(0, textIndex + 1));
        textIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 50);

    return () => clearInterval(textInterval);
  }, [completedSteps, isLoading]);

  return (
    <div className="space-y-8 py-8">
      {/* Main Loading Message */}
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
          {isLoading ? 'Predicting Toxicity' : 'Prediction Complete'}
        </h2>
        <p className="text-sm text-gray-400 font-mono">
          {currentText}
          {isLoading && completedSteps <= INFERENCE_STEPS.length && (
            <span className="animate-pulse">▌</span>
          )}
        </p>
      </div>

      {/* Pipeline Steps */}
      <div className="space-y-3">
        {INFERENCE_STEPS.map((step, index) => {
          const isCompleted = index < completedSteps;
          const isActive = index === completedSteps - 1;

          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-3 rounded-lg transition-all duration-500 ${
                isActive
                  ? 'glass-dark bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border-cyan-500/50'
                  : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/30'
                    : 'bg-gray-900/20 border-gray-700/30'
              } border`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 pt-1">
                {isCompleted ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                ) : isActive ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse shadow-lg shadow-purple-500/50">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-600 bg-gray-900" />
                )}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-cyan-300' : isCompleted ? 'text-emerald-300' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">Overall Progress</span>
          <span className="text-xs font-bold text-cyan-300">
            {completedSteps} / {INFERENCE_STEPS.length}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/50"
            style={{ width: `${(completedSteps / INFERENCE_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
