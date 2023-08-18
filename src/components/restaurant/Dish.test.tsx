import { render } from "@testing-library/react";
import Dish from "./Dish";

describe("Dish", () => {
  it("Renderização", () => {
    const testDish = {
      objectId: "1",
      name: "Prato Teste",
      description: "Descricao Teste",
      price: 10.0,
    };

    const addToCart = jest.fn();
    const { getByText, getByAltText } = render(
      <Dish dish={testDish} addToCart={addToCart} />
    );

    const dishName = getByText(testDish.name);
    const dishPrice = getByText(`$${testDish.price}`);
    const dishDescription = getByText(testDish.description);
    const addButton = getByText("Add +");
    const dishImage = getByAltText("");

    expect(dishName).toBeTruthy();
    expect(dishPrice).toBeTruthy();
    expect(dishDescription).toBeTruthy();
    expect(addButton).toBeTruthy();
    expect(dishImage).toBeTruthy();
  });
});
