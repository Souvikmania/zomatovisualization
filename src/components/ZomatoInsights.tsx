import React from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb, Target, Award } from 'lucide-react';

interface ZomatoInsightsProps {
  dataset: any[];
}

const ZomatoInsights: React.FC<ZomatoInsightsProps> = ({ dataset }) => {
  const generateInsights = () => {
    if (dataset.length === 0) return [];

    const insights = [];

    // Rating Analysis
    const avgRating = dataset.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / dataset.length;
    const highRatedCount = dataset.filter(item => (Number(item.rating) || 0) >= 4.0).length;
    const highRatedPercentage = ((highRatedCount / dataset.length) * 100).toFixed(1);

    insights.push({
      type: 'rating',
      title: 'Rating Performance',
      icon: Award,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      content: `${highRatedPercentage}% of restaurants have ratings above 4.0. The average rating across all restaurants is ${avgRating.toFixed(1)}.`,
      recommendation: 'Focus on improving service quality and food consistency to boost ratings.'
    });

    // Cost Analysis
    const avgCost = dataset.reduce((sum, item) => sum + (Number(item.cost_for_two) || 0), 0) / dataset.length;
    const expensiveCount = dataset.filter(item => (Number(item.cost_for_two) || 0) > avgCost).length;
    const budgetFriendlyCount = dataset.filter(item => (Number(item.cost_for_two) || 0) <= 500).length;

    insights.push({
      type: 'cost',
      title: 'Pricing Strategy',
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      content: `${budgetFriendlyCount} restaurants are budget-friendly (≤₹500). Average cost for two is ₹${Math.round(avgCost)}.`,
      recommendation: 'Consider offering value meals to capture the budget-conscious segment.'
    });

    // Delivery Time Analysis
    const avgDeliveryTime = dataset.reduce((sum, item) => sum + (Number(item.delivery_time) || 0), 0) / dataset.length;
    const fastDeliveryCount = dataset.filter(item => (Number(item.delivery_time) || 0) <= 25).length;
    const fastDeliveryPercentage = ((fastDeliveryCount / dataset.length) * 100).toFixed(1);

    insights.push({
      type: 'delivery',
      title: 'Delivery Efficiency',
      icon: Target,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      content: `${fastDeliveryPercentage}% of restaurants deliver within 25 minutes. Average delivery time is ${Math.round(avgDeliveryTime)} minutes.`,
      recommendation: 'Optimize kitchen operations and delivery routes to reduce wait times.'
    });

    // Cuisine Popularity
    const cuisineCount = dataset.reduce((acc, item) => {
      const cuisine = item.cuisine || 'Unknown';
      acc[cuisine] = (acc[cuisine] || 0) + 1;
      return acc;
    }, {});
    const topCuisine = Object.entries(cuisineCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    const cuisineVariety = Object.keys(cuisineCount).length;

    insights.push({
      type: 'cuisine',
      title: 'Market Trends',
      icon: Lightbulb,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      content: `${topCuisine[0]} is the most popular cuisine with ${topCuisine[1]} restaurants. Total cuisine variety: ${cuisineVariety} types.`,
      recommendation: 'Consider diversifying menu offerings or specializing in trending cuisines.'
    });

    // Location Analysis
    const locationCount = dataset.reduce((acc, item) => {
      const location = item.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});
    const topLocation = Object.entries(locationCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];

    insights.push({
      type: 'location',
      title: 'Geographic Distribution',
      icon: AlertCircle,
      color: 'from-red-400 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      content: `${topLocation[0]} has the highest concentration with ${topLocation[1]} restaurants. Market penetration varies significantly across locations.`,
      recommendation: 'Explore expansion opportunities in underserved locations with high demand.'
    });

    return insights;
  };

  const insights = generateInsights();

  const getCorrelationInsights = () => {
    if (dataset.length === 0) return [];

    // Rating vs Cost correlation
    const ratingCostCorr = calculateCorrelation(
      dataset.map(item => item.rating),
      dataset.map(item => item.cost_for_two)
    );

    // Rating vs Votes correlation
    const ratingVotesCorr = calculateCorrelation(
      dataset.map(item => item.rating),
      dataset.map(item => item.votes)
    );

    // Cost vs Delivery Time correlation
    const costDeliveryCorr = calculateCorrelation(
      dataset.map(item => item.cost_for_two),
      dataset.map(item => item.delivery_time)
    );

    return [
      {
        variables: 'Rating vs Cost',
        correlation: ratingCostCorr.toFixed(3),
        interpretation: Math.abs(ratingCostCorr) > 0.5 ? 'Strong' : Math.abs(ratingCostCorr) > 0.3 ? 'Moderate' : 'Weak',
        insight: ratingCostCorr > 0.3 ? 'Higher-priced restaurants tend to have better ratings' : 'Price doesn\'t strongly correlate with rating'
      },
      {
        variables: 'Rating vs Votes',
        correlation: ratingVotesCorr.toFixed(3),
        interpretation: Math.abs(ratingVotesCorr) > 0.5 ? 'Strong' : Math.abs(ratingVotesCorr) > 0.3 ? 'Moderate' : 'Weak',
        insight: ratingVotesCorr > 0.3 ? 'Better-rated restaurants receive more customer engagement' : 'Rating and customer engagement show weak correlation'
      },
      {
        variables: 'Cost vs Delivery Time',
        correlation: costDeliveryCorr.toFixed(3),
        interpretation: Math.abs(costDeliveryCorr) > 0.5 ? 'Strong' : Math.abs(costDeliveryCorr) > 0.3 ? 'Moderate' : 'Weak',
        insight: costDeliveryCorr > 0.3 ? 'Premium restaurants may have longer preparation times' : 'Cost and delivery time are not strongly related'
      }
    ];
  };

  const calculateCorrelation = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  };

  const correlations = getCorrelationInsights();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">AI-Powered Business Insights</h2>
        <p className="text-gray-600">Data-driven recommendations from {dataset.length.toLocaleString()} restaurants</p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className={`bg-gradient-to-br ${insight.bgColor} rounded-3xl p-8 border ${insight.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="flex items-start">
              <div className={`bg-gradient-to-r ${insight.color} p-3 rounded-xl mr-4 flex-shrink-0`}>
                <insight.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{insight.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{insight.content}</p>
                <div className="bg-white/70 rounded-xl p-4 border border-white/50">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                    Recommendation
                  </h4>
                  <p className="text-gray-700 text-sm">{insight.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Correlation Analysis */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Brain className="h-6 w-6 mr-3 text-purple-500" />
          Statistical Correlations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {correlations.map((corr, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">{corr.variables}</h4>
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${
                  Math.abs(parseFloat(corr.correlation)) > 0.5 ? 'text-green-600' :
                  Math.abs(parseFloat(corr.correlation)) > 0.3 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {corr.correlation}
                </div>
                <div className={`text-sm font-medium ${
                  corr.interpretation === 'Strong' ? 'text-green-600' :
                  corr.interpretation === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {corr.interpretation} Correlation
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center">{corr.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Target className="h-6 w-6 mr-3" />
          Strategic Action Items
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="font-semibold mb-3">Immediate Actions</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Optimize delivery times for restaurants exceeding 30 minutes</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Implement quality control measures for low-rated establishments</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Introduce budget-friendly menu options</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="font-semibold mb-3">Long-term Strategy</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Expand into underserved geographic markets</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Diversify cuisine offerings based on local preferences</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Develop premium dining partnerships</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZomatoInsights;