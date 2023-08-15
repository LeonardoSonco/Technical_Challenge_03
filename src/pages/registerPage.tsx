
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RegisterForm from "../components/register/RegisterForm";


function registerPage() {
  return (
    <>
      <Header title="Register" loginIsTrue={false}/>
      <RegisterForm />
      <Footer />
    </>
  );
}

export default registerPage;
