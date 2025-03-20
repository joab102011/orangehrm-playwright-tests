import { Page, Locator, expect } from "@playwright/test";

export class EmployeesPage {
  private page: Page;
  private addEmployeeButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private saveButton: Locator;
  private employeeListTab: Locator;
  private searchInput: Locator;
  private searchButton: Locator;
  private employeeTable: Locator;
  private employeeRow: Locator;
  private editButton: Locator;
  private deleteButton: Locator;
  private confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.locator('button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.employeeListTab = page.locator('a:has-text("Employee List")');
    this.searchInput = page.locator('input[placeholder="Type for hints..."]');
    this.searchButton = page.locator('button:has-text("Search")');
    this.employeeTable = page.locator('.oxd-table-body');
    this.employeeRow = page.locator('.oxd-table-row');
    this.editButton = page.locator('i.bi-pencil-fill');
    this.deleteButton = page.locator('i.bi-trash');
    this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
  }

  async gotoEmployeeList() {
    await this.employeeListTab.click();
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.gotoEmployeeList();
    await this.addEmployeeButton.waitFor({ state: "visible", timeout: 10000 });
    await this.addEmployeeButton.click();
    await this.firstNameInput.waitFor({ state: "visible", timeout: 5000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }


  async searchEmployee(name: string) {
    await this.gotoEmployeeList();
    await this.searchInput.fill(name);
    await this.searchButton.click();
    await expect(this.employeeTable).toBeVisible({ timeout: 10000 });
  }

  async validateEmployeeAdded(name: string) {
    await this.searchEmployee(name);
    await expect(this.employeeTable).toContainText(name);
  }

  async editEmployee(currentName: string, newFirstName: string, newLastName: string) {
    await this.searchEmployee(currentName);
    await this.employeeRow.locator(this.editButton).click();
    await this.firstNameInput.fill(newFirstName);
    await this.lastNameInput.fill(newLastName);
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async deleteEmployee(name: string) {
    await this.searchEmployee(name);
    await this.employeeRow.locator(this.deleteButton).click();
    await this.confirmDeleteButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async validateEmployeeDeleted(name: string) {
    await this.searchEmployee(name);
    await expect(this.employeeTable).not.toContainText(name);
  }
}
