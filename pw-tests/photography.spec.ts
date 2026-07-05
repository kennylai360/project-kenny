import { test, expect } from "@playwright/test";

test.describe("Photography page", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/photography");
    await expect(page).toHaveTitle("Photography");
  });

  test("loads album covers", async ({ page }) => {
    await page.goto("/photography");
    await expect(page.locator("app-gallery-album-cover").first()).toBeVisible({ timeout: 10000 });
  });

  test("clicking album navigates to album page", async ({ page }) => {
    await page.goto("/photography");
    await page.locator("app-gallery-album-cover").first().click();
    await expect(page).toHaveURL(/\/photography\/.+/);
    await expect(page.locator(".breadcrumb__link", { hasText: "Photography" })).toBeVisible();
  });

  test("album page has breadcrumb link that returns to listing", async ({ page }) => {
    await page.goto("/photography");
    await page.locator("app-gallery-album-cover").first().click();
    await page.locator(".breadcrumb__link").click();
    await expect(page).toHaveURL(/\/photography$/);
  });
});

test.describe("Visual regression", () => {
  test("photography listing page matches snapshot", async ({ page }) => {
    await page.goto("/photography");
    await expect(page.locator("app-gallery-album-cover").first()).toBeVisible({ timeout: 10000 });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("photography-listing.png", { fullPage: true });
  });
});
