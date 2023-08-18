import { render, fireEvent } from "@testing-library/react";
import AddDish from "./AddDish";

describe("AddDish", () => {
  const cartItems = [
    { objectId: "item1", name: "Dish 1", price: 10, quantity: 2 },
    { objectId: "item2", name: "Dish 2", price: 15, quantity: 1 },
  ];

  // criando funções de update e remove ficticias
  const mockUpdateQuantity = jest.fn();
  const mockRemoveItem = jest.fn();

  beforeEach(() => {
    mockUpdateQuantity.mockClear();
    mockRemoveItem.mockClear();
  });

  it("Rederização.", () => {
    // Renderiza o componente
    const { getByText } = render(
      <AddDish
        cartItems={cartItems}
        onUpdateQuantity={mockUpdateQuantity}
        onRemoveItem={mockRemoveItem}
      />
    );

    // Faz a verificação de quantos itens tem na tela
    cartItems.forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
      expect(getByText(`$${item.price}`)).toBeTruthy();
      expect(getByText(item.quantity.toString())).toBeTruthy();
    });
  });

  it("Aumenta na quantidade certa.", () => {
    const { getAllByText } = render(
      <AddDish
        cartItems={cartItems}
        onUpdateQuantity={mockUpdateQuantity}
        onRemoveItem={mockRemoveItem}
      />
    );
    // pega todos os botoes +
    const increaseButtons = getAllByText("+", { selector: "button" });
    // vai clicar no + no primeiro item do carrinho
    fireEvent.click(increaseButtons[0]);
    // verfica se a função mockUpdateQuantity foi chamada com os argumentos experados
    expect(mockUpdateQuantity).toHaveBeenCalledWith("item1", 3);
  });

  it("Diminui na quantidade certa.", () => {
    const { getAllByText } = render(
      <AddDish
        cartItems={cartItems}
        onUpdateQuantity={mockUpdateQuantity}
        onRemoveItem={mockRemoveItem}
      />
    );

    // pega todos os botoes -
    const decreaseButtons = getAllByText("-", { selector: "button" });
    // vai clicar no - no primeiro item do carrinho
    fireEvent.click(decreaseButtons[0]);
    // verfica se a função mockUpdateQuantity foi chamada com os argumentos esperados
    expect(mockUpdateQuantity).toHaveBeenCalledWith("item1", 1);
  });

  it("Retira o prato da lista quando chega a zero.", () => {
    const { getAllByText } = render(
      <AddDish
        cartItems={cartItems}
        onUpdateQuantity={mockUpdateQuantity}
        onRemoveItem={mockRemoveItem}
      />
    );

    const decreaseButtons = getAllByText("-", { selector: "button" });
    fireEvent.click(decreaseButtons[1]);
    //Verifica se a função mockRemoveItem foi chamada com os parametros esperados
    expect(mockRemoveItem).toHaveBeenCalledWith("item2");
  });
});
