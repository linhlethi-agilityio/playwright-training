import { test, expect } from '@/example/fixtures/pages';
import { LOGIN_CREDENTIALS, SORT_OPTIONS } from '@/example/constants';

test.describe('Product Sorting Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Pre-condition: User is logged in and on the Products page
    await loginPage.login(LOGIN_CREDENTIALS.STANDARD);
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test.describe('SL004: Verify user can sort products by name (Z to A)', () => {
    test('should sort products in descending order by name', async ({
      inventoryPage,
    }) => {
      await test.step('Click the Sort dropdown', async () => {
        const isSortDropdownVisible =
          await inventoryPage.isSortDropdownVisible();
        expect(isSortDropdownVisible).toBeTruthy();
        await inventoryPage.sortDropdown.click();
      });

      await test.step('Verify sort options are displayed after clicking the Sort dropdown', async () => {
        await expect(inventoryPage.sortDropdown).toBeVisible();
      });

      await test.step('Click "Name (Z to A)" option', async () => {
        await inventoryPage.selectSortOption(SORT_OPTIONS.NAME_Z_TO_A.value);
      });

      await test.step('Verify that products are sorted in descending order by name', async () => {
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort().reverse();

        expect(names).toEqual(sortedNames);

        // Verify the sort order matches the API data (products are in correct order)
        for (let i = 0; i < names.length - 1; i++) {
          expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(
            0
          );
        }
      });

      await test.step('Verify the selected sort option', async () => {
        const currentSortOption = await inventoryPage.getCurrentSortOption();
        expect(currentSortOption).toBe(SORT_OPTIONS.NAME_Z_TO_A.value);
      });
    });
  });

  test.describe('SL005: Verify user can sort products by name (A to Z)', () => {
    test('should sort products in ascending order by name', async ({
      inventoryPage,
    }) => {
      await test.step('Click the Sort dropdown', async () => {
        const isSortDropdownVisible =
          await inventoryPage.isSortDropdownVisible();
        expect(isSortDropdownVisible).toBeTruthy();
        await inventoryPage.sortDropdown.click();
      });

      await test.step('Verify sort options are displayed after clicking the Sort dropdown', async () => {
        await expect(inventoryPage.sortDropdown).toBeVisible();
      });

      await test.step('Click "Name (A to Z)" option', async () => {
        await inventoryPage.selectSortOption(SORT_OPTIONS.NAME_A_TO_Z.value);
      });

      await test.step('Verify that products are sorted in ascending order by name', async () => {
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort();

        expect(names).toEqual(sortedNames);

        // Verify the sort order matches the API data (products are in correct order)
        for (let i = 0; i < names.length - 1; i++) {
          expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
        }
      });

      await test.step('Verify the selected sort option', async () => {
        const currentSortOption = await inventoryPage.getCurrentSortOption();
        expect(currentSortOption).toBe(SORT_OPTIONS.NAME_A_TO_Z.value);
      });
    });
  });

  test.describe('SL006: Verify user can sort products by price (low to high)', () => {
    test('should sort products in ascending order by price', async ({
      inventoryPage,
    }) => {
      await test.step('Click the Sort dropdown', async () => {
        const isSortDropdownVisible =
          await inventoryPage.isSortDropdownVisible();
        expect(isSortDropdownVisible).toBeTruthy();
        await inventoryPage.sortDropdown.click();
      });

      await test.step('Verify sort options are displayed after clicking the Sort dropdown', async () => {
        await expect(inventoryPage.sortDropdown).toBeVisible();
      });

      await test.step('Click "Price (low to high)" option', async () => {
        await inventoryPage.selectSortOption(
          SORT_OPTIONS.PRICE_LOW_TO_HIGH.value
        );
      });

      await test.step('Verify that products are sorted in ascending order by price', async () => {
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sortedPrices);

        // Verify the sort order matches the API data (products are in correct order)
        for (let i = 0; i < prices.length - 1; i++) {
          expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
      });

      await test.step('Verify the selected sort option', async () => {
        const currentSortOption = await inventoryPage.getCurrentSortOption();
        expect(currentSortOption).toBe(SORT_OPTIONS.PRICE_LOW_TO_HIGH.value);
      });
    });
  });

  test.describe('SL007: Verify user can sort products by price (high to low)', () => {
    test('should sort products in descending order by price', async ({
      inventoryPage,
    }) => {
      await test.step('Click the Sort dropdown', async () => {
        const isSortDropdownVisible =
          await inventoryPage.isSortDropdownVisible();
        expect(isSortDropdownVisible).toBeTruthy();
        await inventoryPage.sortDropdown.click();
      });

      await test.step('Verify sort options are displayed after clicking the Sort dropdown', async () => {
        await expect(inventoryPage.sortDropdown).toBeVisible();
      });

      await test.step('Click "Price (high to low)" option', async () => {
        await inventoryPage.selectSortOption(
          SORT_OPTIONS.PRICE_HIGH_TO_LOW.value
        );
      });

      await test.step('Verify that products are sorted in descending order by price', async () => {
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sortedPrices);

        // Verify the sort order matches the API data (products are in correct order)
        for (let i = 0; i < prices.length - 1; i++) {
          expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
      });

      await test.step('Verify the selected sort option', async () => {
        const currentSortOption = await inventoryPage.getCurrentSortOption();
        expect(currentSortOption).toBe(SORT_OPTIONS.PRICE_HIGH_TO_LOW.value);
      });
    });
  });
});
