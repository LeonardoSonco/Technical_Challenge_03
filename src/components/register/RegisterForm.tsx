import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import styles from "./RegisterForm.module.css";

import { REGISTER_USER } from "../queries/registerQuery";

import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Input from "../UI/Input";

const endpoint = "https://parseapi.back4app.com/graphql";

const headers = {
  "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
  "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
  "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
  "Content-Type": "application/json",
};


export const validEmail = (email: string): boolean => {
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  return emailRegex.test(email);
};


interface FormData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});

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

    const errors: Record<string, string> = {};

    if (formData.fullName.length < 10) {
      errors.fullName = "O nome precisa ter mais de 9 letras.";
    } else if (formData.userName.length < 5) {
      errors.userName = "O userName precisa ter mais de 5 letras.";
    } else if (!validEmail(formData.email)) {
      errors.email = "Email inválido.";
    } else if (formData.password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    setInputErrors({});

    try {
      const response = await axios.post(
        endpoint,
        REGISTER_USER(formData.userName, formData.password, formData.email),
        {
          headers,
        }
      );
      setIsModalOpen(true);

      return response.data.data;
    } catch (error) {
      console.error("Erro ao criar usuaraio:", error);
      throw error;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.register}>
      <form className={styles.registerForm}>
        <div></div>
        <Input
          labelName="Full Name"
          typeInput="text"
          value={formData.fullName}
          onChange={handleInputChange}
          name="fullName"
        />
        {inputErrors.fullName && (
          <p className={styles.errorMessage}>{inputErrors.fullName}</p>
        )}
        <Input
          labelName="Username"
          typeInput="text"
          value={formData.userName}
          onChange={handleInputChange}
          name="userName"
        />
        {inputErrors.userName && (
          <p className={styles.errorMessage}>{inputErrors.userName}</p>
        )}
        <Input
          labelName="E-Mail"
          typeInput="email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
        {inputErrors.email && (
          <p className={styles.errorMessage}>{inputErrors.email}</p>
        )}
        <Input
          labelName="Password"
          typeInput="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
        />
        {inputErrors.password && (
          <p className={styles.errorMessage}>{inputErrors.password}</p>
        )}
        <Input
          labelName="Confirm Password"
          typeInput="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
        />
        {inputErrors.confirmPassword && (
          <p className={styles.errorMessage}>{inputErrors.confirmPassword}</p>
        )}

        <Button
          buttonTitle={"Register"}
          buttonType={"submit"}
          Onclick={handleFormSubmit}
        />
      </form>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <p>Usuário criado com sucesso!</p>
        </Modal>
      )}
      <p className={styles.haveAccount}>
        Já tenho uma conta? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
