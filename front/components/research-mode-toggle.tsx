'use client';

import { Beaker } from 'lucide-react';
import { useCallback } from 'react';

interface ResearchModeToggleProps {
  isResearchMode: boolean;
  onToggle: (value: boolean) => void;
}

export function ResearchModeToggle({ isResearchMode, onToggle }: ResearchModeToggleProps) {
  const handleToggle = useCallback(() => {
    onToggle(!isResearchMode);
  }, [isResearchMode, onToggle]);

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg glass-dark border-blue-500/20 bg-blue-950/30 hover:bg-blue-950/50 transition-colors cursor-pointer group"
      onClick={handleToggle}
    >
      <Beaker className={`h-5 w-5 transition-colors ${isResearchMode ? 'text-purple-400' : 'text-gray-500'}`} />
      
      <div className="flex-grow">
        <p className="text-sm font-semibold text-gray-300 group-hover:text-gray-200">Research Mode</p>
        <p className="text-xs text-gray-500">
          {isResearchMode ? 'Showing detailed metrics' : 'Click to enable metrics'}
        </p>
      </div>

      {/* Toggle Switch */}
      <div
        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
          isResearchMode
            ? 'bg-gradient-to-r from-purple-600 to-purple-500'
            : 'bg-gray-700'
        }`}
      >
        <div
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
            isResearchMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    </div>
  );
}
