import { Page, Locator, expect } from "@playwright/test";

export class JobTitlesPage {
  private page: Page;
  private addButton: Locator;
  private jobTitleInput: Locator;
  private jobDescriptionInput: Locator;
  private saveButton: Locator;
  private deleteButton: Locator;
  private confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator('button:has-text("Add")');
    this.jobTitleInput = page.locator('input[name="jobTitle"]');
    this.jobDescriptionInput = page.locator('textarea[name="jobDescription"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.deleteButton = page.locator('button:has-text("Delete")');
    this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
  }

  async goto() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList");
    await expect(this.addButton).toBeVisible({ timeout: 10000 });
  }

  async addJobTitle(title: string, description: string) {
    await this.addButton.click();
    await expect(this.jobTitleInput).toBeVisible({ timeout: 10000 });
    await this.jobTitleInput.fill(title);
    await this.jobDescriptionInput.fill(description);
    await this.saveButton.click();
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator(`text=${title}`)).toBeVisible({ timeout: 10000 });
  }

  async deleteJobTitle(title: string) {
    await this.page.waitForSelector(`text=${title}`, { timeout: 10000 });
    await this.page.locator(`text=${title}`).locator('xpath=..//button').click();
    await this.confirmDeleteButton.click();
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator(`text=${title}`)).not.toBeVisible({ timeout: 10000 });
  }
}
