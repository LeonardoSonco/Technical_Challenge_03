import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router-dom";

describe("LoginForm", () => {
  it("Campos vazios e sem erro de entrada.", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    // Verificar se os campos de entrada estão vazios
    expect(usernameInput.value).toBe("");
    expect(passwordInput.value).toBe("");

    // Verificar se não há mensagem de erro exibida
    expect(
      screen.queryByText(/Preencha os campos apara fazer o login!/i)
    ).toBeFalsy();
  });
  it("Exibe mensagem de erro, ao tentar enviar form vazio.", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    //faz a simulacao do envio do formulario
    fireEvent.click(submitButton);

    //verifica se a mensagem de erro esta sendo exibida
    expect(
      screen.getByText(/Preencha os campos apara fazer o login!/i)
    ).toBeTruthy();

    // preenche o username
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    fireEvent.click(submitButton);

    expect(
      screen.getByText(/Preencha a senha apara fazer o login!/i)
    ).toBeTruthy();

    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fireEvent.click(submitButton);

    //verifica se as mensagens de erro foram removidas
    expect(
      screen.queryByText(/Preencha os campos apara fazer o login!/i)
    ).toBeNull();
    expect(
      screen.queryByText(/Preencha a senha apara fazer o login!/i)
    ).toBeNull();
  });
});
