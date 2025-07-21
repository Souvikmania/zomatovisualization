import React, { useState } from 'react';
import { Search, SortAsc, SortDesc, Filter, Star, MapPin, Clock, DollarSign } from 'lucide-react';

interface ZomatoTableProps {
  dataset: any[];
}

const ZomatoTable: React.FC<ZomatoTableProps> = ({ dataset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCuisine, setFilterCuisine] = useState<string>('');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<string>('');
  const [costFilter, setCostFilter] = useState<string>('');

  if (dataset.length === 0) return null;

  const cuisines = [...new Set(dataset.map(item => item.cuisine))];
  const locations = [...new Set(dataset.map(item => item.location))];

  const filteredData = dataset.filter(row => {
    const matchesSearch = Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCuisine = !filterCuisine || row.cuisine === filterCuisine;
    const matchesLocation = !filterLocation || row.location === filterLocation;
    const matchesRating = !ratingFilter || 
      (ratingFilter === '4+' && row.rating >= 4.0) ||
      (ratingFilter === '3-4' && row.rating >= 3.0 && row.rating < 4.0) ||
      (ratingFilter === '<3' && row.rating < 3.0);
    const matchesCost = !costFilter ||
      (costFilter === 'budget' && row.cost_for_two <= 500) ||
      (costFilter === 'mid' && row.cost_for_two > 500 && row.cost_for_two <= 1000) ||
      (costFilter === 'premium' && row.cost_for_two > 1000);
    
    return matchesSearch && matchesCuisine && matchesLocation && matchesRating && matchesCost;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortDirection === 'asc') {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100';
    if (rating >= 4.0) return 'text-blue-600 bg-blue-100';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCostColor = (cost: number) => {
    if (cost >= 1000) return 'text-purple-600 bg-purple-100';
    if (cost >= 600) return 'text-blue-600 bg-blue-100';
    if (cost >= 400) return 'text-green-600 bg-green-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Data Explorer</h2>
        <p className="text-gray-600">Detailed view of {dataset.length.toLocaleString()} restaurants</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-orange-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Filters & Search</h3>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={250}>250 per page</option>
            </select>
            
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <select
              value={filterCuisine}
              onChange={(e) => setFilterCuisine(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredData.length.toLocaleString()} of {dataset.length.toLocaleString()}
              {searchTerm && <span className="ml-2 text-orange-600">(filtered)</span>}
            </div>
          </div>
          
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Ratings</option>
                <option value="4+">4.0+ Stars</option>
                <option value="3-4">3.0 - 4.0 Stars</option>
                <option value="<3">Below 3.0 Stars</option>
              </select>
              
              <select
                value={costFilter}
                onChange={(e) => setCostFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Price Ranges</option>
                <option value="budget">Budget (≤₹500)</option>
                <option value="mid">Mid-range (₹500-₹1000)</option>
                <option value="premium">Premium (₹1000+)</option>
              </select>
              
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCuisine('');
                  setFilterLocation('');
                  setRatingFilter('');
                  setCostFilter('');
                }}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
        {/* Performance indicator for large datasets */}
        {dataset.length > 5000 && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-3 border-b border-blue-200">
            <div className="flex items-center text-sm text-blue-700">
              <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Large dataset loaded ({dataset.length.toLocaleString()} restaurants) - Use filters for better performance</span>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
            <option value={250}>250 per page</option>
          </select>
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <tr>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => handleSort('restaurant_name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Restaurant</span>
                    {sortColumn === 'restaurant_name' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => handleSort('cuisine')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Cuisine</span>
                    {sortColumn === 'cuisine' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Rating</span>
                    {sortColumn === 'rating' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => handleSort('cost_for_two')}
                >
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Cost</span>
                    {sortColumn === 'cost_for_two' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                    {sortColumn === 'location' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => handleSort('delivery_time')}
                >
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Delivery</span>
                    {sortColumn === 'delivery_time' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Votes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{row.restaurant_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {row.cuisine}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center w-fit ${getRatingColor(row.rating)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {row.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCostColor(row.cost_for_two)}`}>
                      ₹{row.cost_for_two}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{row.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{row.delivery_time}m</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{row.votes.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, sortedData.length)} of {sortedData.length.toLocaleString()} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <span className="px-4 py-2 text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages.toLocaleString()}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZomatoTable;