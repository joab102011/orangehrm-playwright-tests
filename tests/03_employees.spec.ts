import { test, expect } from '@playwright/test';
import { EmployeesPage } from '../pages/employeesPage';
import { faker } from '@faker-js/faker';

test.describe('Gestão de Funcionários', () => {
  let employeesPage: EmployeesPage;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const updatedFirstName = faker.person.firstName();
  const updatedLastName = faker.person.lastName();

  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    employeesPage = new EmployeesPage(page);
  });

  test('EMP-001 | Adicionar funcionário', async () => {
    await employeesPage.addEmployee(firstName, lastName);
    await employeesPage.validateEmployeeAdded(firstName, lastName);
  });

  test('EMP-002 | Editar informações de um funcionário', async () => {
    await employeesPage.editEmployee(firstName, lastName, updatedFirstName, updatedLastName);
  });

  test('EMP-003 | Excluir funcionário', async () => {
    await employeesPage.deleteEmployee(updatedFirstName, updatedLastName);
    await employeesPage.validateEmployeeDeleted(updatedFirstName, updatedLastName);
  });
});