import { useQuery } from "@apollo/client";
import styles from "./Dish.module.css";
import { GET_DISH } from "../mutations/dishMutation";



interface DishType {
  objectId: string;
  name: string;
  description: string;
  price: number;
  // Outras propriedades do prato
}


interface DishProps {
  dish: {
    objectId: string;
  }
  addToCart: (dish: DishType) => void;
}
interface DishType {
  objectId: string;
  // outras propriedades do objeto Dish
}

const Dish: React.FC<DishProps> = ({ dish,addToCart  }) => {
  const { loading, error, data } = useQuery(GET_DISH);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dishAccept = data.getDish.find(
    (x: DishType) => x.objectId === dish.objectId
  );


  return (
    <li className={styles.dishContainer}>
      {dishAccept ? (
        <>
          <div className={styles.dishInfo}>
            <h3>{dishAccept.name}</h3>
            <span>${dishAccept.price}</span>
            <p>{dishAccept.description}</p>
          </div>
          <div className={styles.dishImg}>
            <img src="/src/images/dish2.png" alt="" />
            <button onClick={()=> addToCart(dishAccept)}>Add +</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </li>
  );
};

export default Dish;
