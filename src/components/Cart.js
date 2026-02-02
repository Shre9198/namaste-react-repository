import { useRef, useEffect } from "react";
import { useCart } from "../utils/CartContext";
import { CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeItem, incrementQuantity, decrementQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const checkoutButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckout = () => {
      navigate('/checkout');
    };

    if (checkoutButtonRef.current) {
      checkoutButtonRef.current.addEventListener('click', handleCheckout);
    }

    return () => {
      if (checkoutButtonRef.current) {
        checkoutButtonRef.current.removeEventListener('click', handleCheckout);
      }
    };
  }, [navigate]);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some delicious items to your cart!</p>
          <a href="/" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <span className="text-gray-600">{getTotalItems()} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {item.imageId ? (
                      <img
                        src={CDN_URL + item.imageId}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    {item.cuisines && (
                      <p className="text-sm text-gray-600 mb-2">{item.cuisines.join(", ")}</p>
                    )}
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                      <span className="text-sm text-gray-500">per item</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-semibold border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} × ₹{item.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{(getTotalPrice() * 1.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button ref={checkoutButtonRef} className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors shadow-md hover:shadow-lg">
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Clear Cart
                </button>

                <a
                  href="/"
                  className="block w-full text-center text-orange-600 hover:text-orange-700 font-medium py-2"
                >
                  ← Continue Shopping
                </a>
              </div>

              {/* Promo Code Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Have a promo code?</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
