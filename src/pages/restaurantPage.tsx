
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Restaurant from "../components/restaurant/Restaurant";

function restaurantPage() {
  return (
    <>
      <Header title="" loginIsTrue={true} />
      <Restaurant />
      <Footer />
    </>
  );
}

export default restaurantPage;
