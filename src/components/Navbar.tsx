'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Fetch location name from a geocoding service
        fetch(`https://api.example.com/geocode?lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            setCurrentLocation(data.locationName); // Assuming the API returns a locationName
          })
          .catch(error => console.error('Error fetching location:', error));
      });
    }
  }, []);

  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0 shadow-md">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-12 mr-4" />
        </div>

        {/* Center: Location Dropdown */}
        <div className="hidden md:flex items-center space-x-2 relative">
          <FaMapMarkerAlt className="text-black" />
          <span className="text-black">{currentLocation || 'Loading...'}</span>
          <button
            onClick={() => setLocationDropdownOpen(!isLocationDropdownOpen)}
            className="p-2 rounded text-black hover:bg-gray-600"
          >
            ⌄
          </button>
          {isLocationDropdownOpen && (
            <div className="absolute top-12 left-0 bg-white text-black p-4 rounded-md shadow-lg z-10">
              <ul>
                <li className="py-1">{currentLocation}</li>
                {/* Add more locations if needed */}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Login & Sign Up Buttons and Shopping Bag Icon */}
        <div className="flex items-center">
          <div className="flex space-x-4">
            <Link href="/login">
              <button className="rounded-2xl border border-black px-4 py-2 mr-2 text-black hover:bg-white hover:text-emerald-800">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="rounded-2xl bg-green-500 text-white px-4 py-2 hover:bg-green-600">
                Sign Up
              </button>
            </Link>
          </div>
          {/* Apply a small margin to the left of the icon */}
          <FaShoppingBag className="text-black ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
