"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import RestaurantGrid from "./RestaurantGrid";
import { fetchGraphQLRestaurants } from "@/lib/fetchGraphQLRestaurants";

interface LocationBarProps {
  setLocation: (location: { lat: number; lng: number }) => void;
}

const LocationBar: React.FC<LocationBarProps> = ({ setLocation }) => {
  const [userLocation, setUserLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = `Lat: ${latitude}, Lon: ${longitude}`;
            setUserLocation(userLocation);
            setLocations((prev) => [...prev, userLocation]);
            setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            setUserLocation("Unable to retrieve location");
          }
        );
      } else {
        setUserLocation("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, [setLocation]);

  const handleFindRestaurants = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await fetchGraphQLRestaurants(latitude, longitude);
          setRestaurants(data);
          setShowRestaurants(true);
        } catch (err) {
          setError("Failed to fetch restaurants.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError("Error getting location: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-[#192A3E] py-6 flex flex-col items-center">
      {/* Container with White Background */}
      <div className="w-full max-w-3xl bg-white border border-black overflow-hidden shadow-md flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-2">
        {/* Left Section: Location Input */}
        <div className="flex items-center w-full md:w-auto space-x-2">
          <FaMapMarkerAlt className="text-gray-400 text-lg" />
          <input
            type="text"
            value={userLocation}
            placeholder="Enter Delivery Address"
            className="w-full md:w-64 outline-none text-gray-700 bg-transparent"
            readOnly
          />
          {/* Dropdown for locations */}
          <select className="ml-2 border border-gray-300 px-2 py-1 rounded">
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Right Section: Share Location & Find Restaurants */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <button className="flex items-center space-x-1 px-2 text-gray-500 hover:text-gray-700">
            
            <span>Share Location</span>
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleFindRestaurants}
          >
            {loading ? "Loading..." : "Find Restaurants"}
          </button>
        </div>
      </div>

      {/* Show Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Restaurant Grid Container */}
      {showRestaurants && (
        <div className="w-full max-w-6xl mt-6 px-4">
          <RestaurantGrid restaurants={restaurants} />
        </div>
      )}
    </div>
  );
};

export default LocationBar;
