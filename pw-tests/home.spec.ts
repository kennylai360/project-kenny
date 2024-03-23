import { test, expect } from "@playwright/test";

test("has title home", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home/);
});

test("has resume content loaded", async ({ page, baseURL }) => {
  console.log(baseURL);
  await page.goto("/");

  await expect(page.getByText("Resume", { exact: true })).toBeVisible;

  await page.getByText("Resume").click();

  await expect(page).toHaveTitle("Resume");
  await expect(page.getByText("Skills")).toBeVisible;
  await expect(page.getByText("About")).toBeVisible;
  await expect(page.getByText("Work Experience")).toBeVisible;
});
