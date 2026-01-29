import type { FrameLocator, Locator, Page } from '@playwright/test';

import { WEBSITE } from '@pocket-base/constants';

export class UsersPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');
    this.deleteButton = this.frame.getByRole('button', {
      name: 'Delete selected',
    });
    this.confirmDeleteButton = this.frame.getByRole('button', { name: 'Yes' });
  }

  async navigateTo() {
    await this.page.goto(WEBSITE);
    await this.frame.locator('nav.main-menu').waitFor();
    await this.frame.getByRole('link', { name: 'users' }).click();
  }

  getUserByEmail(email: string) {
    return this.frame.getByText(email);
  }

  getUserDeleteCheckbox(email: string) {
    const userRow = this.frame.locator('table tbody tr', {
      has: this.frame.locator(`text=${email}`),
    });
    return userRow.locator('.form-field label');
  }

  waitForApiResponse(method: string, urlPattern: string) {
    return this.page.waitForResponse(
      (response) =>
        response.url().includes(urlPattern) &&
        response.request().method() === method
    );
  }
}
