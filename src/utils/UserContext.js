import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Dummy name",
    email: "Dummy@gmail.com",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, always succeed if email and password are provided
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Simulate successful login
      console.log("Setting isLoggedIn to true");
      setIsLoggedIn(true);
      const displayName = email.split('@')[0]; // Use email prefix as display name
      setUser({ name: displayName, email });
      return { success: true };

    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate validation
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (name.length < 2) {
        throw new Error("Name must be at least 2 characters");
      }

      // Simulate successful signup and login
      setIsLoggedIn(true);
      setUser({ name, email });
      return { success: true };

    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ name: "Dummy name", email: "Dummy@gmail.com" });
    setError(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn,
      loading,
      error,
      login,
      signup,
      logout,
      clearError: () => setError(null)
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
