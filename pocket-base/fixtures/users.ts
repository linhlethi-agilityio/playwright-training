import { APIRequestContext } from '@playwright/test';

// Constants
import { API_ENDPOINTS } from '@pocket-base/constants';

// Fixtures
import { apiTest as test } from './api';

// Pages
import { UsersPage } from '@pocket-base/pages';

// Utils
import { generateUserData } from '@pocket-base/utils';

export type UserData = {
  id: string;
  email: string;
  username: string;
};

const createUser = async (
  apiContext: APIRequestContext,
  suffix: string
): Promise<UserData> => {
  const userData = generateUserData(suffix);
  const response = await apiContext.post(API_ENDPOINTS.USERS, {
    data: userData,
  });

  if (!response.ok()) {
    throw new Error(`Failed to create user: ${response.status()}`);
  }

  const result = await response.json();
  return {
    id: result.id,
    email: userData.email,
    username: userData.username,
  };
};

const deleteUser = async (
  apiContext: APIRequestContext,
  userId: string
) => {
  const response = await apiContext.delete(
    `${API_ENDPOINTS.USERS}/${userId}`
  );
  if (!response.ok() && response.status() !== 404) {
    throw new Error(`Cleanup failed: ${response.status()}`);
  }
};

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
export { createUser, deleteUser };
