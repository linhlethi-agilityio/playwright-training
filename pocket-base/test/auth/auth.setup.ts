import { test as setup, expect } from '@playwright/test';

import { AUTH_STATE_PATH } from '@pocket-base/constants';
import { LOGIN_LOGIN_CREDENTIALS } from '@pocket-base/data';
import { LoginPage } from '@pocket-base/pages';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Perform authentication steps
  await loginPage.goto();

  await loginPage.fillEmail(LOGIN_LOGIN_CREDENTIALS.email);
  await loginPage.fillPassword(LOGIN_LOGIN_CREDENTIALS.password);
  await loginPage.clickLogin();

  // Wait until the page redirects to dashboard (inside iframe)
  await expect(loginPage.frame.locator('nav')).toBeVisible();

  // End of authentication steps
  await page.context().storageState({ path: AUTH_STATE_PATH });
});
