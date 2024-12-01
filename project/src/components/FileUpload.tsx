import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full max-w-md p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
    >
      <div className="flex flex-col items-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <label className="cursor-pointer">
          <span className="text-blue-500 hover:text-blue-600">Choose a file</span>
          <span className="text-gray-500"> or drag it here</span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileInput}
          />
        </label>
      </div>
    </div>
  );
}