import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { validEmail } from "./RegisterForm";

describe("RegisterForm", () => {
  it("Inicia com os campos vazios e sem erros.", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    // Encontra os campos de input e o botão de submit
    const fullNameInput = screen.getByLabelText(
      "Full Name"
    ) as HTMLInputElement;
    const userNameInput = screen.getByLabelText("Username") as HTMLInputElement;
    const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      "Confirm Password"
    ) as HTMLInputElement;

    expect(fullNameInput.value).toBe("");
    expect(userNameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(confirmPasswordInput.value).toBe("");

    expect(
      screen.queryByText(/O nome precisa ter mais de 9 letras./i)
    ).toBeNull();
    expect(
      screen.queryByText(/O userName precisa ter mais de 5 letras./i)
    ).toBeNull();
    expect(screen.queryByText(/Email inválido./i)).toBeNull();
    expect(
      screen.queryByText(/A senha deve ter pelo menos 6 caracteres./i)
    ).toBeNull();
    expect(screen.queryByText(/As senhas não coincidem./i)).toBeNull();
  });

  it("Mensagens de erro ao enviar formulario com entrada invalida.", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const registerButton = screen.getByRole("button", {
      name: "Register",
    }) as HTMLButtonElement;

    fireEvent.click(registerButton);

    expect(
      screen.queryByText(/O nome precisa ter mais de 9 letras./i)
    ).not.toBeNull();

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Leonardo Sonco" },
    });

    fireEvent.click(registerButton);

    expect(
      screen.queryByText(/O userName precisa ter mais de 5 letras./i)
    ).not.toBeNull();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "Leonardo" },
    });

    fireEvent.click(registerButton);

    expect(screen.queryByText(/Email inválido./i)).not.toBeNull();

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "leonardosonco@gmail.com" },
    });

    fireEvent.click(registerButton);

    expect(
      screen.queryByText(/A senha deve ter pelo menos 6 caracteres./i)
    ).not.toBeNull();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(registerButton);

    expect(screen.queryByText(/As senhas não coincidem./i)).not.toBeNull();
  });

  it("Validação de email.", () => {
    const validEmails = [
      "test@example.com",
      "user@domain.co",
      "john.doe@sub.domain.com",
    ];
    const invalidEmails = [
      "invalid.email",
      "user@invalid",
      "email.com@invalid",
    ];

    validEmails.forEach((email) => {
      expect(validEmail(email)).toBe(true);
    });

    invalidEmails.forEach((email) => {
      expect(validEmail(email)).toBe(false);
    });
  });
});
