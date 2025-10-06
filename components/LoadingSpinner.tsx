
import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Generating your masterpiece...' }) => {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-semibold animate-pulse-fast">{message}</p>
    </div>
  );
};
