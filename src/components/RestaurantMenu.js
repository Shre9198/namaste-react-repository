import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./shimmer";
import { useCart } from "../utils/CartContext";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);
    const { addItem } = useCart();

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage, areaName, city, avgRating, cloudinaryImageId } = resInfo?.info;
    const menuItems = resInfo?.menu?.items || [];

    const handleAddToCart = (item) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            restaurantName: name
        });

        // Show success feedback
        const button = document.getElementById(`add-to-cart-menu-${item.id}`);
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Added!';
            button.classList.add('bg-blue-500', 'hover:bg-blue-600');
            button.classList.remove('bg-green-500', 'hover:bg-green-600');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                button.classList.add('bg-green-500', 'hover:bg-green-600');
            }, 1500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">{name}</h1>
                {cloudinaryImageId && <img src={CDN_URL + cloudinaryImageId} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>📍 {areaName}, {city}</div>
                    <div>⭐ {avgRating}</div>
                    <div>💰 {costForTwoMessage}</div>
                    <div>🍽️ {cuisines?.join(", ")}</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                {menuItems.length > 0 ? (
                    <div className="space-y-4">
                        {menuItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">₹{item.price}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                                <button
                                    id={`add-to-cart-menu-${item.id}`}
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No menu items available</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
