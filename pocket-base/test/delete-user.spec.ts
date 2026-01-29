import {
  API_COLLECTIONS_PATH,
  CONFIRM_MESSAGES,
  SUCCESS_MESSAGES,
} from '@pocket-base/constants';
import { deleteUsersTest as test, expect } from '@pocket-base/fixtures';

test.describe('Delete User', () => {
  test.describe.configure({ mode: 'serial' });

  test.describe('Delete single user', () => {
    test(
      'should delete a single user from the table',
      { tag: ['@PK011', '@user', '@delete'] },
      async ({ deleteUsersPage }) => {
        const { userList } = deleteUsersPage;

        await test.step('Verify user exists in table', async () => {
          await expect(
            deleteUsersPage.getUserByEmail(userList[0].email)
          ).toBeVisible();
        });

        await test.step('Find and click the checkbox of the user to be deleted', async () => {
          await deleteUsersPage
            .getUserDeleteCheckbox(userList[0].email)
            .click();
        });

        await test.step('Click "Delete selected" button', async () => {
          await deleteUsersPage.deleteButton.click();
        });

        await test.step('Confirm modal display and click "Yes"', async () => {
          await expect(
            deleteUsersPage.frame.getByText(CONFIRM_MESSAGES.DELETE_RECORD)
          ).toBeVisible();

          const responsePromise = deleteUsersPage.waitForApiResponse(
            'DELETE',
            API_COLLECTIONS_PATH
          );
          await deleteUsersPage.confirmDeleteButton.click();
          const response = await responsePromise;
          expect(response.status()).toBe(204);
        });

        await test.step('Verify success message and user removed from table', async () => {
          await expect(
            deleteUsersPage.frame.getByText(SUCCESS_MESSAGES.DELETED_RECORD)
          ).toBeVisible();
          await expect(
            deleteUsersPage.getUserByEmail(userList[0].email)
          ).not.toBeVisible();

          // User already deleted via UI, remove from cleanup list
          userList.length = 0;
        });
      }
    );
  });

  test.describe('Delete multiple users', () => {
    test.use({ userCount: 2 });

    test(
      'should delete two users from the table',
      { tag: ['@PK012', '@user', '@delete'] },
      async ({ deleteUsersPage }) => {
        const { userList } = deleteUsersPage;

        await test.step('Verify users exist in table', async () => {
          for (const user of userList) {
            await expect(
              deleteUsersPage.getUserByEmail(user.email)
            ).toBeVisible();
          }
        });

        await test.step('Select checkboxes of both users to be deleted', async () => {
          for (const user of userList) {
            await deleteUsersPage.getUserDeleteCheckbox(user.email).click();
          }
          await expect(
            deleteUsersPage.frame.getByText('Selected 2 records')
          ).toBeVisible();
        });

        await test.step('Click "Delete selected" button', async () => {
          await deleteUsersPage.deleteButton.click();
        });

        await test.step('Confirm modal display and click "Yes"', async () => {
          await expect(
            deleteUsersPage.frame.getByText(CONFIRM_MESSAGES.DELETE_RECORDS)
          ).toBeVisible();

          const responsePromise = deleteUsersPage.waitForApiResponse(
            'DELETE',
            API_COLLECTIONS_PATH
          );
          await deleteUsersPage.confirmDeleteButton.click();
          const response = await responsePromise;
          expect(response.status()).toBe(204);
        });

        await test.step('Verify success message and users removed from table', async () => {
          await expect(
            deleteUsersPage.frame.getByText(SUCCESS_MESSAGES.DELETED_RECORDS)
          ).toBeVisible();
          for (const user of userList) {
            await expect(
              deleteUsersPage.getUserByEmail(user.email)
            ).not.toBeVisible();
          }

          // Users already deleted via UI, clear cleanup list
          userList.length = 0;
        });
      }
    );
  });
});
