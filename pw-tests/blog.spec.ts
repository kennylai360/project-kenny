import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  // The blog is off in the production build (environment.prod.ts), so skip
  // when pointed at a deployment that hasn't published it.
  test.beforeEach(async ({ page, baseURL }) => {
    if (baseURL?.includes("localhost")) return;
    await page.goto("/home");
    test.skip((await page.locator("[data-qa='qa-blog-link']").count()) === 0, "blog is disabled in this build");
  });

  test("listing has correct title and shows posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle("My brain dump");
    await expect(page.locator(".post-card").first()).toBeVisible();
  });

  test("header link navigates to the listing", async ({ page }) => {
    await page.goto("/home");
    await page.locator("[data-qa='qa-blog-link']").click();
    await expect(page).toHaveURL(/\/blog$/);
  });

  test("clicking a post opens it with rendered content and its title", async ({ page }) => {
    await page.goto("/blog");
    const firstCard = page.locator(".post-card").first();
    const cardTitle = (await firstCard.locator(".post-card__title").innerText()).trim();
    await firstCard.click();

    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page).toHaveTitle(cardTitle);
    await expect(page.getByRole("heading", { level: 1, name: cardTitle })).toBeVisible();
    await expect(page.locator(".post-body")).not.toBeEmpty();
  });

  test("post back link returns to the listing", async ({ page }) => {
    await page.goto("/blog");
    await page.locator(".post-card").first().click();
    await page.locator("[data-qa='qa-blog-back-link']").click();
    await expect(page).toHaveURL(/\/blog$/);
  });

  test("unknown slug shows post not found", async ({ page }) => {
    await page.goto("/blog/this-post-does-not-exist");
    await expect(page.getByRole("heading", { name: "Post not found" })).toBeVisible();
    await expect(page).toHaveTitle("Post not found");
  });
});
