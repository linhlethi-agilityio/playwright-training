import { test, expect } from '@/example/fixtures/pages';
import {
  LOGIN_CREDENTIALS,
  CHECKOUT_INFO,
  CHECKOUT_ERROR_MESSAGES,
  CHECKOUT_URLS,
} from '@/example/constants';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Pre-condition: User is logged in and on the Products page with at least one product
    await loginPage.login(LOGIN_CREDENTIALS.STANDARD);
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test.describe('SL009 - CHECKOUT001: Verify user can add products and complete checkout successfully', () => {
    test('should complete checkout process with valid information', async ({
      page,
      inventoryPage,
      cartPage,
      checkoutPage,
    }) => {
      await test.step('Click the "Add to Cart" button to add one or multiple products to the cart', async () => {
        await inventoryPage.addMultipleProductsToCart(2);
      });

      await test.step('Verify the cart icon count increases, and the selected product(s) are added to the cart', async () => {
        const cartBadgeCount = await cartPage.getCartBadgeCount();
        expect(cartBadgeCount).toBe(2);
        await expect(cartPage.cartBadge).toBeVisible();
      });

      await test.step('Click Cart icon', async () => {
        await cartPage.clickCartIcon();
      });

      await test.step('Verify the user is navigated to the cart page, and the added products are displayed', async () => {
        const isOnCartPage = await cartPage.isOnCartPage();
        expect(isOnCartPage).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CART);

        const cartItemsCount = await cartPage.cartItems.count();
        expect(cartItemsCount).toBe(2);
      });

      await test.step('Click "Checkout" button', async () => {
        await cartPage.clickCheckout();
      });

      await test.step('Verify the user is navigated to the checkout page', async () => {
        const isOnCheckoutStepOne = await checkoutPage.isOnCheckoutStepOne();
        expect(isOnCheckoutStepOne).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CHECKOUT_STEP_ONE);
      });

      await test.step('Enter First Name, Last Name and Zip code valid', async () => {
        await checkoutPage.fillCheckoutInfo(CHECKOUT_INFO.VALID);
      });

      await test.step('Verify First Name, Last Name and Zip code fields accept input', async () => {
        await expect(checkoutPage.firstNameInput).toHaveValue(
          CHECKOUT_INFO.VALID.firstName
        );
        await expect(checkoutPage.lastNameInput).toHaveValue(
          CHECKOUT_INFO.VALID.lastName
        );
        await expect(checkoutPage.postalCodeInput).toHaveValue(
          CHECKOUT_INFO.VALID.postalCode
        );
      });

      await test.step('Click "Continue" button', async () => {
        await checkoutPage.clickContinue();
      });

      await test.step('Verify the user is navigated to the checkout overview page, and info bill are displayed', async () => {
        const isOnCheckoutStepTwo = await checkoutPage.isOnCheckoutStepTwo();
        expect(isOnCheckoutStepTwo).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CHECKOUT_STEP_TWO);

        // Verify cart items are still displayed
        const cartItemsCount = await cartPage.cartItems.count();
        expect(cartItemsCount).toBeGreaterThan(0);
      });

      await test.step('Click "Finish" button', async () => {
        await checkoutPage.clickFinish();
      });

      await test.step('Verify the user is navigated to the checkout complete page, and cart clear', async () => {
        const isOnCheckoutComplete = await checkoutPage.isOnCheckoutComplete();
        expect(isOnCheckoutComplete).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CHECKOUT_COMPLETE);
        await expect(checkoutPage.checkoutCompleteContainer).toBeVisible();
        await expect(checkoutPage.completeHeader).toBeVisible();
      });
    });
  });

  test.describe('SL010: Verify error is shown when a checkout field is empty', () => {
    test.beforeEach(async ({ inventoryPage, cartPage }) => {
      // Pre-condition: At least one product exists on cart, User is logged in and on the cart page
      await inventoryPage.addMultipleProductsToCart(1);
      await cartPage.clickCartIcon();
      await cartPage.clickCheckout();
    });

    test('should show error for empty First Name', async ({
      page,
      checkoutPage,
    }) => {
      await test.step('Leave First Name and/or Last Name and/or Zip code blank', async () => {
        await checkoutPage.fillCheckoutInfo(CHECKOUT_INFO.EMPTY_FIRST_NAME);
      });

      await test.step('Click the "Continue" button', async () => {
        await checkoutPage.clickContinue();
      });

      await test.step('Verify that validation errors are shown for empty fields and the user remains on the checkout page', async () => {
        const isOnCheckoutStepOne = await checkoutPage.isOnCheckoutStepOne();
        expect(isOnCheckoutStepOne).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CHECKOUT_STEP_ONE);

        await expect(checkoutPage.getErrorMessage()).toBeVisible();
        await expect(checkoutPage.getErrorMessage()).toContainText(
          CHECKOUT_ERROR_MESSAGES.FIRST_NAME_REQUIRED
        );
      });
    });

    test('should show error for empty Last Name', async ({
      page,
      checkoutPage,
    }) => {
      await test.step('Leave First Name and/or Last Name and/or Zip code blank', async () => {
        await checkoutPage.fillCheckoutInfo(CHECKOUT_INFO.EMPTY_LAST_NAME);
      });

      await test.step('Click the "Continue" button', async () => {
        await checkoutPage.clickContinue();
      });

      await test.step('Verify that validation errors are shown for empty fields and the user remains on the checkout page', async () => {
        const isOnCheckoutStepOne = await checkoutPage.isOnCheckoutStepOne();
        expect(isOnCheckoutStepOne).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CHECKOUT_STEP_ONE);

        await expect(checkoutPage.getErrorMessage()).toBeVisible();
        await expect(checkoutPage.getErrorMessage()).toContainText(
          CHECKOUT_ERROR_MESSAGES.LAST_NAME_REQUIRED
        );
      });
    });

    test('should show error for empty Postal Code', async ({
      page,
      checkoutPage,
    }) => {
      await test.step('Leave First Name and/or Last Name and/or Zip code blank', async () => {
        await checkoutPage.fillCheckoutInfo(CHECKOUT_INFO.EMPTY_POSTAL_CODE);
      });

      await test.step('Click the "Continue" button', async () => {
        await checkoutPage.clickContinue();
      });

      await test.step('Verify that validation errors are shown for empty fields and the user remains on the checkout page', async () => {
        const isOnCheckoutStepOne = await checkoutPage.isOnCheckoutStepOne();
        expect(isOnCheckoutStepOne).toBeTruthy();
        await expect(page).toHaveURL(CHECKOUT_URLS.CHECKOUT_STEP_ONE);

        await expect(checkoutPage.getErrorMessage()).toBeVisible();
        await expect(checkoutPage.getErrorMessage()).toContainText(
          CHECKOUT_ERROR_MESSAGES.POSTAL_CODE_REQUIRED
        );
      });
    });
  });
});
