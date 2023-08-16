import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./Restaurant.module.css";

import Cart from "./Cart";
import Dish from "./Dish";

import { restaurantById } from "../queries/restaurantByIdQuery";

interface RestaurantData {
  objectId: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  deliveryTime: string;
  topDishes: DishItem[];
}

interface CartItem {
  objectId: string;
  name: string;
  price: number;
  quantity: number;
}

interface DishItem {
  objectId: string;
  name: string;
  price: number;
  description: string;
}

const Restaurant: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchRestaurantDetails() {
      const endpoint = "https://parseapi.back4app.com/graphql";
      const headers = {
        "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
        "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
        "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        "Content-Type": "application/json",
      };
      if (id) {
        try {
          const response = await axios.post(endpoint, restaurantById(id), {
            headers,
          });

          const responseData = response.data.data;
          setRestaurant(responseData.fitMe);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    fetchRestaurantDetails();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addToCart = (dish: DishItem) => {
    const existingItem = cartItems.find((item) => item.name === dish.name); //Busca se o prato já está no carrinho

    if (existingItem) {
      setCartItems((
        prevCartItems //Verifica se o nome do prato é mesmo que está no carrinho, se sim ele cria um novo objeto com a mesma estrutura aumentado o tamanho, se não ele não faz nada
      ) =>
        prevCartItems.map((item) =>
          item.name === dish.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // se não existir o prato ele cria um novo array incluido os antigos pratos que já estava registrado e adiciona o novo
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...dish, quantity: 1 },
      ]);
    }
  };

  return (
    <>
      <section className={styles.sectionRestaurant}>
        <div className={styles.highlightRestaurant}>
          <img
            className={styles.imageRestaurant}
            src="/src/images/restaurant1.png"
            alt=""
          />
          <div className={styles.infoRestaurant}>
            <h3>{restaurant?.name}</h3>
            <p className={styles.locationRestaurant}>{restaurant?.location}</p>

            <ul>
              <li>
                <div className={styles.ratingRestaurant}>
                  <div className={styles.starRatingRestaurant}>
                    <img src={"/src/images/starGreen.png"} alt="" />
                    <span>{restaurant?.rating}</span>
                  </div>

                  <p>100+ ratings</p>
                </div>
              </li>
              <li>
                <div>
                  <p>{restaurant?.deliveryTime}</p>
                  <p>Delivery Time</p>
                </div>
              </li>
            </ul>
          </div>
          <article className={styles.offerRestaurant}>
            <h5>Offers</h5>
            <div className={styles.descriptionOfferRestaurant}>
              <img src="/src/images/porcentagem.png" alt="" />
              <p>50% off up to ₹100 | Use code TRYNEW</p>
            </div>
            <div className={styles.descriptionOfferRestaurant}>
              <img src="/src/images/porcentagem.png" alt="" />
              <p>20% off | Use code PARTY</p>
            </div>
          </article>
        </div>

        <div className={styles.searchInput}>
          <div className={styles.searchInputFlex}>
            <input
              type="text"
              className={styles.searchDishInput}
              placeholder="Search for dish"
            />
            <button>
              <div className={styles.searchButton}>
                <img src="/src/images/starFavourite.png" alt="" />
                <span>Favourite</span>
              </div>
            </button>
          </div>
        </div>
      </section>
      <section className={styles.sectionDishes}>
        {windowWidth > 1024 ? (
          <div className={styles.recommendation}>
            <ul>
              <li>Recommended</li>
              <li>Breakfast Box</li>
              <li>Lunch Box</li>
              <li>Combo Box</li>
              <li>Biriyani Box</li>
            </ul>
          </div>
        ) : (
          <div className={styles.recommendationDropDown}>
            <select name="recommendations" id="recommendations">
              <option value={"Recommended"}>Recommended</option>
              <option value={"Breakfast Box"}>Breakfast Box</option>
              <option value={"Lunch Box"}>Lunch Box</option>
              <option value={"Combo Box"}>Combo Box</option>
              <option value={"Biriyani Box"}>Biriyani Box</option>
            </select>
          </div>
        )}
        <div className={styles.dishes}>
          <ul>
            {restaurant?.topDishes.map((dish: DishItem) => (
              <Dish key={dish.objectId} dish={dish} addToCart={addToCart} />
            ))}
          </ul>
        </div>

        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </section>
    </>
  );
};

export default Restaurant;
