import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./HomePage.module.css";

import Card from "./Card";

import { GET_RESTAURANTS_ALL } from "../queries/restaurantsQuery";

interface Restaurant {
  objectId: string;
  name: string;
  rating: number;
  deliveryTime: string;
  isExpensive: boolean
  // outras propriedades do restaurante, se houver
}


interface RestaurantEdge {
  node: {
    objectId: string;
    name: string;
    rating: number;
    deliveryTime: string;
    isExpensive: boolean;
    // outras propriedades do restaurante, se houver
  };
}

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function lookRestaurants() {
      const endpoint = "https://parseapi.back4app.com/graphql";
      const headers = {
        "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
        "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
        "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.post(endpoint, GET_RESTAURANTS_ALL, {
          headers,
        });

        const responseData = response.data.data;
        const restaurantsData = responseData.fitMes.edges.map(
          (edge: RestaurantEdge) => edge.node
        );
        
        setRestaurants(restaurantsData);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }

    lookRestaurants();
  }, []);

  return (
    <>
      <section className={styles.homeFlex}>
        <div className={styles.homeImgEffect}>
          <img src="./src/images/UnionHome.png" alt="" />
        </div>
        <div className={styles.homeDescription}>
          <h2>
            Premium <span>quality</span>
          </h2>
          <h2>
            Food for your
            <img src="./src/images/bananaHome.png" alt="" />
            <span>healthy</span>
            <br />
            <img src="./src/images/macaHome.png" alt="" />
            <span>& Daily Life</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={styles.homeDishImgInfo}>
          <img src="./src/images/pratosHome.png" alt="" />
        </div>
      </section>
      <section className={styles.homeRestaurants}>
        <h3>Restaurants</h3>

        <ul>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant: Restaurant) => (
              <Link
              key={restaurant.objectId}
                className={styles.linkRestaurant}
                to={`/homepage/${restaurant.objectId}`}
              >
                <Card
                  
                  name={restaurant.name}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                />
              </Link>
            ))
          ) : (
            <p>No restaurants available.</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default HomePage;
