import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@/example/pages';

const AUTH_STATE_PATH = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Perform authentication steps
  await loginPage.goto();

  await loginPage.fillUsername('standard_user');
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLogin();

  // Wait until the page receives the cookies
  await expect(page).toHaveURL(/.*\/inventory\.html/);

  // End of authentication steps
  await page.context().storageState({ path: AUTH_STATE_PATH });
});
