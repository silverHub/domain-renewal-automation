import { test, expect } from '@playwright/test';

test('Activate domain on noip.com', async ({ page }) => {

  // from .env
  const user = process.env.USERNAME || ""
  const pass = process.env.PASSWORD || ""

  expect(user, "USERNAME env variable is missing").toBeTruthy()
  expect(pass, "PASSWORD env variable is missing").toBeTruthy()
  console.log("Env vars are set.")

  await page.goto('https://www.noip.com/login');

  // Check if we are on Sign in page
  await expect(page).toHaveTitle(/Sign In - No-IP/);

  // Sign in
  await page.getByLabel("Username or Email",).fill(user)
  await page.getByRole('textbox', { name: 'Password' }).fill(pass)
  await page.getByRole('button', { name: "Log in" }).click();

  // Check if we are on dashboard
  await expect(page).toHaveTitle(/My No-IP/);
  console.log("Login successful.")

  // Go to domains
  await page.goto('https://my.noip.com/dynamic-dns')

  const confirmBtn = page.getByRole('button', { name: "Confirm" })
  
  if (await confirmBtn.isVisible()){
    confirmBtn.click();
    console.log("Domain confirmed.")
  } else {
    console.log("No confirm button found.")
  }
  
});
