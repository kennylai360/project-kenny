import { test, expect } from "@playwright/test";

test("has title kennykinkeelai", async ({ page }) => {
  await page.goto("https://kennykinkeelai.com");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/KennyKinKeeLai/);
});

test("get resume", async ({ page }) => {
  await page.goto("https://kennykinkeelai.com");

  // Click the get started link.
  await expect(page.getByText("Resume", { exact: true })).toBeVisible;
  // await page.getByRole("link", { name: "Get started" }).click();

  await page.getByText("Resume").click();

  await expect(page).toHaveTitle("Resume");
  await expect(page.getByText("About"));
  await expect(page.getByText("Skills"));

  // Expects page to have a heading with the name of Installation.
  // await expect(
  //   page.getByRole("heading", { name: "Installation" })
  // ).toBeVisible();
});
