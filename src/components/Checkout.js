import { useCart } from "../utils/CartContext";
import { CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Checkout = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    paymentMethod: 'card'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    console.log('Place Order button clicked');
    console.log('Form data:', formData);
    console.log('Cart items:', cart.items);

    // Validate form
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.address.trim()) {
      console.log('Validation failed - missing required fields');
      alert('Please fill in all required fields');
      return;
    }

    console.log('Validation passed, processing order');

    // Process order
    const orderDetails = {
      items: [...cart.items], // Create a copy to preserve cart items for success page
      total: getTotalPrice() * 1.05,
      deliveryAddress: { ...formData },
      paymentMethod: formData.paymentMethod,
      orderId: 'ORD-' + Date.now()
    };

    console.log('Order details created:', orderDetails);

    // Set order details and success state FIRST
    setOrderDetails(orderDetails);
    setOrderPlaced(true);

    // Clear cart AFTER success state is set
    setTimeout(() => {
      clearCart();
    }, 100);

    console.log('Order placed successfully');
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600">Thank you for your order. Your delicious food is on the way!</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                {orderDetails.orderId}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Items Ordered</h3>
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({orderDetails.items.length} items)</span>
                  <span>₹{(orderDetails.total / 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (5%)</span>
                  <span>₹{(orderDetails.total - orderDetails.total / 1.05).toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span>₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Delivery Address</h4>
                <div className="text-gray-600">
                  <p className="font-medium">{orderDetails.deliveryAddress.fullName}</p>
                  <p>{orderDetails.deliveryAddress.phoneNumber}</p>
                  <p>{orderDetails.deliveryAddress.address}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Payment Method</h4>
                <p className="text-gray-600 capitalize">{orderDetails.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some delicious items to your cart before checkout!</p>
          <button
            onClick={() => navigate('/cart')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <span className="text-gray-600">{getTotalItems()} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
            {cart.items.map((item) => (
              <div key={item.id} className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  {/* Item Image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    {item.cuisines && (
                      <p className="text-sm text-gray-600">{item.cuisines.join(", ")}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                      <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

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

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Place Order
              </button>
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <textarea
                  name="address"
                  placeholder="Address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
