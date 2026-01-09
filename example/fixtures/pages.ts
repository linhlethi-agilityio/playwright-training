import { test as base, expect } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
} from '@/example/pages';

/**
 * Custom Playwright fixtures for page objects.
 */
interface PageFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

/**
 * Extends the base test with custom page object fixtures.
 */
const test = base.extend<PageFixtures>({
  /**
   * loginPage fixture.
   * Provides a CheckoutPage instance.
   */
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  /**
   * inventoryPage fixture.
   * Provides a CheckoutPage instance.
   */
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  /**
   * cartPage fixture.
   * Provides a CheckoutPage instance.
   */
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  /**
   * checkoutPage fixture.
   * Provides a CheckoutPage instance.
   */
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { test, expect };
