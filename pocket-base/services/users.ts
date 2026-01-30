import { APIRequestContext } from '@playwright/test';

import { API_ENDPOINTS } from '@pocket-base/constants';
import { generateUserData } from '@pocket-base/utils';

export type UserData = {
  id: string;
  email: string;
  username: string;
  name?: string;
};

export const createUser = async (
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
    name: result.name,
  };
};

export const searchUsers = async (
  apiContext: APIRequestContext,
  keyword: string
): Promise<UserData[]> => {
  const filter = `email~"${keyword}"`;
  const response = await apiContext.get(
    `${API_ENDPOINTS.USERS}?filter=${encodeURIComponent(filter)}&perPage=200`
  );

  if (!response.ok()) {
    throw new Error(`Failed to search users: ${response.status()}`);
  }

  const result = await response.json();
  return result.items;
};

export const deleteUser = async (
  apiContext: APIRequestContext,
  userId: string
) => {
  const response = await apiContext.delete(`${API_ENDPOINTS.USERS}/${userId}`);
  if (!response.ok() && response.status() !== 404) {
    throw new Error(`Cleanup failed: ${response.status()}`);
  }
};
