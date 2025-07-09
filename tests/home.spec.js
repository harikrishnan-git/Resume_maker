import { test, expect } from "@playwright/test";

test("Check home page", async ({ page }) => {
  // Navigate to the home page
  await page.goto("/");

  //Check if login link is visible
  await expect(page.getByText("Login")).toBeVisible();

  //Check if register link is visible
  await expect(page.getByText("Get Started")).toBeVisible();

  //Check if dashboard link is visible
  await expect(page.getByText("Dashboard")).toBeVisible();

  //Check if JD link is visible
  await expect(page.getByText("JD")).toBeVisible();
});

test("Check if login link redirects to login page", async ({ page }) => {
  // Navigate to the home page
  await page.goto("/");

  // Click on the login link
  await page.getByText("Login").click();

  // Check if the URL is correct
  await expect(page).toHaveURL("/login");
});

test("Check if register link redirects to register page", async ({ page }) => {
  // Navigate to the home page
  await page.goto("/");

  // Click on the register link
  await page.getByText("Get Started").click();

  // Check if the URL is correct
  await expect(page).toHaveURL("/register");
});

test("Check if dashboard redirects to login page when not logged in", async ({
  page,
}) => {
  //Navigate to home page
  await page.goto("/");

  // Click on the dashboard link
  await page.getByText("Dashboard").click();

  // Check if the URL is correct
  await expect(page).toHaveURL("/login");
});

test("Check if JD page redirects to login page when not logged in", async ({
  page,
}) => {
  //Navigate to home page
  await page.goto("/");

  // Click on the JD link
  await page.getByText("JD").click();

  // Check if the URL is correct
  await expect(page).toHaveURL("/login");
});
