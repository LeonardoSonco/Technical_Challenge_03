
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoginForm from '../components/login/LoginForm'


function loginPage() {
  return (
    <>
      <Header title="Login" loginIsTrue={false}/>
      <LoginForm />
      <Footer />
    </>
  );
}

export default loginPage;
