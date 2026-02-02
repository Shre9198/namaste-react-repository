import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Footer = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-red-400">🍽️ FoodVilla</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your ultimate destination for delicious food delivery. We bring the best restaurants
              right to your doorstep with lightning-fast service and unbeatable quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-2xl">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-2xl">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-2xl">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-2xl">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 FoodVilla. All rights reserved. Made with ❤️ for food lovers.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            User: {loggedInUser || "Guest"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
