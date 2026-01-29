import { APIRequest } from '@playwright/test';

import {
  API_ENDPOINTS,
  BASE_API_URL,
  LOGIN_LOGIN_CREDENTIALS,
} from '@pocket-base/constants';

export const getAccessToken = async (
  request: APIRequest
): Promise<string> => {
  const context = await request.newContext({ baseURL: BASE_API_URL });

  const response = await context.post(API_ENDPOINTS.AUTH, {
    data: {
      identity: LOGIN_LOGIN_CREDENTIALS.email,
      password: LOGIN_LOGIN_CREDENTIALS.password,
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to authenticate: ${response.status()}`);
  }

  const data = await response.json();
  await context.dispose();
  return data.token;
};
