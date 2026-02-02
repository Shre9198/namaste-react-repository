import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../utils/CartContext.js";

const ProductCard = ({ product, onAddToCart, onUpdateQuantity, quantity }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.unit}</p>
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-green-600">₹{product.price}</span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
        )}
      </div>
      {quantity === 0 ? (
        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
        >
          Add
        </button>
      ) : (
        <div className="flex items-center justify-between bg-gray-50 rounded-md p-1">
          <button
            onClick={() => onUpdateQuantity(product.id, Math.max(0, quantity - 1), 'decrement')}
            className="bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 border border-gray-300"
          >
            -
          </button>
          <span className="font-semibold text-gray-800">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1, 'increment')}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

const CategorySection = ({ title, products, onAddToCart, onUpdateQuantity, cart }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
            quantity={cart[product.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

const Instamart = () => {
  const navigate = useNavigate();
  const { cart, addItem, updateQuantity, incrementQuantity, decrementQuantity, getTotalItems } = useCart();


  const handleAddToCart = (productId) => {
    const product = categories
      .flatMap(cat => cat.products)
      .find(p => p.id === productId);

    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageId: product.image,
      });
    }
  };

  const handleUpdateQuantity = (productId, quantity, action) => {
    if (quantity === 0) {
      // Remove item if quantity is 0
      updateQuantity(productId, 0);
    } else if (action === 'increment') {
      // Directly increment the quantity
      incrementQuantity(productId);
    } else if (action === 'decrement') {
      // Directly decrement the quantity
      decrementQuantity(productId);
    } else {
      // For direct quantity setting
      updateQuantity(productId, quantity);
    }
  };

  const totalItems = getTotalItems();

  const categories = [
    {
      title: "Fresh Fruits",
      products: [
        { id: 1, name: "Apples", price: 120, unit: "500g", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=150" },
        { id: 2, name: "Bananas", price: 40, unit: "6 pcs", image: "https://th.bing.com/th/id/OIP.Ji1rlIbzuRqNEc9nBHEH3QHaGu?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 3, name: "Oranges", price: 80, unit: "1 kg", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=150" },
        { id: 4, name: "Grapes", price: 150, unit: "500g", image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=150" },
      ],
    },
    {
      title: "Fresh Vegetables",
      products: [
        { id: 5, name: "Tomatoes", price: 60, unit: "1 kg", image: "https://tse4.mm.bing.net/th/id/OIP.mrQpA0QUrP80zYDNumav-QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 6, name: "Onions", price: 30, unit: "1 kg", image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=150" },
        { id: 7, name: "Potatoes", price: 40, unit: "1 kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150" },
        { id: 8, name: "Carrots", price: 50, unit: "500g", image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=150" },
      ],
    },
    {
      title: "Dairy & Eggs",
      products: [
        { id: 9, name: "Milk", price: 65, unit: "1 L", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150" },
        { id: 10, name: "Cheese", price: 180, unit: "200g", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=150" },
        { id: 11, name: "Yogurt", price: 25, unit: "100g", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150" },
        { id: 12, name: "Eggs", price: 70, unit: "6 pcs", image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" },
      ],
    },
    {
      title: "Snacks & Beverages",
      products: [
        { id: 13, name: "Chips", price: 20, unit: "50g", image: "https://www.eatthis.com/wp-content/uploads/sites/4/2021/05/chips-2.jpg?quality=82&strip=1&resize=1600%2C900" },
        { id: 14, name: "Soda", price: 35, unit: "600ml", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150" },
        { id: 15, name: "Chocolate", price: 50, unit: "100g", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=150" },
        { id: 16, name: "Juice", price: 45, unit: "1 L", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=150" },
      ],
    },
  ];

  const cartMap = cart.items.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-red-500">Instamart</div>
              <div className="text-sm text-gray-600">by Swiggy</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Delivery in 30 mins</div>
              <button onClick={() => navigate('/cart')} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Cart ({totalItems})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Fresh groceries delivered fast!</h1>
          <p className="text-lg">Get farm-fresh produce and daily essentials at your doorstep</p>
        </div>

        {/* Categories */}
        {categories.map((category, index) => (
          <CategorySection
            key={index}
            title={category.title}
            products={category.products}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            cart={cartMap}
          />
        ))}
      </div>
    </div>
  );
};

export default Instamart;
 