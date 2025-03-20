import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private logoutDropdown: Locator;
  private logoutButton: Locator;
  private errorAlert: Locator;
  private requiredFieldsError: Locator;
  private dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.logoutDropdown = page.locator('.oxd-userdropdown-name');
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.errorAlert = page.locator('.oxd-alert-content-text');
    this.requiredFieldsError = page.locator('.oxd-input-field-error-message');
    this.dashboardHeader = page.locator("h6:has-text('Dashboard')");
  }

  async goto() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/");
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutDropdown.click();
    await this.logoutButton.click();
    await expect(this.loginButton).toBeVisible({ timeout: 10000 });
  }

  async getInvalidCredentialsMessage() {
    await this.page.waitForSelector('.oxd-alert-content-text', { timeout: 10000 });
    return this.errorAlert.innerText();
  }

  async getRequiredFieldErrors() {
    await this.page.waitForSelector('.oxd-input-field-error-message', { timeout: 10000 });
    return this.requiredFieldsError.allTextContents();
  }

  async isLoggedIn() {
    await expect(this.dashboardHeader).toBeVisible({ timeout: 10000 });
  }

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }
}
