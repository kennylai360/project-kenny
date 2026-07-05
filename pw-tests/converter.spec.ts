import { test, expect } from "@playwright/test";

const API_BASE = "https://m2lkcntk23.execute-api.eu-west-2.amazonaws.com/test";

// BTC price in USD: 60000, GBP/USD rate: 0.8 → BTC price in GBP = Math.trunc(60000 * (1/0.8)) = 75000
const MOCK_BTC_PRICE_GBP = 75000;

async function mockCoinCapApis(page) {
  await page.route(`${API_BASE}/bitcoin-markets`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: [60000] }),
    })
  );

  await page.route(`${API_BASE}/rates`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [
          { id: "british-pound-sterling", rateUsd: 0.8 },
          { id: "bitcoin", currencySymbol: "₿" },
        ],
      }),
    })
  );
}

test.describe("BTC API caching — called only once across navigations", () => {
  test("does not re-call the API when navigating away and back multiple times", async ({
    page,
  }) => {
    let btcMarketsCalls = 0;
    let ratesCalls = 0;

    await page.route(`${API_BASE}/bitcoin-markets`, (route) => {
      btcMarketsCalls++;
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: [60000] }),
      });
    });

    await page.route(`${API_BASE}/rates`, (route) => {
      ratesCalls++;
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: [
            { id: "british-pound-sterling", rateUsd: 0.8 },
            { id: "bitcoin", currencySymbol: "₿" },
          ],
        }),
      });
    });

    // First visit — API should be called once
    await page.goto("/converter");
    await expect(page.locator("input[type='number']").first()).toBeEnabled();

    // Navigate away and back using nav links (client-side routing — keeps Angular app alive)
    await page.click('[data-qa="qa-home-link"]');
    await expect(page).toHaveURL(/\/home/);

    await page.click('[data-qa="qa-converter-link"]');
    await expect(page.locator("input[type='number']").first()).toBeEnabled();

    await page.click('[data-qa="qa-resume-link"]');
    await expect(page).toHaveURL(/\/resume/);

    await page.click('[data-qa="qa-converter-link"]');
    await expect(page.locator("input[type='number']").first()).toBeEnabled();

    expect(btcMarketsCalls).toBe(1);
    expect(ratesCalls).toBe(1);
  });
});

test.describe("BTC-GBP Converter page", () => {
  test.beforeEach(async ({ page }) => {
    await mockCoinCapApis(page);
    await page.goto("/converter");
    await expect(page.locator("input[type='number']").first()).toBeEnabled();
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Converter");
  });

  test("shows page heading", async ({ page }) => {
    await expect(page.getByText("BTC–GBP")).toBeVisible();
  });

  test("loads BTC price from API", async ({ page }) => {
    const btcPriceInput = page.locator("input[type='number']").first();
    const value = await btcPriceInput.inputValue();
    expect(parseFloat(value)).toBe(MOCK_BTC_PRICE_GBP);
  });

  test("entering BTC amount calculates GBP value", async ({ page }) => {
    await page.locator("input[type='number']").nth(1).fill("2");
    const gbpValue = parseFloat(
      await page.locator("input[type='number']").nth(2).inputValue()
    );
    expect(gbpValue).toBe(MOCK_BTC_PRICE_GBP * 2);
  });

  test("entering GBP amount calculates BTC value", async ({ page }) => {
    await page.locator("input[type='number']").nth(2).click();
    await page.locator("input[type='number']").nth(2).fill("75000");
    const btcValue = parseFloat(
      await page.locator("input[type='number']").nth(1).inputValue()
    );
    expect(btcValue).toBeCloseTo(1, 5);
  });

  test("shows equivalence summary after entering BTC amount", async ({ page }) => {
    await page.locator("input[type='number']").nth(1).fill("0.5");
    await expect(page.getByText("is approximately equivalent to")).toBeVisible();
  });

  test("shows error block when API fails", async ({ page: errorPage }) => {
    await errorPage.route(`${API_BASE}/bitcoin-markets`, (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" })
    );
    await errorPage.route(`${API_BASE}/rates`, (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" })
    );
    await errorPage.goto("/converter");
    await expect(
      errorPage.getByText("Couldn't fetch the live rate")
    ).toBeVisible();
  });
});
