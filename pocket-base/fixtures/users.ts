import { apiTest as test } from './api';
import { UsersPage } from '@pocket-base/pages';
import { createUser, deleteUser, UserData } from '@pocket-base/services';

type UsersFixtures = {
  userCount: number;
  deleteUsersPage: UsersPage & { userList: UserData[] };
  sortUsersPage: UsersPage & { userList: UserData[] };
  searchUsersPage: UsersPage;
};

export const usersTest = test.extend<UsersFixtures>({
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

    // Clean up test data that wasn't deleted via UI
    for (const user of userList) {
      await deleteUser(apiContext, user.id);
    }
  },

  sortUsersPage: async ({ page, apiContext, userCount }, use) => {
    const usersPage = new UsersPage(page);
    const userList: UserData[] = [];

    for (let i = 0; i < userCount; i++) {
      const user = await createUser(apiContext, `sort_${i}`);
      userList.push(user);
    }

    await usersPage.navigateTo();

    const pageWithUsers = Object.assign(usersPage, { userList });
    await use(pageWithUsers);

    // Clean up test data after sorting
    for (const user of userList) {
      await deleteUser(apiContext, user.id);
    }
  },

  searchUsersPage: async ({ page }, use) => {
    const usersPage = new UsersPage(page);
    await usersPage.navigateTo();
    await use(usersPage);
  },
});

export { expect } from '@playwright/test';
