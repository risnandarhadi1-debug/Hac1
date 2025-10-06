
import React, { useState, useMemo } from 'react';
import { generateCaricature } from './services/geminiService';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CaricatureDisplay } from './components/CaricatureDisplay';

export default function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('Exaggerate the facial features, big nose, big smile, and a comical hat.');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const originalImageUrl = useMemo(() => {
    return originalImageFile ? URL.createObjectURL(originalImageFile) : null;
  }, [originalImageFile]);

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerateClick = async () => {
    if (!originalImageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateCaricature(originalImageFile, prompt);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartOver = () => {
    setOriginalImageFile(null);
    setGeneratedImageUrl(null);
    setError(null);
    setIsLoading(false);
    // Optionally reset prompt:
    // setPrompt('Exaggerate the facial features, big nose, big smile, and a comical hat.');
  }

  const isGenerateDisabled = isLoading || !originalImageFile || !prompt.trim();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8 relative">
      <div className="container mx-auto">
        <Header />
        <main className="mt-8">
          {!originalImageFile ? (
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={null} />
          ) : (
            <div className="flex flex-col items-center gap-8">
              {generatedImageUrl && originalImageUrl ? (
                <>
                  <CaricatureDisplay
                    originalImageUrl={originalImageUrl}
                    generatedImageUrl={generatedImageUrl}
                  />
                  <button
                    onClick={handleStartOver}
                    className="mt-4 px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg text-lg"
                  >
                    Start Over
                  </button>
                </>
              ) : (
                <div className="w-full max-w-2xl relative">
                  {isLoading && <LoadingSpinner />}
                  <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                    <div className="w-full max-w-md mx-auto">
                      <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
                    </div>

                    <div className="mt-8 w-full">
                      <label htmlFor="prompt" className="block text-lg font-medium text-gray-300 mb-2">
                        Describe the caricature style
                      </label>
                      <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., make me a pirate with a parrot"
                        className="w-full h-28 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      />
                    </div>

                    {error && (
                      <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded-lg text-center">
                        {error}
                      </div>
                    )}

                    <div className="mt-6 text-center">
                      <button
                        onClick={handleGenerateClick}
                        disabled={isGenerateDisabled}
                        className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-extrabold text-xl rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                      >
                        {isLoading ? 'Creating...' : 'Generate Caricature'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
        <footer className="text-center text-gray-500 mt-12 pb-4">
            <p>Powered by Google Gemini's gemini-2.5-flash-image model.</p>
        </footer>
      </div>
    </div>
  );
}
