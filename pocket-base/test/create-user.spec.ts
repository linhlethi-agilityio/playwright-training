import { usersTest as test, expect } from '@pocket-base/fixtures';

import { SUCCESS_MESSAGES } from '@pocket-base/constants';
import { getUserByEmail, deleteUser } from '@pocket-base/services';
import { generateUserData } from '@pocket-base/utils';
import { CREATE_USER_VALIDATION_CASES } from '@pocket-base/data';

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

  CREATE_USER_VALIDATION_CASES.forEach(
    ({ name, formData, errorField, expectedError }) => {
      test(
        `should show validation error for ${name}`,
        { tag: ['@PK010', '@user', '@create'] },
        async ({ createUsersPage }) => {
          test.info().annotations.push({
            type: 'description',
            description: name,
          });

          await test.step('Click "New record" button', async () => {
            await createUsersPage.clickNewRecord();
          });

          await test.step('Fill form data', async () => {
            await createUsersPage.fillCreateForm(formData);
          });

          await test.step('Click "Create" button', async () => {
            await createUsersPage.clickCreate();
          });

          await test.step(`Verify validation error for ${name}`, async () => {
            const message =
              await createUsersPage.getFormFieldValidationMessage(errorField);
            expect(message.toLowerCase()).toContain(expectedError);
          });

          await test.step('Verify user is not created', async () => {
            await expect(createUsersPage.createButton).toBeVisible();
          });
        }
      );
    }
  );
});
