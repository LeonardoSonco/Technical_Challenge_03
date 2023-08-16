import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";

import { LOGIN_USER } from "../queries/loginQuery";

import Button from "../UI/Button";
import Input from "../UI/Input";

const endpoint = "https://parseapi.back4app.com/graphql";

const headers = {
  "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
  "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
  "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
  "Content-Type": "application/json",
};

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
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      const response = await axios.post(
        endpoint,
        LOGIN_USER(formData.userName, formData.password),
        {
          headers,
        }
      );
      navigate("/homepage");

      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
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
