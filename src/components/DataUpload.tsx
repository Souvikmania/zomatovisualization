import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';

interface DataUploadProps {
  onDataUpload: (data: any[], fileName: string) => void;
  isProcessing: boolean;
}

const DataUpload: React.FC<DataUploadProps> = ({ onDataUpload, isProcessing }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Use PapaParse for robust CSV parsing
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => {
        // Clean and normalize header names
        return header.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
      },
      transform: (value: string, header: string) => {
        // Clean the value
        const cleanValue = value.trim();
        
        // Handle empty values
        if (!cleanValue || cleanValue === '' || cleanValue === 'null' || cleanValue === 'undefined') {
          return '';
        }
        
        // Try to convert to number if it looks like a number
        if (/^-?\d*\.?\d+$/.test(cleanValue)) {
          const numValue = parseFloat(cleanValue);
          return isNaN(numValue) ? cleanValue : numValue;
        }
        
        // Handle boolean-like values
        if (cleanValue.toLowerCase() === 'true') return true;
        if (cleanValue.toLowerCase() === 'false') return false;
        
        // Return as string
        return cleanValue;
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors);
        }
        
        // Filter out empty rows and validate data
        const validData = results.data.filter((row: any) => {
          // Check if row has at least some non-empty values
          return Object.values(row).some(value => 
            value !== null && value !== undefined && value !== ''
          );
        });
        
        if (validData.length === 0) {
          alert('No valid data found in the CSV file. Please check the file format.');
          return;
        }
        
        // Map common column names to expected format
        const mappedData = validData.map((row: any) => {
          const mappedRow: any = {};
          
          // Map common variations of column names
          Object.keys(row).forEach(key => {
            const lowerKey = key.toLowerCase();
            let mappedKey = key;
            
            // Restaurant name variations
            if (lowerKey.includes('restaurant') || lowerKey.includes('name')) {
              mappedKey = 'restaurant_name';
            }
            // Rating variations
            else if (lowerKey.includes('rating') || lowerKey.includes('score')) {
              mappedKey = 'rating';
            }
            // Cost variations
            else if (lowerKey.includes('cost') || lowerKey.includes('price')) {
              mappedKey = 'cost_for_two';
            }
            // Location variations
            else if (lowerKey.includes('location') || lowerKey.includes('city') || lowerKey.includes('area')) {
              mappedKey = 'location';
            }
            // Cuisine variations
            else if (lowerKey.includes('cuisine') || lowerKey.includes('food_type') || lowerKey.includes('category')) {
              mappedKey = 'cuisine';
            }
            // Delivery time variations
            else if (lowerKey.includes('delivery') && lowerKey.includes('time')) {
              mappedKey = 'delivery_time';
            }
            // Votes variations
            else if (lowerKey.includes('votes') || lowerKey.includes('reviews') || lowerKey.includes('count')) {
              mappedKey = 'votes';
            }
            
            mappedRow[mappedKey] = row[key];
          });
          
          // Ensure numeric fields are properly converted
          if (mappedRow.rating && typeof mappedRow.rating === 'string') {
            const rating = parseFloat(mappedRow.rating);
            mappedRow.rating = isNaN(rating) ? 0 : Math.min(5, Math.max(0, rating));
          }
          
          if (mappedRow.cost_for_two && typeof mappedRow.cost_for_two === 'string') {
            const cost = parseFloat(mappedRow.cost_for_two.replace(/[^\d.]/g, ''));
            mappedRow.cost_for_two = isNaN(cost) ? 0 : cost;
          }
          
          if (mappedRow.delivery_time && typeof mappedRow.delivery_time === 'string') {
            const time = parseFloat(mappedRow.delivery_time.replace(/[^\d.]/g, ''));
            mappedRow.delivery_time = isNaN(time) ? 30 : time;
          }
          
          if (mappedRow.votes && typeof mappedRow.votes === 'string') {
            const votes = parseInt(mappedRow.votes.replace(/[^\d]/g, ''));
            mappedRow.votes = isNaN(votes) ? 0 : votes;
          }
          
          // Set default values for missing fields
          mappedRow.restaurant_name = mappedRow.restaurant_name || 'Unknown Restaurant';
          mappedRow.cuisine = mappedRow.cuisine || 'Multi-Cuisine';
          mappedRow.location = mappedRow.location || 'Unknown Location';
          mappedRow.rating = mappedRow.rating || 0;
          mappedRow.cost_for_two = mappedRow.cost_for_two || 0;
          mappedRow.delivery_time = mappedRow.delivery_time || 30;
          mappedRow.votes = mappedRow.votes || 0;
          
          return mappedRow;
        });
        
        console.log('Parsed CSV data:', mappedData.slice(0, 5)); // Log first 5 rows for debugging
        onDataUpload(mappedData, file.name);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        alert('Error parsing CSV file. Please check the file format and try again.');
      }
    });
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
            <p className="font-medium mb-1">CSV Format Requirements</p>
            <p>Your CSV should include columns like: restaurant_name, cuisine, rating, cost_for_two, location, delivery_time, votes. The system will automatically map common column name variations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;