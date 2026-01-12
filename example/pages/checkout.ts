import { Page, Locator } from '@playwright/test';
import { WEBSITE, CHECKOUT_INFO } from '@/example/constants';

/**
 * Page Object Model for the Checkout page.
 */
export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly checkoutCompleteContainer: Locator;
  readonly completeHeader: Locator;

  /**
   * Initializes the CheckoutPage with a Playwright Page object.
   * @param page Playwright Page instance
   */
  constructor(readonly page: Page) {
    this.firstNameInput = this.page.getByPlaceholder('First Name');
    this.lastNameInput = this.page.getByPlaceholder('Last Name');
    this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = this.page.locator('[data-test="error"]');
    this.checkoutCompleteContainer = this.page.locator(
      '#checkout_complete_container'
    );
    this.completeHeader = this.page.getByRole('heading', {
      name: /thank you for your order/i,
    });
  }

  /**
   * Navigates to the checkout step one page.
   */
  async gotoStepOne() {
    await this.page.goto(`${WEBSITE}checkout-step-one.html`);
  }

  /**
   * Fills the first name field.
   * @param firstName First name to fill
   */
  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fills the last name field.
   * @param lastName Last name to fill
   */
  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fills the postal code field.
   * @param postalCode Postal code to fill
   */
  async fillPostalCode(postalCode: string) {
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Fills all checkout information fields.
   * @param info Checkout information object
   */
  async fillCheckoutInfo(
    info: (typeof CHECKOUT_INFO)[keyof typeof CHECKOUT_INFO]
  ) {
    await this.fillFirstName(info.firstName);
    await this.fillLastName(info.lastName);
    await this.fillPostalCode(info.postalCode);
  }

  /**
   * Clicks the continue button.
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Clicks the finish button.
   */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Clicks the cancel button.
   */
  async clickCancel() {
    await this.cancelButton.click();
  }

  /**
   * Gets the error message locator.
   * @returns Error message locator
   */
  getErrorMessage() {
    return this.errorMessage;
  }

  /**
   * Checks if user is on checkout step one page.
   * @returns True if on checkout step one page
   */
  async isOnCheckoutStepOne(): Promise<boolean> {
    return this.page.url().includes('checkout-step-one.html');
  }

  /**
   * Checks if user is on checkout step two page.
   * @returns True if on checkout step two page
   */
  async isOnCheckoutStepTwo(): Promise<boolean> {
    return this.page.url().includes('checkout-step-two.html');
  }

  /**
   * Checks if user is on checkout complete page.
   * @returns True if on checkout complete page
   */
  async isOnCheckoutComplete(): Promise<boolean> {
    return this.page.url().includes('checkout-complete.html');
  }
}
