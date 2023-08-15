import styles from "./Card.module.css";


interface CardProps {
    name: string;
    rating: number;
    deliveryTime: string;
  }

const Card: React.FC<CardProps> = ({ name, rating, deliveryTime }) => {
  return (
    <div className={styles.cardExternRestaurant}>
      <li className={styles.listRestaurant}>
        <img
          className={styles.imageRestaurant}
          src="./src/images/Dish1.png"
          alt=""
        />
        <h4 className={styles.dishRestaurant}>{name}</h4>
        <div className={styles.nameRestaurant}>
          <p>{name}</p>
          <div className={styles.ratingRestaurant}>
            <img src={rating >= 4 ? "./src/images/starGreen.png": "./src/images/starOrange.png" } alt="" />
            <span>{rating}</span>
          </div>
        </div>
        <div className={styles.timeDeliveryRestaurant}>
          <img src="./src/images/time.png" alt="" />
          <span>{deliveryTime}</span>
        </div>
      </li>
    </div>
  );
};

export default Card;
