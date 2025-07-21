import React, { useState, useEffect } from 'react';
import { ChefHat, Upload, BarChart3, Table, Brain, TrendingUp, Star, MapPin, Clock, DollarSign } from 'lucide-react';
import DataUpload from './components/DataUpload';
import ZomatoSummary from './components/ZomatoSummary';
import ZomatoVisualization from './components/ZomatoVisualization';
import ZomatoTable from './components/ZomatoTable';
import ZomatoInsights from './components/ZomatoInsights';
import { DatasetInfo } from './types';
import { 
  sampleZomatoData, 
  smallDataset, 
  mediumDataset, 
  largeDataset, 
  extraLargeDataset,
  generateCustomDataset,
  getDatasetStats 
} from './data/sampleData';

function App() {
  const [dataset, setDataset] = useState<any[]>(mediumDataset);
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'visualize' | 'table' | 'insights'>('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [datasetSize, setDatasetSize] = useState<'small' | 'medium' | 'large' | 'extra-large' | 'custom'>('medium');
  const [customSize, setCustomSize] = useState<number>(2500);

  useEffect(() => {
    // Auto-load sample data on startup
    if (mediumDataset.length > 0) {
      setDatasetInfo({
        name: 'Zomato Restaurant Dataset (Medium)',
        rows: mediumDataset.length,
        columns: Object.keys(mediumDataset[0] || {}).length,
        size: `${(JSON.stringify(mediumDataset).length / 1024).toFixed(2)} KB`,
        lastModified: new Date().toLocaleDateString()
      });
    }
  }, []);

  const handleDataUpload = (data: any[], fileName: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setDataset(data);
      setDatasetInfo({
        name: fileName,
        rows: data.length,
        columns: Object.keys(data[0] || {}).length,
        size: `${(JSON.stringify(data).length / 1024).toFixed(2)} KB`,
        lastModified: new Date().toLocaleDateString()
      });
      setActiveTab('overview');
      setIsProcessing(false);
    }, 1000);
  };

  const loadSampleData = () => {
    let dataToLoad;
    let datasetName;
    
    switch (datasetSize) {
      case 'small':
        dataToLoad = smallDataset;
        datasetName = 'Zomato Restaurant Dataset (Small - 100 restaurants)';
        break;
      case 'medium':
        dataToLoad = mediumDataset;
        datasetName = 'Zomato Restaurant Dataset (Medium - 1,000 restaurants)';
        break;
      case 'large':
        dataToLoad = largeDataset;
        datasetName = 'Zomato Restaurant Dataset (Large - 5,000 restaurants)';
        break;
      case 'extra-large':
        dataToLoad = extraLargeDataset;
        datasetName = 'Zomato Restaurant Dataset (Extra Large - 10,000 restaurants)';
        break;
      case 'custom':
        dataToLoad = generateCustomDataset(customSize);
        datasetName = `Zomato Restaurant Dataset (Custom - ${customSize.toLocaleString()} restaurants)`;
        break;
      default:
        dataToLoad = mediumDataset;
        datasetName = 'Zomato Restaurant Dataset';
    }
    
    handleDataUpload(dataToLoad, datasetName);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChefHat },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'visualize', label: 'Analytics', icon: BarChart3 },
    { id: 'table', label: 'Data Explorer', icon: Table },
    { id: 'insights', label: 'AI Insights', icon: Brain },
  ];

  const getQuickStats = () => {
    if (dataset.length === 0) return null;
    
    const avgRating = (dataset.reduce((sum, item) => sum + item.rating, 0) / dataset.length).toFixed(1);
    const avgCost = Math.round(dataset.reduce((sum, item) => sum + item.cost_for_two, 0) / dataset.length);
    const avgDeliveryTime = Math.round(dataset.reduce((sum, item) => sum + item.delivery_time, 0) / dataset.length);
    const totalVotes = dataset.reduce((sum, item) => sum + item.votes, 0);
    
    return { avgRating, avgCost, avgDeliveryTime, totalVotes };
  };

  const quickStats = getQuickStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-lg">
                  <ChefHat className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Zomato Analytics
                </h1>
                <p className="text-gray-600 text-sm">Restaurant Data Intelligence Platform</p>
              </div>
            </div>
            
            {quickStats && (
              <div className="hidden lg:flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-xl">
                  <Star className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-700">★{quickStats.avgRating}</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-xl">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-700">₹{quickStats.avgCost} Avg Cost</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-xl">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700">{dataset.length.toLocaleString()} Records</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-xl border-b border-orange-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 rounded-t-2xl ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform -translate-y-1'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-orange-500"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && dataset.length > 0 && datasetInfo && (
          <ZomatoSummary dataset={dataset} info={datasetInfo} />
        )}

        {activeTab === 'upload' && (
          <DataUpload onDataUpload={handleDataUpload} isProcessing={isProcessing} />
        )}

        {activeTab === 'visualize' && dataset.length > 0 && (
          <ZomatoVisualization dataset={dataset} />
        )}

        {activeTab === 'table' && dataset.length > 0 && (
          <ZomatoTable dataset={dataset} />
        )}

        {activeTab === 'insights' && dataset.length > 0 && (
          <ZomatoInsights dataset={dataset} />
        )}

        {activeTab === 'overview' && dataset.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Zomato Analytics</h3>
            <p className="text-gray-500 mb-6">Upload your restaurant data or explore our comprehensive datasets</p>
            
            <div className="max-w-md mx-auto mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Dataset Size</label>
              <select
                value={datasetSize}
                onChange={(e) => setDatasetSize(e.target.value as 'small' | 'medium' | 'large' | 'extra-large' | 'custom')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="small">Small Dataset (100 restaurants)</option>
                <option value="medium">Medium Dataset (1,000 restaurants)</option>
                <option value="large">Large Dataset (5,000 restaurants)</option>
                <option value="extra-large">Extra Large Dataset (10,000 restaurants)</option>
                <option value="custom">Custom Size</option>
              </select>
            </div>
            
            {datasetSize === 'custom' && (
              <div className="max-w-md mx-auto mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Dataset Size</label>
                <input
                  type="number"
                  min="100"
                  max="50000"
                  step="100"
                  value={customSize}
                  onChange={(e) => setCustomSize(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter number of restaurants"
                />
                <p className="text-xs text-gray-500 mt-1">Range: 100 - 50,000 restaurants</p>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={loadSampleData}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 block mx-auto"
              >
                Load {datasetSize === 'custom' ? `Custom (${customSize.toLocaleString()})` : datasetSize.charAt(0).toUpperCase() + datasetSize.slice(1)} Dataset
              </button>
              
              <p className="text-sm text-gray-500">
                {datasetSize === 'small' && 'Perfect for quick exploration and testing (100 restaurants)'}
                {datasetSize === 'medium' && 'Comprehensive dataset with diverse restaurants (1,000 restaurants)'}
                {datasetSize === 'large' && 'Extensive dataset for advanced analytics (5,000 restaurants)'}
                {datasetSize === 'extra-large' && 'Massive dataset for enterprise-level analysis (10,000 restaurants)'}
                {datasetSize === 'custom' && `Custom dataset with ${customSize.toLocaleString()} restaurants`}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;