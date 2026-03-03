import { test as base } from 'playwright-bdd';
import { APIRequestContext } from '@playwright/test';

import { BASE_API_URL } from '@pocket-base/constants';
import { getAccessToken } from '@pocket-base/services';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Ctx = Record<string, any>;

type ApiFixtures = {
  apiContext: APIRequestContext;
  ctx: Ctx;
};

export const apiTest = base.extend<ApiFixtures>({
  // eslint-disable-next-line no-empty-pattern
  ctx: async ({}, use) => {
    await use({});
  },

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
