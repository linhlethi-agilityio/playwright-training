import {
  LOGIN_LOGIN_CREDENTIALS,
  WRONG_LOGIN_CREDENTIALS,
  ERROR_MESSAGES,
} from '@pocket-base/constants';
import { test, expect } from '@pocket-base/fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('LO01 - PocketBase Login', () => {
  test.describe('Empty Login Fields Validation', () => {
    test(
      'should show validation error for empty login fields',
      { tag: ['@PK001', '@auth', '@login'] },
      async ({ loginPage, page }) => {
        await test.step('Clear fields and click Login', async () => {
          await loginPage.emailInput.clear();
          await loginPage.passwordInput.clear();
          await loginPage.clickLogin();
        });

        await test.step('Verify validation error for empty fields', async () => {
          const validationMessage = await loginPage.emailInput.evaluate(
            // eslint-disable-next-line no-undef
            el => (el as HTMLInputElement).validationMessage
          );
          expect(validationMessage.toLowerCase()).toContain(
            ERROR_MESSAGES.REQUIRED
          );
        });

        await test.step('Verify user remains on login page', async () => {
          await expect(page).toHaveURL(/\/demo\/$/);
          await expect(loginPage.signInButton).toBeVisible();
        });
      }
    );
  });

  test.describe('Wrong Login Credentials', () => {
    test(
      'should show error for wrong login credentials',
      { tag: ['@PK002', '@auth', '@login'] },
      async ({ loginPage, page }) => {
        await test.step('Enter wrong login credentials', async () => {
          await loginPage.fillEmail(WRONG_LOGIN_CREDENTIALS.email);
          await loginPage.fillPassword(WRONG_LOGIN_CREDENTIALS.password);
        });

        await test.step('Click the Login button', async () => {
          await loginPage.clickLogin();
        });

        await test.step('Verify invalid credentials error message', async () => {
          await expect(loginPage.errorMessage).toBeVisible();
          await expect(loginPage.errorMessage).toContainText(
            ERROR_MESSAGES.INVALID_CREDENTIALS
          );
        });

        await test.step('Verify user remains on login page', async () => {
          await expect(page).toHaveURL(/\/demo\/$/);
          await expect(loginPage.signInButton).toBeVisible();
        });
      }
    );
  });

  test.describe('Valid Credentials Login', () => {
    test(
      'should login successfully with valid credentials',
      { tag: ['@PK003', '@auth', '@login'] },
      async ({ loginPage }) => {
        await test.step('Enter valid email and password', async () => {
          await loginPage.fillEmail(LOGIN_LOGIN_CREDENTIALS.email);
          await loginPage.fillPassword(LOGIN_LOGIN_CREDENTIALS.password);
        });

        await test.step('Click the Login button', async () => {
          await loginPage.clickLogin();
        });

        await test.step('Verify user is redirected to dashboard', async () => {
          await expect(loginPage.frame.locator('nav')).toBeVisible();
        });
      }
    );
  });
});
