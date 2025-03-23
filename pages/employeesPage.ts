import { Page, Locator, expect } from "@playwright/test";

export class EmployeesPage {
  private page: Page;
  private pimMenu: Locator;
  private addEmployeeButton: Locator;
  private firstNameInput: Locator;
  private middleNameInput: Locator;
  private lastNameInput: Locator;
  private saveButton: Locator;
  private editSaveButton: Locator;
  private nameInput: Locator;
  private searchButton: Locator;
  private employeeTableRows: Locator;
  private confirmDeleteButton: Locator;
  private employeeListLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.employeeListLink = page.getByRole('link', { name: 'Employee List' });
    this.addEmployeeButton = page.getByRole('button', { name: /Add/i });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.editSaveButton = page.locator('button[data-v-10d463b7][data-v-6653c066]');
    this.nameInput = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: /Search/i });
    this.employeeTableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.confirmDeleteButton = page.getByRole('button', { name: /Yes, Delete/i });
  }

  async gotoEmployeeList() {
    await this.page.waitForLoadState("networkidle");
    if (!(await this.pimMenu.isVisible())) {
      throw new Error("Menu 'PIM' não está visível. Verifique se a página está carregada corretamente.");
    }
    await this.pimMenu.click();
    await this.page.waitForTimeout(500);
    await this.employeeListLink.click();
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible', timeout: 10000 });
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.gotoEmployeeList();
    await this.addEmployeeButton.click();
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill('de');
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
    await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible({ timeout: 10000 });
    await this.gotoEmployeeList();
  }

  async searchEmployee(nameFragment: string) {
    await this.gotoEmployeeList();
    await this.nameInput.fill(nameFragment);
    await this.page.waitForTimeout(1000);
    await this.searchButton.click();
    await this.page.waitForTimeout(1000);
  }

  async findEmployeeRow(firstName: string, lastName: string): Promise<Locator | null> {
    const rows = this.employeeTableRows;
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const nameCell = await row.locator(".oxd-table-cell").nth(2).innerText();
      const lastNameCell = await row.locator(".oxd-table-cell").nth(3).innerText();

      if (nameCell.trim() === `${firstName} de` && lastNameCell.trim() === lastName) {
        return row;
      }
    }

    return null;
  }

  async validateEmployeeAdded(firstName: string, lastName: string) {
    await this.searchEmployee(firstName);
    const row = await this.findEmployeeRow(firstName, lastName);
    expect(row, `Funcionário ${firstName} de ${lastName} não foi encontrado após adição.`).not.toBeNull();
    await expect(row!).toBeVisible({ timeout: 10000 });
  }

  async validateEmployeeUpdated(newFirstName: string, newLastName: string) {
    await this.searchEmployee(newFirstName);
    const row = await this.findEmployeeRow(newFirstName, newLastName);
    expect(row, `Funcionário ${newFirstName} de ${newLastName} não foi encontrado após edição.`).not.toBeNull();
    await expect(row!).toBeVisible({ timeout: 10000 });
  }

  async editEmployee(currentFirstName: string, currentLastName: string, newFirstName: string, newLastName: string) {
    await this.searchEmployee(currentFirstName);
    const row = await this.findEmployeeRow(currentFirstName, currentLastName);
    expect(row, `Funcionário ${currentFirstName} de ${currentLastName} não encontrado para edição.`).not.toBeNull();
    const editButton = row!.locator("i.bi-pencil-fill");
    await editButton.waitFor({ state: 'visible', timeout: 10000 });
    await editButton.click();
    await this.page.waitForTimeout(10000);
    await this.firstNameInput.fill(newFirstName);
    await this.middleNameInput.fill('de');
    await this.lastNameInput.fill(newLastName);
    await this.editSaveButton.click();
    
    await this.page.waitForLoadState("networkidle");
    await this.gotoEmployeeList();
    
    await this.validateEmployeeUpdated(newFirstName, newLastName);
  }

  async deleteEmployee(firstName: string, lastName: string) {
    await this.searchEmployee(firstName);
    const row = await this.findEmployeeRow(firstName, lastName);
    expect(row, `Funcionário ${firstName} de ${lastName} não encontrado para exclusão.`).not.toBeNull();
    const deleteButton = row!.locator("i.bi-trash, i.bi-trash-fill");
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();
    await this.confirmDeleteButton.click();
    await this.page.waitForLoadState("networkidle");

    await this.searchEmployee(firstName);
    const deletedRow = await this.findEmployeeRow(firstName, lastName);
    expect(deletedRow, `Funcionário ${firstName} de ${lastName} ainda está presente após tentativa de exclusão.`).toBeNull();
  }

  async validateEmployeeDeleted(firstName: string, lastName: string) {
    await this.searchEmployee(firstName);
    const row = await this.findEmployeeRow(firstName, lastName);
    expect(row, `Funcionário ${firstName} de ${lastName} ainda está presente na listagem.`).toBeNull();
  }
}
