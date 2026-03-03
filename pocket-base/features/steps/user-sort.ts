import { Given, When, Then, expect } from './fixtures';
import { isAscending, isDescending } from '@pocket-base/utils';

Given('I have {int} prepared users on the sort users page', async ({ sortUsersPage }) => {
  await expect(sortUsersPage.frame.locator('table')).toBeVisible();
});

When('I click sort on column {string}', async ({ sortUsersPage }, column: string) => {
  await sortUsersPage.clickSort(column);
});

Then(
  'column {string} should be sorted in descending order',
  async ({ sortUsersPage }, column: string) => {
    const values = await sortUsersPage.getColumnValues(column);
    expect(isDescending(values)).toBeTruthy();
  },
);

Then(
  'column {string} should be sorted in ascending order',
  async ({ sortUsersPage }, column: string) => {
    const values = await sortUsersPage.getColumnValues(column);
    expect(isAscending(values)).toBeTruthy();
  },
);
