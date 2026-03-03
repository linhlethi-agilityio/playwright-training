import { APIRequestContext, Page } from '@playwright/test';

import { apiTest as test } from './api';
import { LoginPage, UsersPage } from '@pocket-base/pages';
import { createUser, deleteUser, UserData } from '@pocket-base/services';

type UsersPageWithUsers = UsersPage & { userList: UserData[] };

const DELETE_MULTIPLE_USER_COUNT = 2;

type UsersFixtures = {
  loginPage: LoginPage;
  userCount: number;
  deleteUsersPage: UsersPageWithUsers;
  deleteMultipleUsersPage: UsersPageWithUsers;
  sortUsersPage: UsersPageWithUsers;
  searchUsersPage: UsersPageWithUsers;
  updateUsersPage: UsersPageWithUsers;
  createUsersPage: UsersPage;
};

const createUsers = async (
  apiContext: APIRequestContext,
  prefix: string,
  count: number
): Promise<UserData[]> => {
  const userList: UserData[] = [];
  for (let i = 0; i < count; i++) {
    const user = await createUser(apiContext, `${prefix}_${i}`);
    userList.push(user);
  }
  return userList;
};

const cleanupUsers = async (
  apiContext: APIRequestContext,
  userList: UserData[]
) => {
  for (const user of userList) {
    await deleteUser(apiContext, user.id);
  }
};

const setupUsersPage = async (
  page: Page,
  apiContext: APIRequestContext,
  prefix: string,
  userCount: number,
  use: (fixture: UsersPageWithUsers) => Promise<void>
) => {
  const usersPage = new UsersPage(page);
  const userList = await createUsers(apiContext, prefix, userCount);

  await usersPage.navigateTo();

  const pageWithUsers = Object.assign(usersPage, { userList });
  await use(pageWithUsers);

  await cleanupUsers(apiContext, userList);
};

export const usersTest = test.extend<UsersFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  userCount: [1, { option: true }],

  deleteUsersPage: async ({ page, apiContext, userCount }, use) => {
    await setupUsersPage(page, apiContext, 'user', userCount, use);
  },

  deleteMultipleUsersPage: async ({ page, apiContext }, use) => {
    await setupUsersPage(page, apiContext, 'user', DELETE_MULTIPLE_USER_COUNT, use);
  },

  sortUsersPage: async ({ page, apiContext, userCount }, use) => {
    await setupUsersPage(page, apiContext, 'sort', userCount, use);
  },

  searchUsersPage: async ({ page, apiContext, userCount }, use) => {
    await setupUsersPage(page, apiContext, 'search', userCount, use);
  },

  updateUsersPage: async ({ page, apiContext, userCount }, use) => {
    await setupUsersPage(page, apiContext, 'update', userCount, use);
  },

  createUsersPage: async ({ page }, use) => {
    const usersPage = new UsersPage(page);
    await usersPage.navigateTo();
    await use(usersPage);
  },
});

export { expect } from '@playwright/test';
