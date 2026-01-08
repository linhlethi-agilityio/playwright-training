import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@/example/pages';

/**
 * Custom Playwright fixtures for page objects.
 * Provides InventoryPage, CartPage, and CheckoutPage instances for tests.
 */
interface PageFixtures {
  loginPage: LoginPage;
}

/**
 * Extends the base test with custom page object fixtures.
 * - Navigates to the inventory page and provides InventoryPage instance.
 * - Provides CartPage and CheckoutPage instances.
 */
const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { test, expect };
