import React, { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutations/loginMutation";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

interface FormData {
  userName: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
  });

  const [inputError, setInputError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loginUser] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.userName && !formData.password) {
      setInputError("Preencha os campos apara fazer o login!");

      return;
    } else if (!formData.userName) {
      setInputError("Preencha o nome do usuario apara fazer o login!");

      return;
    } else if (!formData.password) {
      setInputError("Preencha a senha apara fazer o login!");
      return;
    }
    setInputError("");

    try {
      const { data } = await loginUser({
        variables: {
          username: formData.userName,
          password: formData.password,
        },
      });

      console.log(data);
    } catch (error) {
      setInputError("Usuario ou senha incorretos!");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <form className={styles.loginForm}>
        <Input
          labelName="Username"
          typeInput="text"
          value={formData.userName}
          onChange={handleInputChange}
          name="userName"
        />
        <Input
          labelName="Password"
          typeInput="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
        />
        {inputError && <p className={styles.error}>{inputError}</p>}
        <Button
          buttonTitle={"Login"}
          buttonType={"submit"}
          Onclick={handleFormSubmit}
        />
      </form>
      <p className={styles.haveAccount}>
        Dont have and account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
