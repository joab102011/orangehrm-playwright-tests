import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { JobTitlesPage } from "../pages/jobTitlesPage";

test.describe("Gerenciamento de Cargos", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobTitlesPage = new JobTitlesPage(page);

    await loginPage.goto();
    await loginPage.login("Admin", "admin123");

    await jobTitlesPage.goto();
  });

  test("JOB-001 | Adicionar novo cargo", async ({ page }) => {
    const jobTitlesPage = new JobTitlesPage(page);

    await jobTitlesPage.addJobTitle("Analista de QA", "Responsável por testes de software");
    await expect(await jobTitlesPage.getJobTitleList()).toContainText("Analista de QA");
  });

  test("JOB-002 | Excluir cargo existente", async ({ page }) => {
    const jobTitlesPage = new JobTitlesPage(page);

    await jobTitlesPage.deleteJobTitle("Analista de QA");
    await expect(await jobTitlesPage.getJobTitleList()).not.toContainText("Analista de QA");
  });
});
