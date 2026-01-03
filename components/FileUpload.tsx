
import React, { useState, useCallback, useRef } from 'react';
import { UploadCloudIcon } from './icons/Icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  title?: string;
  description?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
    onFileSelect, 
    title = "Upload your PDF", 
    description = "Drag and drop your file here, or click to browse." 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if(files[0].type === "application/pdf") {
        onFileSelect(files[0]);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  }, [onFileSelect]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
       if(files[0].type === "application/pdf") {
        onFileSelect(files[0]);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
        ${isDragging ? 'border-accent bg-orange-50 dark:bg-orange-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-accent'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadCloudIcon className="w-10 h-10 mb-3 text-gray-400" />
        <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};
