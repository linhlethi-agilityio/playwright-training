import { test, expect } from '@/example/fixtures/pages';
import { LOGIN_CREDENTIALS, LOGIN_ERROR_MESSAGES } from '@/example/constants';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Sauce Demo Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.describe('SL001 - Empty Login Fields Validation', () => {
    test('should show error for empty username and password', async ({
      page,
      loginPage,
    }) => {
      await test.step('Leave username and password blank and submit', async () => {
        await loginPage.clickLogin();
      });

      await test.step('Verify error message for empty username', async () => {
        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText(
          LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED
        );
      });

      await test.step('Verify user remains on login page', async () => {
        await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
        await expect(loginPage.loginButton).toBeVisible();
      });
    });

    test('should show error for empty username only', async ({
      page,
      loginPage,
    }) => {
      await test.step('Leave username blank and submit', async () => {
        await loginPage.fillPassword('secret_sauce');
        await loginPage.clickLogin();
      });

      await test.step('Verify error message for empty username', async () => {
        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText(
          LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED
        );
      });

      await test.step('Verify user remains on login page', async () => {
        await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
      });
    });

    test('should show error for empty password only', async ({
      page,
      loginPage,
    }) => {
      await test.step('Leave password blank and submit', async () => {
        await loginPage.fillUsername('standard_user');
        await loginPage.clickLogin();
      });

      await test.step('Verify error message for empty password', async () => {
        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText(
          LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED
        );
      });

      await test.step('Verify user remains on login page', async () => {
        await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
      });
    });
  });

  test.describe('SL002 - Locked Out User', () => {
    test('should show error for locked out user', async ({
      page,
      loginPage,
    }) => {
      await test.step('Fill in locked out user credentials and submit', async () => {
        await loginPage.login(LOGIN_CREDENTIALS.LOCKED_OUT);
      });

      await test.step('Verify error message for locked out user', async () => {
        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText(
          LOGIN_ERROR_MESSAGES.LOCKED_OUT
        );
      });

      await test.step('Verify user remains on login page', async () => {
        await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
        await expect(loginPage.loginButton).toBeVisible();
      });
    });
  });

  test.describe('SL003 - Valid Credentials Login', () => {
    test('should login successfully with valid credentials', async ({
      page,
      loginPage,
    }) => {
      await test.step('Fill valid credentials and submit', async () => {
        await loginPage.login(LOGIN_CREDENTIALS.STANDARD);
      });

      await test.step('Verify successful login', async () => {
        await expect(page).toHaveURL(/.*\/inventory\.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
      });

      await test.step('Verify products are displayed', async () => {
        await expect(page.locator('.inventory_item')).toHaveCount(6);
      });
    });
  });
});
