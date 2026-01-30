import { usersTest as test, expect } from '@pocket-base/fixtures';
import { isAscending, isDescending } from '@pocket-base/utils';

test.describe('Sort User', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ userCount: 4 });

  test(
    'should sort users by email in descending and ascending order',
    { tag: ['@PK004', '@user', '@sort'] },
    async ({ sortUsersPage }) => {
      await test.step('Click sort icon on email column', async () => {
        await sortUsersPage.clickSort('email');
      });

      await test.step('Verify descending order', async () => {
        const uiValues = await sortUsersPage.getColumnValues('email');
        expect(isDescending(uiValues)).toBeTruthy();
      });

      await test.step('Click sort icon again for ascending', async () => {
        await sortUsersPage.clickSort('email');
      });

      await test.step('Verify ascending order', async () => {
        const uiValues = await sortUsersPage.getColumnValues('email');
        expect(isAscending(uiValues)).toBeTruthy();
      });
    }
  );

  test(
    'should sort users by username in descending order',
    { tag: ['@PK005', '@user', '@sort'] },
    async ({ sortUsersPage }) => {
      await test.step('Click sort icon on username column', async () => {
        await sortUsersPage.clickSort('username');
      });

      await test.step('Verify descending order', async () => {
        const uiValues = await sortUsersPage.getColumnValues('username');
        expect(isDescending(uiValues)).toBeTruthy();
      });
    }
  );

  test(
    'should sort users by name in descending and ascending order',
    { tag: ['@PK006', '@user', '@sort'] },
    async ({ sortUsersPage }) => {
      await test.step('Click sort icon on name column', async () => {
        await sortUsersPage.clickSort('name');
      });

      await test.step('Verify descending order', async () => {
        const uiValues = await sortUsersPage.getColumnValues('name');
        expect(isDescending(uiValues)).toBeTruthy();
      });

      await test.step('Click sort icon again for ascending', async () => {
        await sortUsersPage.clickSort('name');
      });

      await test.step('Verify ascending order', async () => {
        const uiValues = await sortUsersPage.getColumnValues('name');
        expect(isAscending(uiValues)).toBeTruthy();
      });
    }
  );
});
