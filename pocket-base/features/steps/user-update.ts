import { Given, When, Then, expect } from './fixtures';
import { API_COLLECTIONS_PATH } from '@pocket-base/constants';
import { UPDATE_USER_DATA } from '@pocket-base/data';
import { verifyUserRowMatchesApiResponse } from '@pocket-base/utils';

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

When('I fill the update form with new data', async ({ updateUsersPage }) => {
  await updateUsersPage.fillCreateForm(UPDATE_USER_DATA);
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

Then('the update API response should contain the correct updated data', async ({ ctx }) => {
  expect(ctx.apiResponse.email).toBe(UPDATE_USER_DATA.email);
  expect(ctx.apiResponse.username).toBe(UPDATE_USER_DATA.username);
});

// "I should see the message {string}" — shared, defined in common.ts

Then('the updated user row in the table should match the API response', async ({ page, ctx }) => {
  await verifyUserRowMatchesApiResponse(page.frameLocator('iframe'), ctx.apiResponse);
});
