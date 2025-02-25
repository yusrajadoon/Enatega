export const fetchRestaurants = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://api.example.com/restaurants?lat=${latitude}&lng=${longitude}`
    );
    return response.json();
  };
  