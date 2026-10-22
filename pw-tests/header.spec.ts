import { test, expect } from "@playwright/test";

test.describe("Header Misc menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/home");
  });

  test("is collapsed until the Misc toggle is clicked", async ({ page }) => {
    await expect(page.locator("[data-qa='qa-converter-link']")).toBeHidden();

    await page.locator("[data-qa='qa-misc-menu']").click();
    await expect(page.locator("[data-qa='qa-converter-link']")).toBeVisible();
    await expect(page.locator("[data-qa='qa-table-link']")).toBeVisible();
    await expect(page.locator("[data-qa='qa-bomb-game-link']")).toBeVisible();
  });

  test("choosing an item navigates, closes the menu and highlights Misc", async ({ page }) => {
    await page.locator("[data-qa='qa-misc-menu']").click();
    await page.locator("[data-qa='qa-bomb-game-link']").click();

    await expect(page).toHaveURL(/\/bomb-game$/);
    await expect(page.locator("[data-qa='qa-bomb-game-link']")).toBeHidden();
    await expect(page.locator(".nav-dropdown")).toHaveClass(/is-active/);
  });

  test("closes on outside click and on Escape", async ({ page }) => {
    const item = page.locator("[data-qa='qa-converter-link']");

    await page.locator("[data-qa='qa-misc-menu']").click();
    await expect(item).toBeVisible();
    await page.locator("body").click({ position: { x: 5, y: 400 } });
    await expect(item).toBeHidden();

    await page.locator("[data-qa='qa-misc-menu']").click();
    await expect(item).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(item).toBeHidden();
  });
});
