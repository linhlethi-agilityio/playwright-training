import { apiTest as test } from './api';
import { UsersPage } from '@pocket-base/pages';
import { deleteUser, UserData } from '@pocket-base/services';

type DeleteUsersFixtures = {
  deleteUsersPage: UsersPage & { userList: UserData[] };
};

export const deleteUsersTest = test.extend<DeleteUsersFixtures>({
  deleteUsersPage: async ({ page, apiContext }, use) => {
    const usersPage = new UsersPage(page);
    const userList: UserData[] = [];

    // Expose userList on the page object
    const pageWithUsers = Object.assign(usersPage, { userList });

    await use(pageWithUsers);

    // Cleanup: delete all created users
    for (const user of userList) {
      await deleteUser(apiContext, user.id);
    }
  },
});

export { expect } from '@playwright/test';
