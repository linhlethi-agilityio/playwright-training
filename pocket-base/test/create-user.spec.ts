import { usersTest as test, expect } from '@pocket-base/fixtures';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@pocket-base/constants';
import { getUserByEmail, deleteUser } from '@pocket-base/services';
import { generateUserData } from '@pocket-base/utils';

test.describe('Create User', () => {
  let createdUserEmail: string | null = null;

  test.afterEach(async ({ apiContext }) => {
    if (createdUserEmail) {
      const apiUser = await getUserByEmail(apiContext, createdUserEmail);
      if (apiUser) {
        await deleteUser(apiContext, apiUser.id);
      }
    }
  });

  test(
    'should create a new user with valid data',
    { tag: ['@PK009', '@user', '@create'] },
    async ({ createUsersPage, apiContext }) => {
      const userData = generateUserData('create');
      createdUserEmail = userData.email;

      await test.step('Click "New record" button', async () => {
        await createUsersPage.clickNewRecord();
      });

      await test.step('Fill form with valid data', async () => {
        await createUsersPage.fillCreateForm(userData);
      });

      await test.step('Click "Create" button', async () => {
        await createUsersPage.clickCreate();
      });

      await test.step('Verify user appears in the table', async () => {
        await expect(
          createUsersPage.frame.getByText(SUCCESS_MESSAGES.CREATED_RECORD)
        ).toBeVisible();
        await expect(
          createUsersPage.getUserByEmail(userData.email)
        ).toBeVisible();
      });

      await test.step('Verify API returns the created user', async () => {
        const apiUser = await getUserByEmail(apiContext, userData.email);
        expect(apiUser).not.toBeNull();
        expect(apiUser!.email).toBe(userData.email);
        expect(apiUser!.username).toBe(userData.username);
      });
    }
  );

  test(
    'should show validation errors when creating user with empty required fields',
    { tag: ['@PK010', '@user', '@create'] },
    async ({ createUsersPage }) => {
      await test.step('Click "New record" button', async () => {
        await createUsersPage.clickNewRecord();
      });

      await test.step('Fill id, username and name fields', async () => {
        await createUsersPage.fillCreateForm({
          id: '987654376547654',
          username: 'admin123',
          name: 'Admin',
        });
      });

      await test.step('Click "Create" and verify email validation error', async () => {
        await createUsersPage.clickCreate();
        const emailValidation = await createUsersPage
          .getFormField('email')
          // eslint-disable-next-line no-undef
          .evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(emailValidation.toLowerCase()).toContain(
          ERROR_MESSAGES.REQUIRED
        );
      });

      await test.step('Fill email, click "Create" and verify password validation error', async () => {
        await createUsersPage.getFormField('email').fill('test@example.com');
        await createUsersPage.clickCreate();
        const passwordValidation = await createUsersPage
          .getFormField('Password')
          // eslint-disable-next-line no-undef
          .evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(passwordValidation.toLowerCase()).toContain(
          ERROR_MESSAGES.REQUIRED
        );
      });

      await test.step('Fill password, click "Create" and verify password confirm validation error', async () => {
        await createUsersPage.getFormField('Password').fill('Test123456');
        await createUsersPage.clickCreate();
        const confirmValidation = await createUsersPage
          .getFormField('Password confirm')
          // eslint-disable-next-line no-undef
          .evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(confirmValidation.toLowerCase()).toContain(
          ERROR_MESSAGES.REQUIRED
        );
      });

      await test.step('Fill mismatched password confirm, click "Create" and verify mismatch error', async () => {
        await createUsersPage
          .getFormField('Password confirm')
          .fill('WrongPassword123');
        await createUsersPage.clickCreate();
        await expect(
          createUsersPage.getFormFieldError('Password confirm')
        ).toContainText(ERROR_MESSAGES.PASSWORD_MISMATCH);
      });

      await test.step('Verify user is not created', async () => {
        await expect(createUsersPage.createButton).toBeVisible();
      });
    }
  );
});
