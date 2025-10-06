
import React from 'react';

interface CaricatureDisplayProps {
  originalImageUrl: string;
  generatedImageUrl: string;
}

export const CaricatureDisplay: React.FC<CaricatureDisplayProps> = ({ originalImageUrl, generatedImageUrl }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl mx-auto">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-gray-300 mb-4">Original</h3>
        <div className="aspect-square w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <img
            src={originalImageUrl}
            alt="Original"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Caricature</h3>
        <div className="aspect-square w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-yellow-500">
          <img
            src={generatedImageUrl}
            alt="Generated Caricature"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
