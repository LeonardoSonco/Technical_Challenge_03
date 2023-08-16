import styles from "./AddDish.module.css";

interface CartItem {
  objectId: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}
const AddDish: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const handleDecrease = (itemId: string) => {
    const foundItem = cartItems.find((item) => item.objectId === itemId);
    if (foundItem) {
      const updatedQuantity = Math.max(0, foundItem.quantity - 1);
      if (updatedQuantity === 0) {
        onRemoveItem(itemId);
        console.log("remove");
      } else {
        onUpdateQuantity(itemId, updatedQuantity);
      }
    }
  };

  const handleIncrease = (itemId: string) => {
    const updatedQuantity =
      (cartItems.find((item) => item.objectId === itemId)?.quantity || 0) + 1;
    onUpdateQuantity(itemId, updatedQuantity);
  };

  return (
    <>
      {cartItems.map((item) => (
        <div className={styles.addDishContainer} key={item.objectId}>
          <div className={styles.addDishInfo}>
            <p>{item.name}</p>
            <span>${item.price}</span>
          </div>
          <div className={styles.addDish}>
            <button
              onClick={() => handleDecrease(item.objectId)}
              className={styles.buttonPlus}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleIncrease(item.objectId)}
              className={styles.buttonPlus}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddDish;
