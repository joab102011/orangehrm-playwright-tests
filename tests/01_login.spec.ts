import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test.describe("Login e Logout", () => {
  
  test("LOGIN-001 | Login válido", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("Admin", "admin123");
    await loginPage.isLoggedIn();
  });

  test("LOGIN-002 | Login com credenciais inválidas", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("UsuarioInvalido", "SenhaErrada");

    const errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toContain("Invalid credentials");
  });

  test("LOGIN-003 | Login sem preencher credenciais", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("", "");

    const errorMessages = await loginPage.getRequiredFieldErrors();
    expect(errorMessages).toContain("Required");
  });

  test("LOGIN-004 | Logout do sistema", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("Admin", "admin123");
    await loginPage.isLoggedIn();

    await loginPage.logout();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });
});
