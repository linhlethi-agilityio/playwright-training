import { Given, When, Then, expect } from './fixtures';
import { ERROR_MESSAGES } from '@pocket-base/constants';

Given('I am on the login page', async ({ loginPage }) => {
  await expect(loginPage.emailInput).toBeVisible();
});

When(
  'I enter email {string} and password {string}',
  async ({ loginPage }, email: string, password: string) => {
    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);
  },
);

When('I click the Login button', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

Then('I should see login error {string}', async ({ loginPage }, error: string) => {
  if (error === ERROR_MESSAGES.REQUIRED) {
    const validationMessage = await loginPage.emailInput.evaluate(
      // eslint-disable-next-line no-undef
      (el) => (el as HTMLInputElement).validationMessage,
    );
    expect(validationMessage.toLowerCase()).toContain(error);
  } else {
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(error);
  }
});

Then('I should remain on the login page', async ({ page, loginPage }) => {
  await expect(page).toHaveURL(/\/demo\/$/);
  await expect(loginPage.signInButton).toBeVisible();
});

Then('I should be redirected to the dashboard', async ({ loginPage }) => {
  await expect(loginPage.frame.locator('nav.main-menu')).toBeVisible();
});
