import { test as base, APIRequestContext } from '@playwright/test';

import { BASE_API_URL } from '@pocket-base/constants';
import { getAccessToken } from '@pocket-base/services';

type ApiFixtures = {
  apiContext: APIRequestContext;
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
