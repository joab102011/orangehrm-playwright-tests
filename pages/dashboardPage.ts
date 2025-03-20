import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  private page: Page;
  private dashboardTitle: Locator;
  private logoutButton: Locator;
  private userDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.locator("h6");
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.userDropdown = page.locator(".oxd-userdropdown-tab");
  }

  async getDashboardTitle() {
    return this.dashboardTitle;
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
  }

  async getWidget(widgetName: string) {
    return this.page.locator(`text=${widgetName}`);
  }

  async goToEmployees() {
    await this.page.click("text=PIM");
  }
}
