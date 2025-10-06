
import React from 'react';

const BananaIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 inline-block mr-2 text-yellow-300"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.8,4.19c-1.3-1.33-3.37-1.56-4.95-0.54C10.5,4.6,9.15,5.82,8.68,7.31c-0.31,1-0.21,2.09,0.26,3 c0.94,1.83,2.94,2.98,5.08,2.98c0.59,0,1.17-0.08,1.72-0.24c2.2-0.64,3.85-2.6,4.19-4.88c0.16-1.12-0.08-2.2-0.69-3.1 C18.66,4.42,17.65,4.07,16.8,4.19z M16.63,11.23c-0.45,0.13-0.9,0.2-1.35,0.2c-1.68,0-3.26-0.89-4.04-2.38 c-0.24-0.46-0.3-0.96-0.19-1.45c0.35-1.16,1.4-2.12,2.58-2.45c1.23-0.34,2.59-0.1,3.58,0.89c0.47,0.47,0.7,1.08,0.75,1.72 C18.23,9.24,17.4,10.73,16.63,11.23z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
        <BananaIcon />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
          Nano Banana Caricature Maker
        </span>
      </h1>
      <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
        Turn your photos into hilarious caricatures with the power of AI. Just upload an image and describe the style!
      </p>
    </header>
  );
};
