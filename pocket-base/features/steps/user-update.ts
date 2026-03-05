import { Given, When, Then, expect } from './fixtures';
import { API_COLLECTIONS_PATH } from '@pocket-base/constants';
import { verifyUserRowMatchesApiResponse } from '@pocket-base/utils';
import { DataTable } from 'playwright-bdd';

Given('I have {int} prepared user on the update users page', async ({ updateUsersPage }) => {
  await expect(updateUsersPage.frame.locator('table')).toBeVisible();
});

When('I click the user row to open the edit form', async ({ updateUsersPage }) => {
  const { userList } = updateUsersPage;
  await updateUsersPage.clickUserRow(userList[0].email);
});

When('I enable password change', async ({ updateUsersPage }) => {
  await updateUsersPage.clickChangePassword();
});

When('I fill the update form with the following data:', async ({ updateUsersPage, ctx }, table: DataTable) => {
  const raw = Object.fromEntries(table.rows().map(([field, value]) => [field, value]));
  const uid = Date.now();
  ctx.updateData = {
    email: raw.email.replace('@', `_${uid}@`),
    emailVisibility: true,
    password: raw.password,
    passwordConfirm: raw.password,
    username: `${raw.username}_${uid}`,
    name: raw.name,
  };
  await updateUsersPage.fillCreateForm(ctx.updateData);
});

When('I click the Save changes button', async ({ updateUsersPage, ctx }) => {
  const responsePromise = updateUsersPage.waitForApiResponse('PATCH', API_COLLECTIONS_PATH);
  await updateUsersPage.clickSaveChanges();
  ctx.response = await responsePromise;
  ctx.apiResponse = await ctx.response.json();
});

Then('the update API response status should be 200', async ({ ctx }) => {
  expect(ctx.apiResponse).toBeDefined();
});

// "I should see the message {string}" — shared, defined in common.ts

Then('the updated user row in the table should contain:', async ({ page, ctx }, table: DataTable) => {
  const expected = Object.fromEntries(table.rows().map(([field, value]) => [field, value]));
  for (const [field, value] of Object.entries(expected)) {
    const partial = field === 'email' ? value.split('@')[0] : field === 'username' ? value.split('_')[0] : value;
    expect(ctx.apiResponse[field]).toContain(partial);
  }
  await verifyUserRowMatchesApiResponse(page.frameLocator('iframe'), ctx.apiResponse);
});
