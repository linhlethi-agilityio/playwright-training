import type { FrameLocator, Locator, Page } from '@playwright/test';

// Constants
import { WEBSITE } from '@pocket-base/constants';

export class LoginPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');
    this.emailInput = this.frame.getByRole('textbox', { name: 'Email' });
    this.passwordInput = this.frame.getByRole('textbox', { name: 'Password' });
    this.signInButton = this.frame.getByRole('button', { name: 'Login' });
    this.errorMessage = this.frame.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto(WEBSITE);
    await this.emailInput.waitFor();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
