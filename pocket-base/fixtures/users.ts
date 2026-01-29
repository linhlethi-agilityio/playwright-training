import { apiTest as test } from './api';
import { UsersPage } from '@pocket-base/pages';
import { createUser, deleteUser, UserData } from '@pocket-base/services';

type DeleteUsersFixtures = {
  userCount: number;
  deleteUsersPage: UsersPage & { userList: UserData[] };
};

export const deleteUsersTest = test.extend<DeleteUsersFixtures>({
  userCount: 1,

  deleteUsersPage: async ({ page, apiContext, userCount }, use) => {
    const usersPage = new UsersPage(page);
    const userList: UserData[] = [];

    for (let i = 0; i < userCount; i++) {
      const user = await createUser(apiContext, `user_${i}`);
      userList.push(user);
    }

    await usersPage.navigateTo();

    const pageWithUsers = Object.assign(usersPage, { userList });
    await use(pageWithUsers);

    // Cleanup: delete users that weren't deleted via UI
    for (const user of userList) {
      await deleteUser(apiContext, user.id);
    }
  },
});

export { expect } from '@playwright/test';
