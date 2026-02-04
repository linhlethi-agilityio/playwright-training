import type { FrameLocator, Locator, Page } from '@playwright/test';

import { WEBSITE, MESSAGES } from '@pocket-base/constants';
import { TableHelper } from '@pocket-base/utils';

export class UsersPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly table: TableHelper;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly searchInput: Locator;
  readonly noRecordsMessage: Locator;
  readonly newRecordButton: Locator;
  readonly createButton: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');
    this.table = new TableHelper(this.frame, page);
    this.deleteButton = this.frame.getByRole('button', {
      name: 'Delete selected',
    });
    this.confirmDeleteButton = this.frame.getByRole('button', { name: 'Yes' });
    this.searchInput = this.frame.getByRole('textbox').nth(1);
    this.noRecordsMessage = this.frame.getByText(MESSAGES.NO_RECORDS_FOUND);
    this.newRecordButton = this.frame.getByRole('button', {
      name: 'New record',
    });
    this.createButton = this.frame.getByRole('button', { name: 'Create' });
    this.saveChangesButton = this.frame.getByRole('button', {
      name: 'Save changes',
    });
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
    return this.table.getCheckbox(email);
  }

  waitForApiResponse(method: string, urlPattern: string) {
    return this.page.waitForResponse(
      response =>
        response.url().includes(urlPattern) &&
        response.request().method() === method
    );
  }

  getColumnSortButton(fieldName: string) {
    return this.table.getColumnHeader(fieldName);
  }

  async getColumnValues(fieldName: string): Promise<string[]> {
    return this.table.getColumnValues(fieldName);
  }

  async clickSort(fieldName: string) {
    await this.table.clickSort(fieldName);
  }

  async fillSearch(value: string) {
    await this.searchInput.fill(value);
  }

  async clickSearch() {
    await this.searchInput.press('Enter');
    await this.frame
      .locator('.table-loading')
      .waitFor({ state: 'hidden' })
      .catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clearSearch() {
    await this.searchInput.clear();
    await this.clickSearch();
  }

  private getFormFieldContainer(label: string) {
    return this.frame.locator('.form-field', {
      has: this.frame.locator(`label .txt`, {
        hasText: new RegExp(`^${label}$`),
      }),
    });
  }

  getFormField(label: string) {
    return this.getFormFieldContainer(label).locator('input, textarea');
  }

  getFormFieldError(label: string) {
    return this.getFormFieldContainer(label).locator('.help-block');
  }

  async getFormFieldValidationMessage(label: string): Promise<string> {
    const input = this.getFormField(label);
    const browserMessage = await input.evaluate(
      // eslint-disable-next-line no-undef
      el => (el as HTMLInputElement).validationMessage
    );
    if (browserMessage) return browserMessage;

    const helpBlock = this.getFormFieldError(label);
    await helpBlock.waitFor();
    return helpBlock.innerText();
  }

  async clickNewRecord() {
    await this.newRecordButton.click();
    await this.createButton.waitFor();
  }

  async clickCreate() {
    await this.createButton.click();
  }

  async clickUserRow(email: string) {
    await this.table.getRow(email).click();
    await this.saveChangesButton.waitFor();
    await this.frame
      .locator('.btn-loading')
      .waitFor({ state: 'hidden' });
  }

  async clickChangePassword() {
    await this.frame.getByText('Change password').click();
    await this.getFormField('Password').waitFor();
  }

  async clickSaveChanges() {
    await this.saveChangesButton.click();
  }

  async fillCreateForm(data: Record<string, unknown>) {
    const fieldMap: Record<string, string> = {
      id: 'id',
      email: 'email',
      password: 'Password',
      passwordConfirm: 'Password confirm',
      username: 'username',
      name: 'name',
    };

    for (const [key, label] of Object.entries(fieldMap)) {
      if (typeof data[key] === 'string') {
        await this.getFormField(label).fill(data[key]);
      }
    }
  }
}
