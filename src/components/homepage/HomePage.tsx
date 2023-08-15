import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../mutations/restaurantsMutation";

import styles from "./HomePage.module.css";
import Card from "./Card";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section className={styles.homeFlex}>
        <div>
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
        <div>
          <img src="./src/images/pratosHome.png" alt="" />
        </div>
      </section>
      <section className={styles.homeRestaurants}>
        <h3>Restaurants</h3>

        <ul>
          
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          data && data.getRestaurantAll ? (data.getRestaurantAll.map((restaurant: any) => (
            <Link className={styles.linkRestaurant} to={`/homepage/${restaurant.objectId}`}>
              <Card
                key={restaurant.objectId}
                name={restaurant.name}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
              />
            </Link>
          ))
          ):(
            <p>No restaurants available.</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default HomePage;
/*{
            data.restaurantAll.map((restaurant: any) => (
              <a href="">
                <li key={restaurant.objectId}>{restaurant.name}</li>
              </a>
            ))} */
/* {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.restaurantAll.map((restaurant: any) => (
            <a className={styles.linkRestaurant} href="">
              <Card
                key={restaurant.objectId}
                name={restaurant.name}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
              />
            </a>
          ))} */
