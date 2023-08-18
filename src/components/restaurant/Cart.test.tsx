import { render } from "@testing-library/react";
import Cart from "./Cart";

describe("Cart", () => {
  const sampleItems = [
    { objectId: "1", name: "Item 1", price: 10, quantity: 2 },
    { objectId: "2", name: "Item 2", price: 15, quantity: 3 },
  ];

  it("Renderização.", () => {
    const { queryByText } = render(
      <Cart cartItems={[]} setCartItems={() => {}} />
    );
    const emptyCartMessage = queryByText("Your cart is empty.");
    expect(emptyCartMessage).toBeTruthy();
  });

  it("SubTotal correto.", () => {
    const { queryByText } = render(
      <Cart cartItems={sampleItems} setCartItems={() => {}} />
    );
    const expectedSubtotal = sampleItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const subtotalText = queryByText(`$${expectedSubtotal.toFixed(2)}`);

    expect(subtotalText).toBeTruthy();
  });

  it("Contagem certa de pratos.", () => {
    const { queryByText } = render(
      <Cart cartItems={sampleItems} setCartItems={() => {}} />
    );
    const expectedTotalItemCount = sampleItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalItemCountText = queryByText(`${expectedTotalItemCount} items`);

    expect(totalItemCountText).toBeTruthy();
  });
});
