import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DataVisualizationProps {
  dataset: any[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ dataset }) => {
  const charts = useMemo(() => {
    if (dataset.length === 0) return [];

    const numericColumns = Object.keys(dataset[0]).filter(key => 
      typeof dataset[0][key] === 'number'
    );
    
    const textColumns = Object.keys(dataset[0]).filter(key => 
      typeof dataset[0][key] === 'string'
    );

    const charts = [];

    // Bar Chart - Distribution of categorical data
    if (textColumns.length > 0 && numericColumns.length > 0) {
      const categoryColumn = textColumns[0];
      const valueColumn = numericColumns[0];
      
      const categoryData = dataset.reduce((acc, row) => {
        const category = row[categoryColumn];
        const value = row[valueColumn];
        
        if (!acc[category]) {
          acc[category] = { total: 0, count: 0 };
        }
        acc[category].total += value;
        acc[category].count += 1;
        
        return acc;
      }, {});

      const labels = Object.keys(categoryData);
      const data = labels.map(label => categoryData[label].total / categoryData[label].count);

      charts.push({
        type: 'bar',
        title: `Average ${valueColumn} by ${categoryColumn}`,
        icon: BarChart3,
        data: {
          labels,
          datasets: [{
            label: `Average ${valueColumn}`,
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          }]
        }
      });
    }

    // Line Chart - Trend over index
    if (numericColumns.length > 0) {
      const valueColumn = numericColumns[0];
      const labels = dataset.map((_, index) => `Row ${index + 1}`);
      const data = dataset.map(row => row[valueColumn]);

      charts.push({
        type: 'line',
        title: `${valueColumn} Trend`,
        icon: LineChart,
        data: {
          labels,
          datasets: [{
            label: valueColumn,
            data,
            borderColor: 'rgba(20, 184, 166, 1)',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            tension: 0.1,
          }]
        }
      });
    }

    // Pie Chart - Distribution of categorical data
    if (textColumns.length > 0) {
      const categoryColumn = textColumns[0];
      const categoryCount = dataset.reduce((acc, row) => {
        const category = row[categoryColumn];
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(categoryCount);
      const data = Object.values(categoryCount);
      const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(20, 184, 166, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
      ];

      charts.push({
        type: 'pie',
        title: `Distribution of ${categoryColumn}`,
        icon: PieChart,
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.8', '1')),
            borderWidth: 1,
          }]
        }
      });
    }

    return charts;
  }, [dataset]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderChart = (chart: any) => {
    switch (chart.type) {
      case 'bar':
        return <Bar data={chart.data} options={chartOptions} />;
      case 'line':
        return <Line data={chart.data} options={chartOptions} />;
      case 'pie':
        return <Pie data={chart.data} options={{ responsive: true }} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
        <BarChart3 className="h-6 w-6 mr-3 text-cyan-400" />
        Data Visualizations
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <chart.icon className="h-5 w-5 text-cyan-400 mr-2" />
              <h4 className="text-lg font-semibold text-white">{chart.title}</h4>
            </div>
            <div className="h-64 bg-slate-800/50 rounded-lg p-4">
              {renderChart(chart)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataVisualization;