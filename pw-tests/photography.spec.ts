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
    // The album covers load full-size images from an external host (Flickr),
    // which can be slow on CI — give this test more room than the default budget.
    test.setTimeout(90000);

    await page.goto("/photography");
    await expect(page.locator("app-gallery-album-cover").first()).toBeVisible({ timeout: 10000 });
    await page.waitForLoadState("networkidle");

    // Album covers lazy-load their images as they scroll into view (via
    // ng-lazyload-image, which swaps the <img> src from a placeholder to the
    // real URL once triggered). The component's own "loaded" flag fires on
    // the placeholder's load event too, so it's not a reliable signal here —
    // instead wait for each cover's <img> to actually carry its real target
    // src and be fully decoded before taking the full-page screenshot.
    // Scroll down first (with a brief pause so the IntersectionObserver has
    // a frame to fire before we jump back) to trigger every cover's load.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll<HTMLImageElement>("app-gallery-album-cover img.album-cover")).every(
          (img) => img.complete && img.naturalWidth > 0 && !img.src.startsWith("data:"),
        ),
      { timeout: 60000 },
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);

    await expect(page).toHaveScreenshot("photography-listing.png", { fullPage: true });
  });
});
