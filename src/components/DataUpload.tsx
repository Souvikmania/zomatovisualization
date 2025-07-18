import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface DataUploadProps {
  onDataUpload: (data: any[], fileName: string) => void;
  isProcessing: boolean;
}

const DataUpload: React.FC<DataUploadProps> = ({ onDataUpload, isProcessing }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      // Simple CSV parser
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',');
          const obj: any = {};
          headers.forEach((header, index) => {
            const value = values[index]?.trim() || '';
            obj[header] = isNaN(Number(value)) ? value : Number(value);
          });
          return obj;
        });

      onDataUpload(data, file.name);
    };
    
    reader.readAsText(file);
  }, [onDataUpload]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100">
      <div className="mb-6">
        <div className="relative mx-auto w-24 h-24 mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-75"></div>
          <div className="relative bg-white rounded-full p-4 border border-orange-200 shadow-lg">
            <Upload className="h-16 w-16 text-orange-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Restaurant Data</h2>
        <p className="text-gray-600">Upload your CSV file to begin comprehensive analysis</p>
      </div>

      <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 hover:border-orange-400 transition-all duration-300 bg-orange-50 hover:bg-orange-100">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          disabled={isProcessing}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer flex flex-col items-center ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FileText className="h-12 w-12 text-orange-500 mb-2" />
          <span className="text-lg font-medium text-gray-800">
            {isProcessing ? 'Processing...' : 'Choose CSV file'}
          </span>
          <span className="text-sm text-gray-600 mt-1">
            or drag and drop it here
          </span>
        </label>
      </div>

      <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 border border-orange-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 mr-2" />
          <div className="text-sm text-orange-800">
            <p className="font-medium mb-1">Zomato Sample Dataset Available</p>
            <p>Explore restaurant analytics with our curated Zomato dataset featuring ratings, costs, and delivery metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;