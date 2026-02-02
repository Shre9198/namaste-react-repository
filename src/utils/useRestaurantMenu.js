import { useState, useEffect } from "react";
import resObj from "./mockData";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      // For now, using mock data. Later can integrate with API
      const restaurant = resObj.find((res) => res.info.id === resId);
      setResInfo(restaurant);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
