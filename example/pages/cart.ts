import { Page, Locator } from '@playwright/test';
import { WEBSITE } from '@/example/constants';

/**
 * Page Object Model for the Cart page.
 */
export class CartPage {
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  /**
   * Initializes the CartPage with a Playwright Page object.
   * @param page Playwright Page instance
   */
  constructor(readonly page: Page) {
    this.cartBadge = this.page.locator('.shopping_cart_badge');
    this.cartLink = this.page.locator('.shopping_cart_link');
    this.cartItems = this.page.locator('.cart_item');
    this.cartItemNames = this.page.locator('.inventory_item_name');
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = this.page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.removeButtons = this.page.getByRole('button', { name: /remove/i });
  }

  /**
   * Navigates to the cart page.
   */
  async goto() {
    await this.page.goto(`${WEBSITE}cart.html`);
  }

  /**
   * Clicks the cart icon to navigate to cart page.
   */
  async clickCartIcon() {
    await this.cartLink.click();
  }

  /**
   * Clicks the checkout button.
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Gets the cart badge count.
   * @returns Cart badge count as number
   */
  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }

  /**
   * Gets all cart item names.
   * @returns Array of cart item names
   */
  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  /**
   * Checks if cart is empty.
   * @returns True if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    const count = await this.cartItems.count();
    return count === 0;
  }

  /**
   * Checks if user is on the cart page.
   * @returns True if on cart page
   */
  async isOnCartPage(): Promise<boolean> {
    return this.page.url().includes('cart.html');
  }
}
