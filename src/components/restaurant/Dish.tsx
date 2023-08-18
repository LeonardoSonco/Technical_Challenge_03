import styles from "./Dish.module.css";

interface DishType {
  objectId: string;
  name: string;
  description: string;
  price: number;
}

interface DishProps {
  dish: {
    objectId: string;
    name: string;
    description: string;
    price: number;
  };
  addToCart: (dish: DishType) => void;
}
interface DishType {
  objectId: string;
}

const Dish: React.FC<DishProps> = ({ dish, addToCart }) => {
  return (
    <li className={styles.dishContainer}>
      {
        <>
          <div className={styles.dishInfo}>
            <h3>{dish.name}</h3>
            <span>${dish.price}</span>
            <p>{dish.description}</p>
          </div>
          <div className={styles.dishImg}>
            <img src="/src/images/dish2.png" alt="" />
            <button onClick={() => addToCart(dish)}>Add +</button>
          </div>
        </>
      }
    </li>
  );
};

export default Dish;
