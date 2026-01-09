import { Page, Locator } from '@playwright/test';
import { WEBSITE, NAVIGATION_SELECTORS, NAVIGATION_MENU_ITEMS } from '@/example/constants';

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

  /**
   * Initializes the InventoryPage with a Playwright Page object.
   * @param page Playwright Page instance
   */
  constructor(readonly page: Page) {
    this.menuButton = this.page.locator(NAVIGATION_SELECTORS.MENU_BUTTON);
    this.menuContainer = this.page.locator(NAVIGATION_SELECTORS.MENU_CONTAINER);
    this.menuItemList = this.page.locator(NAVIGATION_SELECTORS.MENU_ITEM_LIST);
    this.menuCloseButton = this.page.locator(NAVIGATION_SELECTORS.MENU_CLOSE_BUTTON);
    this.inventoryList = this.page.locator('.inventory_list');
    this.inventoryItems = this.page.locator('.inventory_item');
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
}
