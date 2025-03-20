import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { EmployeesPage } from "../pages/employeesPage";

test.describe("Pesquisa e Filtros de Funcionários", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const employeesPage = new EmployeesPage(page);

    await loginPage.goto();
    await loginPage.login("Admin", "admin123");

    await employeesPage.goto();
  });

  test("PIM-001 | Pesquisar funcionário pelo nome", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);

    await employeesPage.searchEmployee("João Silva");
    await expect(await employeesPage.getEmployeeList()).toContainText("João Silva");
  });

  test("PIM-002 | Filtrar funcionários por cargo", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);

    await employeesPage.filterByJobTitle("Developer");
    await expect(await employeesPage.getEmployeeList()).toContainText("Developer");
  });
});
