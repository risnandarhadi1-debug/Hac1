
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
}

const UploadIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-gray-500 mb-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg cursor-pointer hover:border-yellow-400 transition-all duration-300 border-2 border-dashed border-gray-600 flex items-center justify-center p-8 aspect-square"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded preview" className="max-h-full max-w-full object-contain rounded-lg" />
      ) : (
        <div className="text-center">
          <UploadIcon />
          <h3 className="text-xl font-semibold text-white">Click to upload an image</h3>
          <p className="text-sm text-gray-400 mt-1">PNG, JPG or WEBP</p>
        </div>
      )}
    </div>
  );
};
