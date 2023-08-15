import React, { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { REGISTER_USER } from "../mutations/registerMutation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.css";

import { useMutation } from "@apollo/client";
import Modal from "../UI/Modal";

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
  const [registerUser] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validEmail = (email: string): boolean => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors: Record<string, string> = {};

    if (formData.fullName.length < 10) {
      errors.fullName = "O nome precisa ter mais de 9 letras.";
    } else if (formData.userName.length < 5) {
      errors.userName = "O userName precisa ter mais de 5 letras.";
    }
    else if (!validEmail(formData.email)) {
      errors.email = "Email inválido.";
    }
    else if (formData.password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    setInputErrors({});

    try {
      const { data } = await registerUser({
        variables: {
          username: formData.userName,
          password: formData.password,
          email: formData.email,
          fullname: formData.fullName,
        },
      });

      console.log("Usuário registrado com sucesso:", data.registerUser);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
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
        {inputErrors.fullName && <p className={styles.errorMessage}>{inputErrors.fullName}</p>}
        <Input
          labelName="Username"
          typeInput="text"
          value={formData.userName}
          onChange={handleInputChange}
          name="userName"
        />
        {inputErrors.userName && <p className={styles.errorMessage}>{inputErrors.userName}</p>}
        <Input
          labelName="E-Mail"
          typeInput="email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
        {inputErrors.email && <p className={styles.errorMessage}>{inputErrors.email}</p>}
        <Input
          labelName="Password"
          typeInput="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
        />
        {inputErrors.password && <p className={styles.errorMessage}>{inputErrors.password}</p>}
        <Input
          labelName="Confirm Password"
          typeInput="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
        />
        {inputErrors.confirmPassword && <p className={styles.errorMessage}>{inputErrors.confirmPassword}</p>}

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
