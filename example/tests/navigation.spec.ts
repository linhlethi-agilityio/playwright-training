import { test, expect } from '@/example/fixtures/pages';
import { LOGIN_CREDENTIALS, NAVIGATION_MENU_ITEMS } from '@/example/constants';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Pre-condition: User is logged in and on the Products page
    await loginPage.login(LOGIN_CREDENTIALS.STANDARD);
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test.describe('SL008 - NAVIGATE001: Verify user can navigate to all pages', () => {
    test('should navigate to About page', async ({ page, inventoryPage }) => {
      await test.step('Click the Menu icon', async () => {
        await inventoryPage.openMenu();
      });

      await test.step('Verify menu items are displayed after clicking the Menu icon', async () => {
        await expect(inventoryPage.menuContainer).toBeVisible();
        await expect(inventoryPage.menuItemList).toBeVisible();
      });

      await test.step('Click menu item "About"', async () => {
        await inventoryPage.clickMenuItem(NAVIGATION_MENU_ITEMS.ABOUT.id);
      });

      await test.step('Verify that user successfully navigates to the correct page', async () => {
        await expect(page).toHaveURL(NAVIGATION_MENU_ITEMS.ABOUT.expectedUrl);
      });
    });

    test('should navigate to All Items page', async ({
      page,
      inventoryPage,
    }) => {
      await test.step('Click the Menu icon', async () => {
        await inventoryPage.openMenu();
      });

      await test.step('Verify menu items are displayed after clicking the Menu icon', async () => {
        await expect(inventoryPage.menuContainer).toBeVisible();
        await expect(inventoryPage.menuItemList).toBeVisible();
      });

      await test.step('Click menu item "All Items"', async () => {
        await inventoryPage.clickMenuItem(NAVIGATION_MENU_ITEMS.ALL_ITEMS.id);
      });

      await test.step('Verify that user successfully navigates to the correct page', async () => {
        await expect(page).toHaveURL(
          NAVIGATION_MENU_ITEMS.ALL_ITEMS.expectedUrl
        );
        await expect(inventoryPage.inventoryList).toBeVisible();
      });
    });

    test('should logout successfully', async ({
      page,
      loginPage,
      inventoryPage,
    }) => {
      await test.step('Click the Menu icon', async () => {
        await inventoryPage.openMenu();
      });

      await test.step('Verify menu items are displayed after clicking the Menu icon', async () => {
        await expect(inventoryPage.menuContainer).toBeVisible();
        await expect(inventoryPage.menuItemList).toBeVisible();
      });

      await test.step('Click menu item "Logout"', async () => {
        await inventoryPage.clickMenuItem(NAVIGATION_MENU_ITEMS.LOGOUT.id);
      });

      await test.step('Verify user is logged out and redirected to login page', async () => {
        await expect(page).toHaveURL(NAVIGATION_MENU_ITEMS.LOGOUT.expectedUrl);
        await expect(loginPage.loginButton).toBeVisible();
      });
    });
  });
});
