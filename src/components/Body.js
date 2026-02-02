import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Simulate loading with shimmer UI
    setTimeout(() => {
      setAllRestaurants(resObj);
      setFilteredRestaurants(resObj);
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
      console.log("CORS issue – using mock data instead");
      setAllRestaurants(resObj);
      setFilteredRestaurants(resObj);
    }
  }

  //conditional rendering - if restaurant is empty => shimmer ui
  return allRestaurants.length === 0 ? (
    <Shimmer/>
  ):(
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = allRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <button
          className="Search-btn"
          onClick={() => {
            const filtered = filteredRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurants(filtered);
          }}
        >
          Search
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
