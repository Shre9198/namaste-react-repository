import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useCart } from "../utils/CartContext";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { getTotalItems } = useCart();
  const { user, isLoggedIn, logout } = useContext(UserContext);

  const menuItems = [
    { to: "/", icon: "🏠", label: "Home" },
    { to: "/about", icon: "ℹ️", label: "About" },
    { to: "/cart", icon: "🛒", label: "Cart", badge: getTotalItems() },
    { to: "/contact", icon: "📞", label: "Contact" },
    { to: "/grocery", icon: "🛍️", label: "Grocery" },
  ];

  return (
    <>
      {/* Main Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-4 shadow-xl sticky top-0 z-20 backdrop-blur-sm">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl focus:outline-none hover:scale-110 transition-transform duration-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-20"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <img
            className="w-32 h-16 object-contain drop-shadow-lg rounded-lg"
            src={LOGO_URL}
            alt="logo"
          />
        </div>

        {/* Online Status */}
        <div className="flex items-center gap-2 text-white font-semibold">
          <span className={`text-xl ${onlineStatus ? "animate-pulse" : ""}`}>
            {onlineStatus ? "🟢" : "🔴"}
          </span>
          <span className="hidden sm:block">{onlineStatus ? "Online" : "Offline"}</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white text-2xl hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>
          {isLoggedIn && (
            <div className="mt-4 text-white">
              <p className="text-sm opacity-90">Welcome back,</p>
              <p className="font-semibold">{user.name || "User"}</p>
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-semibold text-gray-700 group-hover:text-orange-600">
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsSidebarOpen(false)}
                className="block w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 shadow-lg text-center no-underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
