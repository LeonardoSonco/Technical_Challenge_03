import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import HomePage from "./pages/homePage";
import RestaurantPage from "./pages/restaurantPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/homepage/:id" element={<RestaurantPage />} />
    </Routes>
  );
};

export default App;
