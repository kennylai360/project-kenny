import { test, expect } from "@playwright/test";

test.describe("Utils (mock text) page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/utils");
  });

  test("shows text input", async ({ page }) => {
    await expect(page.locator("input.form-control")).toBeVisible();
  });

  test("copy button disabled with no input", async ({ page }) => {
    await expect(page.locator("button").filter({ hasText: "" }).last()).toBeDisabled();
  });

  test("typing input shows preview", async ({ page }) => {
    await page.locator("input.form-control").fill("hello world");
    await expect(page.getByText("Preview of the mocking text:")).toBeVisible();
  });

  test("preview alternates case (starting uppercase by default)", async ({ page }) => {
    await page.locator("input.form-control").fill("hello");
    const preview = page.locator(".alert.alert-primary");
    await expect(preview).toBeVisible();
    const text = await preview.textContent();
    expect(text).toMatch(/hElLo|HeLlO/i);
  });

  test("switch case button toggles case direction", async ({ page }) => {
    await page.locator("input.form-control").fill("hello");
    const preview = page.locator(".alert.alert-primary");

    const before = await preview.textContent();
    await page.getByRole("button", { name: "Switch case" }).click();
    const after = await preview.textContent();

    expect(before).not.toEqual(after);
  });

  test("copy button enabled after typing", async ({ page }) => {
    await page.locator("input.form-control").fill("some text");
    const copyBtn = page.locator("button fa-icon").locator("..");
    await expect(copyBtn).toBeEnabled();
  });
});

test.describe("Visual regression", () => {
  test("utils page matches snapshot", async ({ page }) => {
    await page.goto("/utils");
    await expect(page.locator("input.form-control")).toBeVisible();
    await expect(page).toHaveScreenshot("utils.png", { fullPage: true });
  });
});
