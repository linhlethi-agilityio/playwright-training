import { test as base, APIRequestContext } from '@playwright/test';

// Constants
import {
  API_ENDPOINTS,
  BASE_API_URL,
  LOGIN_LOGIN_CREDENTIALS,
} from '@pocket-base/constants';

type ApiFixtures = {
  apiContext: APIRequestContext;
};

const getAccessToken = async (
  playwright: (typeof import('@playwright/test'))['request']
): Promise<string> => {
  const context = await playwright.newContext({ baseURL: BASE_API_URL });

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

export const apiTest = base.extend<ApiFixtures>({
  apiContext: async ({ playwright }, use) => {
    const token = await getAccessToken(playwright.request);

    const context = await playwright.request.newContext({
      baseURL: BASE_API_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await use(context);
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
