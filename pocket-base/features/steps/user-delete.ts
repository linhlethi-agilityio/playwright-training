import { Given, When, Then, expect } from './fixtures';
import { API_COLLECTIONS_PATH, CONFIRM_MESSAGES } from '@pocket-base/constants';

Given('I have {int} prepared user on the delete users page', async ({ deleteUsersPage }) => {
  await expect(deleteUsersPage.frame.locator('table')).toBeVisible();
});

Given('I have {int} prepared users on the delete users page', async ({ deleteMultipleUsersPage }) => {
  await expect(deleteMultipleUsersPage.frame.locator('table')).toBeVisible();
});

Given('the user exists in the table', async ({ deleteUsersPage }) => {
  const { userList } = deleteUsersPage;
  await expect(deleteUsersPage.getUserByEmail(userList[0].email)).toBeVisible();
});

Given('all users exist in the table', async ({ deleteMultipleUsersPage }) => {
  const { userList } = deleteMultipleUsersPage;
  for (const user of userList) {
    await expect(deleteMultipleUsersPage.getUserByEmail(user.email)).toBeVisible();
  }
});

When('I select the checkbox of the user to delete', async ({ deleteUsersPage }) => {
  const { userList } = deleteUsersPage;
  await deleteUsersPage.getUserDeleteCheckbox(userList[0].email).click();
});

When('I select the checkboxes of all users to delete', async ({ deleteMultipleUsersPage }) => {
  const { userList } = deleteMultipleUsersPage;
  for (const user of userList) {
    await deleteMultipleUsersPage.getUserDeleteCheckbox(user.email).click();
  }
});

When('I click the Delete selected button', async ({ deleteUsersPage }) => {
  await deleteUsersPage.deleteButton.click();
});

When('I click the Delete selected button for multiple', async ({ deleteMultipleUsersPage }) => {
  await deleteMultipleUsersPage.deleteButton.click();
});

Then('I should see the single delete confirmation dialog', async ({ deleteUsersPage }) => {
  await expect(deleteUsersPage.frame.getByText(CONFIRM_MESSAGES.DELETE_RECORD)).toBeVisible();
});

Then('I should see the multiple delete confirmation dialog', async ({ deleteMultipleUsersPage }) => {
  await expect(deleteMultipleUsersPage.frame.getByText(CONFIRM_MESSAGES.DELETE_RECORDS)).toBeVisible();
});

When('I confirm the deletion', async ({ deleteUsersPage, ctx }) => {
  const responsePromise = deleteUsersPage.waitForApiResponse('DELETE', API_COLLECTIONS_PATH);
  await deleteUsersPage.confirmDeleteButton.click();
  ctx.response = await responsePromise;
});

When('I confirm the multiple deletion', async ({ deleteMultipleUsersPage, ctx }) => {
  const responsePromise = deleteMultipleUsersPage.waitForApiResponse('DELETE', API_COLLECTIONS_PATH);
  await deleteMultipleUsersPage.confirmDeleteButton.click();
  ctx.response = await responsePromise;
});

Then('the delete API response status should be {int}', async ({ ctx }, status: number) => {
  expect(ctx.response?.status()).toBe(status);
});

Then('the user should be removed from the table', async ({ deleteUsersPage }) => {
  const { userList } = deleteUsersPage;
  await expect(deleteUsersPage.getUserByEmail(userList[0].email)).not.toBeVisible();
  userList.length = 0;
});

Then('all users should be removed from the table', async ({ deleteMultipleUsersPage }) => {
  const { userList } = deleteMultipleUsersPage;
  for (const user of userList) {
    await expect(deleteMultipleUsersPage.getUserByEmail(user.email)).not.toBeVisible();
  }
  userList.length = 0;
});
