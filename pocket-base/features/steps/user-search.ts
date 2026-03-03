import { Given, When, Then, expect } from './fixtures';
import { searchUsers } from '@pocket-base/services';

Given('I have {int} prepared user on the search users page', async ({ searchUsersPage }) => {
  await expect(searchUsersPage.frame.locator('table')).toBeVisible();
});

When('I search by the user email', async ({ searchUsersPage, ctx }) => {
  ctx.searchValue = searchUsersPage.userList[0].email;
  await searchUsersPage.fillSearch(ctx.searchValue);
  await searchUsersPage.clickSearch();
});

When('I search for {string}', async ({ searchUsersPage, ctx }, value: string) => {
  ctx.searchValue = value;
  await searchUsersPage.fillSearch(value);
  await searchUsersPage.clickSearch();
});

Then('all results should contain the search value', async ({ searchUsersPage, ctx }) => {
  const uiEmails = await searchUsersPage.getColumnValues('email');
  for (const email of uiEmails) {
    expect(email).toContain(ctx.searchValue);
  }
});

Then(
  'the API should return no users for {string}',
  async ({ apiContext }, value: string) => {
    const apiUsers = await searchUsers(apiContext, value);
    expect(apiUsers.length).toBe(0);
  },
);

Then('I should see the no records found message', async ({ searchUsersPage }) => {
  await expect(searchUsersPage.noRecordsMessage).toBeVisible();
});

Then('I clear the search field', async ({ searchUsersPage }) => {
  await searchUsersPage.clearSearch();
});
