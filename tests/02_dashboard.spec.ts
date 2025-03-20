import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { DashboardPage } from "../pages/dashboardPage";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login("Admin", "admin123");

    await expect(await dashboardPage.getDashboardTitle()).toContainText("Dashboard");
  });

  test("DASH-001 | Verificar widgets do dashboard", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(await dashboardPage.getWidget("Time at Work")).toBeVisible();
    await expect(await dashboardPage.getWidget("My Actions")).toBeVisible();
    await expect(await dashboardPage.getWidget("Quick Launch")).toBeVisible();
  });

  test("DASH-002 | Navegar para a seção de funcionários", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.goToEmployees();
    await expect(page).toHaveURL(/pim/);
  });
});
