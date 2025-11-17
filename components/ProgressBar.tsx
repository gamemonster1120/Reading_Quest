
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, label }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const isComplete = percentage >= 100;

  return (
    <div>
        {label && <p className="text-sm font-semibold mb-1">{label}</p>}
        <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
        <div
            className={`h-4 rounded-full transition-all duration-500 ${isComplete ? 'bg-yellow-400' : 'bg-green-500'}`}
            style={{ width: `${percentage}%` }}
        >
            {isComplete && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 animate-pulse" />
            )}
        </div>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
            {value} / {max}
        </span>
        </div>
    </div>
  );
};

export default ProgressBar;
