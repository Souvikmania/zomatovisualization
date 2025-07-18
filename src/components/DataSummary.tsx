import React from 'react';
import { BarChart3, Database, FileText, Calendar } from 'lucide-react';
import { DatasetInfo } from '../types';

interface DataSummaryProps {
  dataset: any[];
  info: DatasetInfo;
}

const DataSummary: React.FC<DataSummaryProps> = ({ dataset, info }) => {
  const getColumnTypes = () => {
    if (dataset.length === 0) return {};
    
    const types: { [key: string]: string } = {};
    const firstRow = dataset[0];
    
    Object.keys(firstRow).forEach(key => {
      const value = firstRow[key];
      types[key] = typeof value === 'number' ? 'Numeric' : 'Text';
    });
    
    return types;
  };

  const getBasicStats = () => {
    if (dataset.length === 0) return {};
    
    const numericColumns = Object.keys(dataset[0]).filter(key => 
      typeof dataset[0][key] === 'number'
    );
    
    const stats: { [key: string]: any } = {};
    
    numericColumns.forEach(column => {
      const values = dataset.map(row => row[column]).filter(val => !isNaN(val));
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      
      stats[column] = {
        mean: avg.toFixed(2),
        min,
        max,
        count: values.length
      };
    });
    
    return stats;
  };

  const columnTypes = getColumnTypes();
  const basicStats = getBasicStats();

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
        <Database className="h-6 w-6 mr-3 text-cyan-400" />
        Dataset Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-300">Rows</p>
              <p className="text-2xl font-bold text-white">{info.rows}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-6 border border-emerald-500/30">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-emerald-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-300">Columns</p>
              <p className="text-2xl font-bold text-white">{info.columns}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-purple-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-300">Size</p>
              <p className="text-2xl font-bold text-white">{info.size}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-300">Modified</p>
              <p className="text-sm font-bold text-white">{info.lastModified}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Column Types</h4>
          <div className="space-y-2">
            {Object.entries(columnTypes).map(([column, type]) => (
              <div key={column} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <span className="font-medium text-slate-200">{column}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  type === 'Numeric' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Basic Statistics</h4>
          <div className="space-y-2">
            {Object.entries(basicStats).map(([column, stats]: [string, any]) => (
              <div key={column} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="font-medium text-slate-200 mb-2">{column}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-300">Mean: <span className="font-semibold text-cyan-400">{stats.mean}</span></div>
                  <div className="text-slate-300">Count: <span className="font-semibold text-cyan-400">{stats.count}</span></div>
                  <div className="text-slate-300">Min: <span className="font-semibold text-cyan-400">{stats.min}</span></div>
                  <div className="text-slate-300">Max: <span className="font-semibold text-cyan-400">{stats.max}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSummary;