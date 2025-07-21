// Enhanced Zomato dataset with comprehensive restaurant data
export const sampleZomatoData = [
  // Premium Restaurants - Delhi
  {
    restaurant_name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.2,
    cost_for_two: 800,
    location: "Delhi",
    delivery_time: 35,
    votes: 1250
  },
  {
    restaurant_name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.5,
    cost_for_two: 1200,
    location: "Delhi",
    delivery_time: 40,
    votes: 1890
  },
  {
    restaurant_name: "Kebab Kingdom",
    cuisine: "Indian",
    rating: 4.1,
    cost_for_two: 500,
    location: "Delhi",
    delivery_time: 26,
    votes: 1123
  },
  {
    restaurant_name: "Tandoor Tales",
    cuisine: "Indian",
    rating: 4.4,
    cost_for_two: 750,
    location: "Delhi",
    delivery_time: 28,
    votes: 1567
  },
  {
    restaurant_name: "Street Food Central",
    cuisine: "Street Food",
    rating: 3.8,
    cost_for_two: 200,
    location: "Delhi",
    delivery_time: 20,
    votes: 1234
  },
  {
    restaurant_name: "The Great Kabab Factory",
    cuisine: "Indian",
    rating: 4.3,
    cost_for_two: 900,
    location: "Delhi",
    delivery_time: 32,
    votes: 2156
  },
  {
    restaurant_name: "Sakura Japanese Cuisine",
    cuisine: "Japanese",
    rating: 4.6,
    cost_for_two: 1400,
    location: "Delhi",
    delivery_time: 45,
    votes: 987
  },
  {
    restaurant_name: "Delhi Darbar",
    cuisine: "Indian",
    rating: 4.0,
    cost_for_two: 600,
    location: "Delhi",
    delivery_time: 30,
    votes: 1876
  },
  {
    restaurant_name: "Connaught Canteen",
    cuisine: "Multi-Cuisine",
    rating: 3.9,
    cost_for_two: 450,
    location: "Delhi",
    delivery_time: 25,
    votes: 743
  },
  {
    restaurant_name: "Karim's",
    cuisine: "Mughlai",
    rating: 4.2,
    cost_for_two: 400,
    location: "Delhi",
    delivery_time: 35,
    votes: 3456
  }
];

// Comprehensive data for large dataset generation
const restaurantNames = [
  // Indian Names
  "Spice Route", "Curry House", "Tandoor Express", "Masala Magic", "Biryani Palace",
  "Dosa Corner", "Chaat Street", "Punjabi Dhaba", "South Spice", "Royal Kitchen",
  "Golden Spoon", "Saffron Dreams", "Maharaja's Table", "Spice Garden", "Curry Express",
  "Tandoor Tales", "Masala Junction", "Biryani House", "Dosa Delight", "Chaat Central",
  
  // International Names
  "Pizza Corner", "Burger Barn", "Sushi Zen", "Pasta Palace", "Taco Fiesta",
  "Noodle House", "BBQ Pit", "Grill Master", "Smoothie Station", "Coffee Culture",
  "Mediterranean Magic", "Thai Spice", "Chinese Dragon", "Korean Kitchen", "Vietnamese Pho",
  "Italian Bistro", "French Cafe", "Spanish Tapas", "Greek Taverna", "Turkish Delight",
  
  // Fusion & Modern
  "Urban Kitchen", "Modern Bistro", "Fusion Factory", "Global Grill", "World Cuisine",
  "Metro Meals", "City Bites", "Downtown Diner", "Uptown Eats", "Central Kitchen",
  "Fresh & Fast", "Quick Bites", "Healthy Hub", "Organic Oasis", "Green Garden",
  
  // Premium & Fine Dining
  "The Royal Table", "Elite Dining", "Premium Palace", "Luxury Lounge", "Grand Gourmet",
  "Exquisite Eats", "Fine Flavors", "Elegant Eatery", "Sophisticated Spice", "Classy Cuisine"
];

const cuisineTypes = [
  // Indian Cuisines
  "North Indian", "South Indian", "Punjabi", "Gujarati", "Rajasthani", "Bengali", 
  "Maharashtrian", "Hyderabadi", "Chettinad", "Mughlai", "Awadhi", "Kashmiri",
  "Goan", "Assamese", "Bihari", "Odia", "Manipuri", "Naga",
  
  // International Cuisines
  "Chinese", "Italian", "Mexican", "Thai", "Japanese", "Korean", "Vietnamese",
  "American", "Continental", "Mediterranean", "Lebanese", "Greek", "Turkish",
  "French", "Spanish", "German", "Russian", "Brazilian", "Peruvian",
  "Ethiopian", "Moroccan", "Egyptian", "Iranian", "Afghan", "Nepalese",
  
  // Specialty Categories
  "Fast Food", "Street Food", "Healthy", "Vegan", "Vegetarian", "Seafood",
  "Barbecue", "Desserts", "Bakery", "Cafe", "Ice Cream", "Beverages",
  "Multi-Cuisine", "Fusion", "Organic", "Gluten-Free"
];

const indianCities = [
  // Tier 1 Cities
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad",
  
  // Tier 2 Cities
  "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
  "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur",
  "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad",
  "Tiruchirappalli", "Bareilly", "Mysore", "Tiruppur", "Gurgaon", "Aligarh",
  "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Guntur", "Bhiwandi", "Saharanpur",
  "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack",
  "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol"
];

const restaurantPrefixes = [
  "The", "Royal", "Golden", "Spice", "Taste", "Flavor", "Aroma", "Delicious",
  "Fresh", "Urban", "Classic", "Modern", "Traditional", "Authentic", "Premium",
  "Elite", "Grand", "Supreme", "Divine", "Heavenly", "Exotic", "Unique",
  "Special", "Famous", "Popular", "Favorite", "Best", "Top", "Star",
  "Crown", "Palace", "Empire", "Kingdom", "Castle", "Manor", "Villa"
];

const restaurantSuffixes = [
  "Kitchen", "Bistro", "Cafe", "Restaurant", "Grill", "House", "Corner",
  "Palace", "Garden", "Express", "Junction", "Hub", "Station", "Point", "Zone",
  "Lounge", "Bar", "Diner", "Eatery", "Place", "Spot", "Nook", "Den",
  "Club", "Center", "Plaza", "Square", "Court", "Lane", "Street", "Avenue",
  "Factory", "Studio", "Workshop", "Lab", "Gallery", "Boutique"
];

// Enhanced function to generate realistic restaurant data
export const generateLargeDataset = (baseSize: number = 5000): any[] => {
  const generatedData = [];
  
  // Add original sample data
  generatedData.push(...sampleZomatoData);
  
  for (let i = 0; i < baseSize; i++) {
    const cuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)];
    const location = indianCities[Math.floor(Math.random() * indianCities.length)];
    
    // Generate restaurant name based on cuisine
    let restaurantName;
    if (Math.random() < 0.3) {
      // Use predefined names
      restaurantName = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
    } else {
      // Generate new names
      const prefix = restaurantPrefixes[Math.floor(Math.random() * restaurantPrefixes.length)];
      const suffix = restaurantSuffixes[Math.floor(Math.random() * restaurantSuffixes.length)];
      
      if (Math.random() < 0.5) {
        restaurantName = `${prefix} ${cuisine} ${suffix}`;
      } else {
        restaurantName = `${prefix} ${suffix}`;
      }
    }
    
    // Generate realistic ratings with normal distribution
    const baseRating = 3.5 + (Math.random() * 1.5); // 3.5 to 5.0 base
    const rating = Math.max(2.0, Math.min(5.0, baseRating + (Math.random() - 0.5) * 0.8));
    
    // Generate cost based on cuisine and location
    let baseCost = 300;
    
    // Adjust cost based on cuisine
    if (['Japanese', 'Italian', 'French', 'Mediterranean'].includes(cuisine)) {
      baseCost = 800;
    } else if (['Chinese', 'Thai', 'Korean', 'Continental'].includes(cuisine)) {
      baseCost = 600;
    } else if (['North Indian', 'South Indian', 'Punjabi'].includes(cuisine)) {
      baseCost = 400;
    } else if (['Street Food', 'Fast Food', 'Cafe'].includes(cuisine)) {
      baseCost = 250;
    }
    
    // Adjust cost based on location (tier 1 cities are more expensive)
    const tier1Cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];
    if (tier1Cities.includes(location)) {
      baseCost *= 1.3;
    }
    
    const costVariation = 0.5 + Math.random(); // 0.5x to 1.5x variation
    const cost_for_two = Math.round(baseCost * costVariation / 50) * 50; // Round to nearest 50
    
    // Generate delivery time based on location and cost
    let baseDeliveryTime = 25;
    if (cost_for_two > 1000) baseDeliveryTime = 35; // Premium restaurants take longer
    if (cuisine === 'Fast Food') baseDeliveryTime = 15;
    
    const delivery_time = Math.max(10, Math.min(60, 
      baseDeliveryTime + Math.floor((Math.random() - 0.5) * 20)
    ));
    
    // Generate votes based on rating and age (simulated)
    const baseVotes = Math.floor(50 + Math.random() * 2000);
    const ratingMultiplier = rating > 4.0 ? 1.5 : rating > 3.5 ? 1.2 : 0.8;
    const votes = Math.floor(baseVotes * ratingMultiplier);
    
    const restaurant = {
      restaurant_name: restaurantName,
      cuisine: cuisine,
      rating: parseFloat(rating.toFixed(1)),
      cost_for_two: cost_for_two,
      location: location,
      delivery_time: delivery_time,
      votes: votes
    };
    
    generatedData.push(restaurant);
  }
  
  return generatedData;
};

// Generate different sized datasets
export const smallDataset = generateLargeDataset(100);
export const mediumDataset = generateLargeDataset(1000);
export const largeDataset = generateLargeDataset(5000);
export const extraLargeDataset = generateLargeDataset(10000);

// Export the medium dataset as default for backward compatibility
export const largeZomatoDataset = mediumDataset;

// Function to generate custom sized dataset
export const generateCustomDataset = (size: number) => {
  return generateLargeDataset(size);
};

// Dataset statistics for reference
export const getDatasetStats = (dataset: any[]) => {
  if (dataset.length === 0) return null;
  
  const cuisines = [...new Set(dataset.map(item => item.cuisine))];
  const locations = [...new Set(dataset.map(item => item.location))];
  const avgRating = dataset.reduce((sum, item) => sum + item.rating, 0) / dataset.length;
  const avgCost = dataset.reduce((sum, item) => sum + item.cost_for_two, 0) / dataset.length;
  const totalVotes = dataset.reduce((sum, item) => sum + item.votes, 0);
  
  return {
    totalRestaurants: dataset.length,
    uniqueCuisines: cuisines.length,
    uniqueLocations: locations.length,
    averageRating: avgRating.toFixed(2),
    averageCost: Math.round(avgCost),
    totalVotes: totalVotes,
    cuisineList: cuisines.sort(),
    locationList: locations.sort()
  };
};