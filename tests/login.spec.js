// @ts-check
import { test, expect } from "@playwright/test";

test("Check login page", async ({ page }) => {
  // Navigate to the login page
  await page.goto("/login");

  // Check if the title is correct
  await expect(page.getByText("Login").first()).toBeVisible();

  // Check if the username input is visible
  const emailInput = page.locator("#email");
  await expect(emailInput).toBeVisible();
  await emailInput.fill("demo@gmail.com");

  // Check if the password input is visible
  const passwordInput = page.locator("#password");
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill("demo");

  // Check if not registered? link is visible
  const notRegisteredLink = page.locator("text=Not registered?");
  await expect(notRegisteredLink).toBeVisible();

  // Check if the login button is visible
  const loginButton = page.getByRole("button").filter({ hasText: "Login" });
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  await expect(page).toHaveURL("/dashboard", { timeout: 5000 });
});
