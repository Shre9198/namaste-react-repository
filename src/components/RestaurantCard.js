import { CDN_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { useCart } from "../utils/CartContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { info } = resData;
  const { user, isLoggedIn } = useContext(UserContext);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    console.log("isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
      alert("Oops! Please login to add items to cart.");
      return;
    }
    const priceString = info.costForTwo.replace('₹', '').split(' ')[0];
    const price = parseInt(priceString) / 2;
    const itemToAdd = {
      id: info.id,
      name: info.name,
      price: price,
      imageId: info.cloudinaryImageId,
      cuisines: info.cuisines
    };
    console.log("Adding item to cart:", itemToAdd);
    addItem(itemToAdd);

    // Show success feedback
    const button = document.getElementById(`add-to-cart-${info.id}`);
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '✓ Added!';
      button.classList.add('bg-green-500', 'hover:bg-green-600');
      button.classList.remove('bg-orange-500', 'hover:bg-orange-600');

      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-green-500', 'hover:bg-green-600');
        button.classList.add('bg-orange-500', 'hover:bg-orange-600');
      }, 1500);
    }
  };

  // Get cuisine icon based on cuisine type
  const getCuisineIcon = (cuisine) => {
    const cuisineLower = cuisine.toLowerCase();
    if (cuisineLower.includes('pizza')) return '🍕';
    if (cuisineLower.includes('burger') || cuisineLower.includes('american')) return '🍔';
    if (cuisineLower.includes('ice cream') || cuisineLower.includes('dessert')) return '🍦';
    if (cuisineLower.includes('chinese')) return '🥢';
    if (cuisineLower.includes('indian')) return '🍛';
    if (cuisineLower.includes('italian')) return '🍝';
    return '🍽️';
  };

  const isTopRated = info.avgRating > 4.2;
  const isTrending = info.avgRating > 4.0 && info.sla.deliveryTime < 30;

  return (
    <div className="w-80 bg-white rounded-3xl overflow-hidden shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-4 hover:scale-105 cursor-pointer border border-gray-100 group">
      <div className="relative">
        <img
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          alt="res-logo"
          src={CDN_URL + info?.cloudinaryImageId}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Rating Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
          info.avgRating > 4.2
            ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
            : 'bg-white/90 text-gray-800'
        }`}>
          ⭐ {info.avgRatingString}
        </div>

        {/* Top Rated Badge */}
        {isTopRated && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            🔥 TOP RATED
          </div>
        )}

        {/* Trending Badge */}
        {isTrending && !isTopRated && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            📈 TRENDING
          </div>
        )}

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-2 truncate drop-shadow-lg">{info.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-200 font-medium">
              {getCuisineIcon(info.cuisines[0])} {info.cuisines.slice(0, 2).join(", ")}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-200">
            <span className="flex items-center gap-1">
              <span>⏱️</span> {info.sla.deliveryTime} mins
            </span>
            <span className="flex items-center gap-1">
              <span>💰</span> {info.costForTwo}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            📍 {info.areaName}
          </span>
          <span className="text-xs text-gray-500">
            User: {user.name || "Guest"}
          </span>
        </div>

        <button
          id={`add-to-cart-${info.id}`}
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl font-bold text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
