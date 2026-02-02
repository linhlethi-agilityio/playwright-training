import { usersTest as test, expect } from '@pocket-base/fixtures';

import { API_COLLECTIONS_PATH, SUCCESS_MESSAGES } from '@pocket-base/constants';
import { UPDATE_USER_DATA } from '@pocket-base/data';
import { UserData } from '@pocket-base/services';

test.describe('Update User', () => {
  test(
    'should update an existing user successfully',
    { tag: ['@PK012', '@user', '@update'] },
    async ({ updateUsersPage }) => {
      const { userList } = updateUsersPage;
      const userEmail = userList[0].email;
      let apiResponse: UserData;

      await test.step('Click the row of the user to update', async () => {
        await updateUsersPage.clickUserRow(userEmail);
      });

      await test.step('Enable password change', async () => {
        await updateUsersPage.clickChangePassword();
      });

      await test.step('Fill update form with new data', async () => {
        await updateUsersPage.fillCreateForm(UPDATE_USER_DATA);
      });

      await test.step('Click "Save changes" button', async () => {
        const responsePromise = updateUsersPage.waitForApiResponse(
          'PATCH',
          API_COLLECTIONS_PATH
        );
        await updateUsersPage.clickSaveChanges();
        const response = await responsePromise;
        apiResponse = await response.json();

        expect(response.status()).toBe(200);
        expect(apiResponse.email).toBe(UPDATE_USER_DATA.email);
        expect(apiResponse.username).toBe(UPDATE_USER_DATA.username);
      });

      await test.step('Verify success message is displayed', async () => {
        await expect(
          updateUsersPage.frame.getByText(SUCCESS_MESSAGES.UPDATED_RECORD)
        ).toBeVisible();
      });

      await test.step('Verify UI result matches API response', async () => {
        const userRow = updateUsersPage.frame.getByRole('row', {
          name: apiResponse.email,
        });
        await expect(userRow).toBeVisible();

        const emailCell = userRow.getByRole('cell', {
          name: apiResponse.email,
        });
        const usernameCell = userRow.getByRole('cell', {
          name: apiResponse.username,
        });
        await expect(emailCell).toBeVisible();
        await expect(usernameCell).toBeVisible();
      });
    }
  );
});
