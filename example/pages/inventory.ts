import { Page, Locator } from '@playwright/test';
import { WEBSITE, NAVIGATION_SELECTORS, NAVIGATION_MENU_ITEMS, INVENTORY_SELECTORS } from '@/example/constants';

/**
 * Page Object Model for the Inventory (Products) page.
 */
export class InventoryPage {
  readonly menuButton: Locator;
  readonly menuContainer: Locator;
  readonly menuItemList: Locator;
  readonly menuCloseButton: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;

  /**
   * Initializes the InventoryPage with a Playwright Page object.
   * @param page Playwright Page instance
   */
  constructor(readonly page: Page) {
    this.menuButton = this.page.locator(NAVIGATION_SELECTORS.MENU_BUTTON);
    this.menuContainer = this.page.locator(NAVIGATION_SELECTORS.MENU_CONTAINER);
    this.menuItemList = this.page.locator(NAVIGATION_SELECTORS.MENU_ITEM_LIST);
    this.menuCloseButton = this.page.locator(NAVIGATION_SELECTORS.MENU_CLOSE_BUTTON);
    this.inventoryList = this.page.locator(INVENTORY_SELECTORS.INVENTORY_LIST);
    this.inventoryItems = this.page.locator(INVENTORY_SELECTORS.INVENTORY_ITEM);
    this.sortDropdown = this.page.locator(INVENTORY_SELECTORS.SORT_DROPDOWN);
    this.inventoryItemNames = this.page.locator(INVENTORY_SELECTORS.INVENTORY_ITEM_NAME);
    this.inventoryItemPrices = this.page.locator(INVENTORY_SELECTORS.INVENTORY_ITEM_PRICE);
  }

  /**
   * Navigates to the inventory page.
   */
  async goto() {
    await this.page.goto(`${WEBSITE}inventory.html`);
  }

  /**
   * Opens the navigation menu.
   */
  async openMenu() {
    await this.menuButton.click();
  }

  /**
   * Closes the navigation menu.
   */
  async closeMenu() {
    await this.menuCloseButton.click();
  }

  /**
   * Clicks a menu item by its ID.
   * @param menuItemId Menu item selector ID
   */
  async clickMenuItem(menuItemId: string) {
    await this.page.locator(menuItemId).click();
  }

  /**
   * Navigates to a specific menu item.
   * @param menuItem Menu item from NAVIGATION_MENU_ITEMS constant
   */
  async navigateToMenuItem(menuItem: typeof NAVIGATION_MENU_ITEMS[keyof typeof NAVIGATION_MENU_ITEMS]) {
    await this.openMenu();
    await this.clickMenuItem(menuItem.id);
  }

  /**
   * Gets a menu item locator by its ID.
   * @param menuItemId Menu item selector ID
   * @returns Menu item locator
   */
  getMenuItem(menuItemId: string) {
    return this.page.locator(menuItemId);
  }

  /**
   * Checks if the menu is visible.
   * @returns True if menu is visible
   */
  async isMenuVisible() {
    return await this.menuContainer.isVisible();
  }

  /**
   * Checks if user is on the inventory page.
   * @returns True if on inventory page
   */
  async isOnInventoryPage() {
    return this.page.url().includes('inventory.html');
  }

  /**
   * Selects a sort option from the dropdown.
   * @param sortValue Sort option value
   */
  async selectSortOption(sortValue: string) {
    await this.sortDropdown.selectOption(sortValue);
  }

  /**
   * Gets all product names as an array of strings.
   * @returns Array of product names
   */
  async getProductNames(): Promise<string[]> {
    return await this.inventoryItemNames.allTextContents();
  }

  /**
   * Gets all product prices as an array of numbers.
   * @returns Array of product prices
   */
  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrices.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Checks if sort dropdown is visible.
   * @returns True if sort dropdown is visible
   */
  async isSortDropdownVisible() {
    return await this.sortDropdown.isVisible();
  }

  /**
   * Gets the current selected sort option value.
   * @returns Current sort option value
   */
  async getCurrentSortOption(): Promise<string> {
    return await this.sortDropdown.inputValue();
  }

  /**
   * Adds a product to cart by product name.
   * @param productName Product name to add to cart
   */
  async addProductToCart(productName: string) {
    const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
    const addButton = productItem.locator('button[data-test^="add-to-cart"]');
    await addButton.click();
  }

  /**
   * Adds the first N products to cart.
   * @param count Number of products to add
   */
  async addMultipleProductsToCart(count: number) {
    const addButtons = this.page.locator('button[data-test^="add-to-cart"]');
    for (let i = 0; i < count; i++) {
      await addButtons.nth(i).click();
    }
  }
}
