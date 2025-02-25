export async function fetchGraphQLRestaurants(latitude: number, longitude: number) {
    const query = `
      query Restaurants($latitude: Float, $longitude: Float) {
        nearByRestaurants(latitude: $latitude, longitude: $longitude) {
          restaurants {
            _id
            name
            image
            slug
            address
            location {
              coordinates
            }
            deliveryTime
            minimumOrder
            tax
            reviewData {
              total
              ratings
            }
            categories {
              _id
              title
            }
            rating
            isAvailable
            openingTimes {
              day
              times {
                startTime
                endTime
              }
            }
          }
        }
      }
    `;
  
    const response = await fetch("https://enatega-multivendor.up.railway.app/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { latitude, longitude } }),
    });
  
    const result = await response.json();
    return result.data.nearByRestaurants.restaurants;
  }
  