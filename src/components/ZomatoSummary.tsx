import React from 'react';
import { Star, MapPin, Clock, DollarSign, TrendingUp, Users, Award, Utensils } from 'lucide-react';
import { DatasetInfo } from '../types';

interface ZomatoSummaryProps {
  dataset: any[];
  info: DatasetInfo;
}

const ZomatoSummary: React.FC<ZomatoSummaryProps> = ({ dataset, info }) => {
  const getInsights = () => {
    if (dataset.length === 0) return {};
    
    const avgRating = dataset.reduce((sum, item) => sum + item.rating, 0) / dataset.length;
    const avgCost = dataset.reduce((sum, item) => sum + item.cost_for_two, 0) / dataset.length;
    const avgDeliveryTime = dataset.reduce((sum, item) => sum + item.delivery_time, 0) / dataset.length;
    const totalVotes = dataset.reduce((sum, item) => sum + item.votes, 0);
    
    const cuisineCount = dataset.reduce((acc, item) => {
      acc[item.cuisine] = (acc[item.cuisine] || 0) + 1;
      return acc;
    }, {});
    
    const locationCount = dataset.reduce((acc, item) => {
      acc[item.location] = (acc[item.location] || 0) + 1;
      return acc;
    }, {});
    
    const topCuisine = Object.entries(cuisineCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    const topLocation = Object.entries(locationCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    const highestRated = dataset.reduce((max, item) => item.rating > max.rating ? item : max);
    const mostExpensive = dataset.reduce((max, item) => item.cost_for_two > max.cost_for_two ? item : max);
    
    return {
      avgRating: avgRating.toFixed(1),
      avgCost: Math.round(avgCost),
      avgDeliveryTime: Math.round(avgDeliveryTime),
      totalVotes,
      topCuisine: topCuisine ? topCuisine[0] : 'N/A',
      topLocation: topLocation ? topLocation[0] : 'N/A',
      highestRated,
      mostExpensive,
      totalCuisines: Object.keys(cuisineCount).length,
      totalLocations: Object.keys(locationCount).length
    };
  };

  const insights = getInsights();

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Analytics Overview</h2>
          <p className="text-gray-600">Comprehensive insights from {info.rows.toLocaleString()} restaurants across {insights.totalLocations} cities</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{insights.avgRating}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{insights.avgCost}</div>
            <div className="text-sm text-gray-600">Avg Cost for Two</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{insights.avgDeliveryTime}m</div>
            <div className="text-sm text-gray-600">Avg Delivery</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{insights.totalVotes?.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Votes</div>
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="h-6 w-6 mr-3 text-orange-500" />
            Top Performers
          </h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Highest Rated</h4>
                  <p className="text-sm text-gray-600">{insights.highestRated?.restaurant_name}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-600">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="font-bold">{insights.highestRated?.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{insights.highestRated?.cuisine}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Premium Dining</h4>
                  <p className="text-sm text-gray-600">{insights.mostExpensive?.restaurant_name}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-bold">₹{insights.mostExpensive?.cost_for_two}</span>
                  </div>
                  <p className="text-xs text-gray-500">{insights.mostExpensive?.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 text-blue-500" />
            Market Overview
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <Utensils className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800">Popular Cuisine</h4>
                  <p className="text-sm text-gray-600">{insights.topCuisine}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{insights.totalCuisines}</div>
                <div className="text-xs text-gray-500">Total Cuisines</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800">Top Location</h4>
                  <p className="text-sm text-gray-600">{insights.topLocation}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">{insights.totalLocations}</div>
                <div className="text-xs text-gray-500">Total Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Info */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Dataset Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{info.rows}</div>
            <div className="text-orange-100">{info.rows.toLocaleString()} Restaurants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{info.columns}</div>
            <div className="text-orange-100">Attributes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{info.size}</div>
            <div className="text-orange-100">File Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{info.lastModified}</div>
            <div className="text-orange-100">Last Updated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZomatoSummary;