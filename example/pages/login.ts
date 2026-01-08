import { Page, Locator } from '@playwright/test';
import { WEBSITE, LOGIN_CREDENTIALS } from '@/example/constants';

/**
 * Page Object Model for the Login page.
 */
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes the LoginPage with a Playwright Page object.
   * @param page Playwright Page instance
   */
  constructor(readonly page: Page) {
    this.usernameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page (base URL).
   */
  async goto() {
    await this.page.goto(WEBSITE);
  }

  /**
   * Fills the username field.
   * @param username Username to fill
   */
  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fills the password field.
   * @param password Password to fill
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button.
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Navigates to the login page and logs in with the provided user credentials (defaults to standard user).
   * @param user User credentials object (default: LOGIN_CREDENTIALS.STANDARD)
   */
  async login(
    user:
      | (typeof LOGIN_CREDENTIALS)[keyof typeof LOGIN_CREDENTIALS]
      | { username: string; password: string } = LOGIN_CREDENTIALS.STANDARD
  ) {
    await this.goto();
    await this.fillUsername(user.username);
    await this.fillPassword(user.password);
    await this.clickLogin();
  }

  /**
   * Gets the error message locator.
   * @returns Error message locator
   */
  getErrorMessage() {
    return this.errorMessage;
  }

  /**
   * Checks if user is on the login page.
   * @returns True if on login page
   */
  async isOnLoginPage() {
    return this.page.url().includes(WEBSITE);
  }
}
