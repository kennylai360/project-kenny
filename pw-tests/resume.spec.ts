import { test, expect } from "@playwright/test";

test.describe("Resume page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Resume");
  });

  test("shows name and role", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Kenny Lai" })).toBeVisible();
    await expect(page.locator(".badge", { hasText: "Software Developer" })).toBeVisible();
  });

  test("shows About section", async ({ page }) => {
    await expect(page.getByText("About")).toBeVisible();
    await expect(page.getByText("reliable")).toBeVisible();
  });

  test("shows Skills section with languages", async ({ page }) => {
    await expect(page.getByText("Skills")).toBeVisible();
    await expect(page.getByText("JavaScript")).toBeVisible();
    await expect(page.locator(".chip", { hasText: "Angular" }).first()).toBeVisible();
  });

  test("shows profile image", async ({ page }) => {
    const img = page.locator("img.profile-photo");
    await expect(img).toBeVisible();
  });
});

test.describe("Visual regression", () => {
  test("resume page matches snapshot", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.locator("img.profile-photo")).toBeVisible();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("resume.png", { fullPage: true });
  });
});
