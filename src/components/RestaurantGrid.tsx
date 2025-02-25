"use client";

import React from "react";

interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
}

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 mt-6">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 w-full sm:w-full md:w-[320px] lg:w-[350px] h-full flex flex-col"
        >
          {/* Image Section */}
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover"
          />

          {/* Content Section */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-xl text-gray-800">{restaurant.name}</h3>
            <p className="text-gray-600 text-sm flex-grow">{restaurant.description}</p>
            <p className="text-gray-500 text-xs">Lat: {restaurant.lat}, Lon: {restaurant.lng}</p>

            {/* View Details Button */}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantGrid;
