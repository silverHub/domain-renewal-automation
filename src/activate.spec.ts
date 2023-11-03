import { test, expect } from '@playwright/test';

test('Activate domain on noip.com', async ({ page }) => {

  // from .env
  const user = process.env.USERNAME || ""
  const pass = process.env.PASSWORD || ""

  expect(user, "USERNAME env variable is missing").toBeTruthy()
  expect(pass, "PASSWORD env variable is missing").toBeTruthy()

  await page.goto('https://www.noip.com/login');

  // Check if we are on Sign in page
  await expect(page).toHaveTitle(/Sign In - No-IP/);

  // Sign in
  await page.getByLabel("Username or Email",).fill(user)
  await page.getByRole('textbox', { name: 'Password' }).fill(pass)
  await page.getByRole('button', { name: "Log in" }).click();

  // Check if we are on dashboard
  await expect(page).toHaveTitle(/My No-IP/);

  // Go to domains
  await page.goto('https://my.noip.com/dynamic-dns')

  //const activateBtn = page.getByRole('link', { name: 'Active' })
  const modifyBtn = page.getByRole('button', { name: 'd Modify' })

  await expect(modifyBtn).toBeInViewport();
});
