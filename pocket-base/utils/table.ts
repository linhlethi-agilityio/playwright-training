import type { FrameLocator, Locator, Page } from '@playwright/test';

export class TableHelper {
  constructor(
    private frame: FrameLocator,
    private page?: Page
  ) {}

  getRow(name: string) {
    return this.frame.getByRole('row', { name });
  }

  getCell(row: Locator, name: string, exact = true) {
    return row.getByRole('cell', { name, exact });
  }

  getCheckbox(rowName: string) {
    return this.getRow(rowName).locator('.form-field label');
  }

  getColumnHeader(fieldName: string) {
    return this.frame.locator(`table thead th.col-field-${fieldName}`);
  }

  async getColumnValues(fieldName: string): Promise<string[]> {
    const cells = this.frame.locator(
      `table tbody tr td.col-field-${fieldName}`
    );
    await cells.first().waitFor();
    const values = await cells.allTextContents();
    return values.map(v => v.trim());
  }

  async clickSort(fieldName: string) {
    await this.getColumnHeader(fieldName).click();
    await this.frame
      .locator('.table-loading')
      .waitFor({ state: 'hidden' })
      .catch(() => {});
    await this.page?.waitForTimeout(500);
  }
}
