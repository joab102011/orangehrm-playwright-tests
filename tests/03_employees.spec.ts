import { test, expect } from "@playwright/test";
import { EmployeesPage } from "../pages/employeesPage";
import { LoginPage } from "../pages/loginPage";

test.describe("Gestão de Funcionários", () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("Admin", "admin123");
  });

  test("EMP-001 | Adicionar funcionário", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    await employeesPage.addEmployee("Maria", "Oliveira");
    await employeesPage.validateEmployeeAdded("Maria Oliveira");
  });

  test("EMP-002 | Editar informações de um funcionário", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    await employeesPage.editEmployee("Maria Oliveira", "Maria Clara", "Oliveira");
    await employeesPage.validateEmployeeAdded("Maria Clara Oliveira");
  });

  test("EMP-003 | Excluir funcionário", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    await employeesPage.deleteEmployee("Maria Clara Oliveira");
    await employeesPage.validateEmployeeDeleted("Maria Clara Oliveira");
  });
});
