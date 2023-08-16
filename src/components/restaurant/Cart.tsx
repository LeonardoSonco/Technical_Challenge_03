import AddDish from "./AddDish";

import styles from "./Cart.module.css";

interface CartItem {
  objectId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.objectId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartItem = (itemId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.objectId !== itemId)
    );
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitle}>
        <h3>Cart</h3>
        <span>{totalItems} items</span>
      </div>
      {cartItems.length > 0 ? (
        <AddDish
          cartItems={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeCartItem}
        />
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className={styles.cartPriceTotal}>
        <div className={styles.cartSubtotal}>
          <span>SubTotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <p>Extra charges may apply</p>
      </div>
      <button className={styles.cartButton}>Checkout</button>
    </div>
  );
};

export default Cart;
