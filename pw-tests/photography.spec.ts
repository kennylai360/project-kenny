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

    // Album covers lazy-load their images as they scroll into view, so force
    // every cover into view first and wait for its image to finish loading
    // before taking a full-page screenshot — otherwise covers still showing
    // their loading spinner get captured as a false-positive diff.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("app-gallery-album-cover .overlay-spinner")).toHaveCount(0, { timeout: 10000 });
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll<HTMLImageElement>("app-gallery-album-cover img.album-cover")).every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    );
    await page.evaluate(() => window.scrollTo(0, 0));

    await expect(page).toHaveScreenshot("photography-listing.png", { fullPage: true });
  });
});
