import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import HomePage from "../components/homepage/HomePage";

function homePage() {
  return (
    <>
      <Header title="Teste" loginIsTrue={true} />
      <HomePage />
      <Footer />
    </>
  );
}

export default homePage;
