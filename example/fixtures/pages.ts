import { test as base, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '@/example/pages';

/**
 * Custom Playwright fixtures for page objects.
 */
interface PageFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
}

/**
 * Extends the base test with custom page object fixtures.
 */
const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { test, expect };
