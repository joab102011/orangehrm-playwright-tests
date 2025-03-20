import { Page, Locator } from "@playwright/test";

export class PimPage {
  private page: Page;
  private searchInput: Locator;
  private searchButton: Locator;
  private jobTitleFilter: Locator;
  private employeeList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.searchButton = page.locator('button:has-text("Search")');
    this.jobTitleFilter = page.locator('select[name="jobTitle"]');
    this.employeeList = page.locator(".oxd-table-body");
  }

  async goto() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList");
  }

  async searchEmployee(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async filterByJobTitle(jobTitle: string) {
    await this.jobTitleFilter.selectOption(jobTitle);
    await this.searchButton.click();
  }

  async getEmployeeList() {
    return this.employeeList;
  }
}
