// Common steps shared across multiple feature files
import { Then, expect } from './fixtures';

// Used by: create-user, delete-user, update-user features
Then('I should see the message {string}', async ({ page }, message: string) => {
  await expect(page.frameLocator('iframe').getByText(message)).toBeVisible();
});

// Used by: delete-user feature
Then('I should see {string}', async ({ page }, text: string) => {
  await expect(
    page.frameLocator('iframe').locator('*').filter({ hasText: new RegExp(text) }).first()
  ).toBeVisible();
});
