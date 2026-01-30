import { usersTest as test, expect } from '@pocket-base/fixtures';
import { searchUsers } from '@pocket-base/services';

test.describe('Search User', () => {
  test.describe('Search with valid value', () => {
    const searchValue = 'test@example.com';

    test(
      'should show filtered user list when searching with a valid value',
      { tag: ['@PK007', '@user', '@search'] },
      async ({ searchUsersPage, apiContext }) => {
        await test.step('Enter valid search value', async () => {
          await searchUsersPage.fillSearch(searchValue);
        });

        await test.step('Click search button', async () => {
          await searchUsersPage.clickSearch();
        });

        await test.step('Verify filtered user list matches API data', async () => {
          const uiEmails = await searchUsersPage.getColumnValues('email');

          for (const email of uiEmails) {
            expect(email).toContain(searchValue);
          }
        });

        await test.step('Clear search value in the input', async () => {
          await searchUsersPage.clearSearch();
        });
      }
    );
  });

  test.describe('Search with invalid value', () => {
    const searchValue = 'nonexistent_xyz_2020';

    test(
      'should show no records when searching with an invalid value',
      { tag: ['@PK008', '@user', '@search'] },
      async ({ searchUsersPage, apiContext }) => {
        await test.step('Enter invalid search value', async () => {
          await searchUsersPage.fillSearch(searchValue);
        });

        await test.step('Click search button', async () => {
          await searchUsersPage.clickSearch();
        });

        await test.step('Verify no records found message is displayed', async () => {
          const apiUsers = await searchUsers(apiContext, searchValue);
          expect(apiUsers.length).toBe(0);

          await expect(searchUsersPage.noRecordsMessage).toBeVisible();
        });

        await test.step('Clear search value in the input', async () => {
          await searchUsersPage.clearSearch();
        });
      }
    );
  });
});
