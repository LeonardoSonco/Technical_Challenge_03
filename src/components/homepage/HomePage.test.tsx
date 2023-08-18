import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("Rederiza os restaurantes", async () => {
    const { findByText, findAllByRole } = render(
      <Router>
        <HomePage />
      </Router>
    );

    // verificar se os elementos estão sendo renderizados corretamente
    const restaurantsHeading = await findByText("Restaurants");
    expect(restaurantsHeading).toBeTruthy();

    // verificar se os cards dos restaurantes estão sendo renderizados
    const restaurantCards = await findAllByRole("link");
    expect(restaurantCards).toHaveLength(8); // Coloque o número correto de restaurantes

    // vrificar se as informações dos restaurantes estão sendo renderizadas
    const restaurantNameElement = await findAllByRole("heading", {
      name: "Healthy Greens",
    });
    expect(restaurantNameElement).toBeTruthy();
  });

  it("Renderiza se não houver restaurante.", async () => {
    const { findByText } = render(
      <Router>
        <HomePage />
      </Router>
    );

    // verificar se a mensagem de "No restaurants available." é renderizada
    const noRestaurantsMessage = await findByText("No restaurants available.");
    expect(noRestaurantsMessage).toBeTruthy();
  });
});
