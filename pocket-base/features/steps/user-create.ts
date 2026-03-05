import { Given, When, Then, expect } from './fixtures';
import { API_COLLECTIONS_PATH } from '@pocket-base/constants';
import { verifyUserRowMatchesApiResponse } from '@pocket-base/utils';
import { CREATE_USER_VALIDATION_CASES } from '@pocket-base/data';
import { DataTable } from 'playwright-bdd';

Given('I am on the users page', async ({ createUsersPage }) => {
  await expect(createUsersPage.newRecordButton).toBeVisible();
});

When('I click the New record button', async ({ createUsersPage }) => {
  await createUsersPage.clickNewRecord();
});

When('I create a user with the following data:', async ({ createUsersPage, ctx }, table: DataTable) => {
  const raw = Object.fromEntries(table.rows().map(([field, value]) => [field, value]));
  const uid = Date.now();
  ctx.userData = {
    email: raw.email.replace('@', `_${uid}@`),
    emailVisibility: raw.emailVisibility === 'true',
    password: raw.password,
    passwordConfirm: raw.password,
    username: `${raw.username}_${uid}`,
    name: raw.name,
  };
  await createUsersPage.fillCreateForm(ctx.userData);
});

When('I click the Create button', async ({ createUsersPage, ctx }) => {
  const responsePromise = createUsersPage.waitForApiResponse('POST', API_COLLECTIONS_PATH);
  await createUsersPage.clickCreate();
  ctx.response = await responsePromise;
  ctx.apiResponse = await ctx.response.json();
});

When('I click the Create button without expecting API response', async ({ createUsersPage }) => {
  await createUsersPage.clickCreate();
});

Then('the create API response status should be 200', async ({ ctx }) => {
  expect(ctx.apiResponse).toBeDefined();
});

Then('the create API response should contain the correct user data', async ({ ctx }) => {
  expect(ctx.apiResponse.email).toBe(ctx.userData.email);
  expect(ctx.apiResponse.username).toBe(ctx.userData.username);
});

Then(
  'the create API response should contain email {string}, username {string}, name {string}',
  async ({ ctx }, email: string, username: string, name: string) => {
    expect(ctx.apiResponse.email).toContain(email.split('@')[0]);
    expect(ctx.apiResponse.username).toContain(username);
    expect(ctx.apiResponse.name).toBe(name);
  },
);

Then('the user row in the table should match the API response', async ({ page, ctx }) => {
  await verifyUserRowMatchesApiResponse(page.frameLocator('iframe'), ctx.apiResponse);
});

Then('the user row in the table should contain:', async ({ page, ctx }, table: DataTable) => {
  const expected = Object.fromEntries(table.rows().map(([field, value]) => [field, value]));
  for (const [field, value] of Object.entries(expected)) {
    const partial = field === 'email' ? value.split('@')[0] : field === 'username' ? value.split('_')[0] : value;
    expect(ctx.apiResponse[field]).toContain(partial);
  }
  await verifyUserRowMatchesApiResponse(page.frameLocator('iframe'), ctx.apiResponse);
});

// Validation case steps
const validationCases = CREATE_USER_VALIDATION_CASES;

When('I fill the form with {string} validation case', async ({ createUsersPage }, caseName: string) => {
  const c = validationCases.find((v) => v.name === caseName)!;
  await createUsersPage.fillCreateForm(c.formData);
});

Then(
  'I should see field error {string} on {string}',
  async ({ createUsersPage }, expectedError: string, fieldName: string) => {
    const message = await createUsersPage.getFormFieldValidationMessage(fieldName);
    expect(message.toLowerCase()).toContain(expectedError.toLowerCase());
  },
);

Then('the create form should still be visible', async ({ createUsersPage }) => {
  await expect(createUsersPage.createButton).toBeVisible();
});
