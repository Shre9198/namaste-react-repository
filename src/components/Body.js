import RestaurantCard from "./RestaurantCard";
import SkeletonCard from "./SkeletonCard";
import resObj from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";

function filterData(searchText, restaurants) {
  const filteredData = restaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filteredData;
}

const Body = ({ user }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with shimmer UI
    setTimeout(() => {
      setAllRestaurants(resObj);
      setFilteredRestaurants(resObj);
      setIsLoading(false);
    }, 2000); // 2 seconds delay to show shimmer

    // If you later connect backend, you can enable this:
    // getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const data = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=26.7636521&lng=82.1465785&carousel=true&third_party_vendor=1"
      );
      const json = await data.json();

      const restaurants =
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (restaurants) {
        setAllRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      }
    } catch (error) {
      setAllRestaurants(resObj);
      setFilteredRestaurants(resObj);
    }
  }

  // Early return
  if (!allRestaurants) return null;
  if (allRestaurants.length === 0) return <h1>Loading...</h1>;

  // Conditional rendering - if restaurant is empty => shimmer ui
  return isLoading ? (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-purple-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="h-20 md:h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl mb-8 animate-pulse"></div>
            <div className="h-8 md:h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl mb-8 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-12 animate-pulse max-w-2xl mx-auto"></div>

            {/* Search Section Skeleton */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl animate-pulse"></div>
            </div>

            {/* Filter Buttons Skeleton */}
            <div className="flex flex-wrap justify-center gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 w-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl mb-4 animate-pulse max-w-md mx-auto"></div>
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg animate-pulse max-w-xs mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ff6b35 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #f7931e 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-purple-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fadeInUp leading-tight tracking-tight">
              Delicious Food
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 mb-8 font-semibold animate-fadeInUp animation-delay-200 leading-relaxed">
              Delivered Fast & Fresh
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-12 animate-fadeInUp animation-delay-300 max-w-2xl mx-auto">
              Craving something tasty? Order from your favorite restaurants and get it delivered to your doorstep in minutes!
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp animation-delay-400">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-6 py-4 pr-16 text-lg border-2 border-orange-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 shadow-xl bg-white/95 backdrop-blur-sm transition-all duration-300"
                  placeholder="Search for restaurants, cuisines..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const filtered = allRestaurants.filter((res) =>
                        res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        res.info.cuisines.some(cuisine =>
                          cuisine.toLowerCase().includes(searchText.toLowerCase())
                        )
                      );
                      setFilteredRestaurants(filtered);
                      setActiveFilter("search");
                    }
                  }}
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    const filtered = allRestaurants.filter((res) =>
                      res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
                      res.info.cuisines.some(cuisine =>
                        cuisine.toLowerCase().includes(searchText.toLowerCase())
                      )
                    );
                    setFilteredRestaurants(filtered);
                    setActiveFilter("search");
                  }}
                >
                  🔍 Search
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-600">
              <button
                className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                  activeFilter === 'topRated'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-4 ring-green-300 scale-105'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
                onClick={() => {
                  const filteredList = allRestaurants.filter(
                    (res) => res.info.avgRating > 4.2
                  );
                  setFilteredRestaurants(filteredList);
                  setActiveFilter('topRated');
                }}
              >
                🔥 Top Rated
              </button>
              <button
                className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                  activeFilter === 'fastDelivery'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white ring-4 ring-blue-300 scale-105'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                }`}
                onClick={() => {
                  const filteredList = allRestaurants.filter(
                    (res) => res.info.sla.deliveryTime < 25
                  );
                  setFilteredRestaurants(filteredList);
                  setActiveFilter('fastDelivery');
                }}
              >
                ⚡ Fast Delivery
              </button>
              <button
                className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                  activeFilter === 'budgetFriendly'
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white ring-4 ring-purple-300 scale-105'
                    : 'bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600'
                }`}
                onClick={() => {
                  const filteredList = allRestaurants.filter(
                    (res) => parseInt(res.info.costForTwo.replace('₹', '').split(' ')[0]) < 250
                  );
                  setFilteredRestaurants(filteredList);
                  setActiveFilter('budgetFriendly');
                }}
              >
                💰 Budget Friendly
              </button>
              <button
                className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white ring-4 ring-gray-400 scale-105'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                }`}
                onClick={() => {
                  setFilteredRestaurants(allRestaurants);
                  setActiveFilter('all');
                }}
              >
                🔄 All Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Favorite Restaurant
          </h2>
          <p className="text-lg text-gray-600">
            {filteredRestaurants.length} restaurants found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {filteredRestaurants.map((restaurant, index) => (
            <Link
              to={"/restaurants/" + restaurant.info.id}
              key={restaurant.info.id}
              className="no-underline transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <RestaurantCard resData={restaurant} user={user} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
