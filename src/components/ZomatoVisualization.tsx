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
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { BarChart3, PieChart, TrendingUp, MapPin } from 'lucide-react';

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

interface ZomatoVisualizationProps {
  dataset: any[];
}

const ZomatoVisualization: React.FC<ZomatoVisualizationProps> = ({ dataset }) => {
  const charts = useMemo(() => {
    if (dataset.length === 0) return [];

    // Cuisine Distribution
    const cuisineData = dataset.reduce((acc, item) => {
      const cuisine = item.cuisine || 'Unknown';
      acc[cuisine] = (acc[cuisine] || 0) + 1;
      return acc;
    }, {});

    const cuisineChart = {
      type: 'doughnut',
      title: 'Cuisine Distribution',
      icon: PieChart,
      data: {
        labels: Object.keys(cuisineData),
        datasets: [{
          data: Object.values(cuisineData),
          backgroundColor: [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
          ],
          borderWidth: 0,
        }]
      }
    };

    // Rating vs Cost Analysis
    const ratingCostChart = {
      type: 'scatter',
      title: 'Rating vs Cost Analysis',
      icon: TrendingUp,
      data: {
        labels: dataset.map(item => item.restaurant_name),
        datasets: [{
          label: 'Rating vs Cost',
          data: dataset.map(item => ({ x: item.cost_for_two, y: item.rating })),
          backgroundColor: 'rgba(255, 107, 107, 0.6)',
          borderColor: 'rgba(255, 107, 107, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
        }]
      }
    };

    // Location-wise Average Rating
    const locationRating = dataset.reduce((acc, item) => {
      const location = item.location || 'Unknown';
      if (!acc[location]) {
        acc[location] = { total: 0, count: 0 };
      }
      acc[location].total += (Number(item.rating) || 0);
      acc[location].count += 1;
      return acc;
    }, {});

    const locationChart = {
      type: 'bar',
      title: 'Average Rating by Location',
      icon: MapPin,
      data: {
        labels: Object.keys(locationRating),
        datasets: [{
          label: 'Average Rating',
          data: Object.values(locationRating).map((loc: any) => (loc.total / loc.count).toFixed(1)),
          backgroundColor: 'rgba(78, 205, 196, 0.8)',
          borderColor: 'rgba(78, 205, 196, 1)',
          borderWidth: 1,
          borderRadius: 8,
        }]
      }
    };

    // Delivery Time Distribution
    const deliveryTimeRanges = {
      '0-20 min': 0,
      '21-30 min': 0,
      '31-40 min': 0,
      '40+ min': 0
    };

    dataset.forEach(item => {
      const deliveryTime = Number(item.delivery_time) || 30;
      if (deliveryTime <= 20) deliveryTimeRanges['0-20 min']++;
      else if (deliveryTime <= 30) deliveryTimeRanges['21-30 min']++;
      else if (deliveryTime <= 40) deliveryTimeRanges['31-40 min']++;
      else deliveryTimeRanges['40+ min']++;
    });

    const deliveryChart = {
      type: 'pie',
      title: 'Delivery Time Distribution',
      icon: BarChart3,
      data: {
        labels: Object.keys(deliveryTimeRanges),
        datasets: [{
          data: Object.values(deliveryTimeRanges),
          backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
          borderWidth: 2,
          borderColor: '#fff',
        }]
      }
    };

    return [cuisineChart, locationChart, deliveryChart, ratingCostChart];
  }, [dataset]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#FF6B6B',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      }
    },
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#FF6B6B',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Cost: ₹${context.parsed.x}, Rating: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rating'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        title: {
          display: true,
          text: 'Cost for Two (₹)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      }
    },
  };

  const renderChart = (chart: any) => {
    switch (chart.type) {
      case 'bar':
        return <Bar data={chart.data} options={chartOptions} />;
      case 'line':
        return <Line data={chart.data} options={chartOptions} />;
      case 'pie':
        return <Pie data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />;
      case 'doughnut':
        return <Doughnut data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />;
      case 'scatter':
        return <Bar data={chart.data} options={scatterOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Analytics Dashboard</h2>
       <p className="text-gray-600">Visual insights from {dataset.length.toLocaleString()} restaurants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {charts.map((chart, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl mr-4">
                <chart.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{chart.title}</h3>
            </div>
            <div className="h-80">
              {renderChart(chart)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZomatoVisualization;