import { expect, FrameLocator } from '@playwright/test';

import { UserData } from '@pocket-base/services';

const VISIBLE_FIELDS: (keyof UserData)[] = ['email', 'username'];

export const verifyUserRowMatchesApiResponse = async (
  frame: FrameLocator,
  apiResponse: UserData
) => {
  const userRow = frame.getByRole('row', {
    name: apiResponse.email,
  });
  await expect(userRow).toBeVisible();

  for (const field of VISIBLE_FIELDS) {
    const value = apiResponse[field];
    if (!value) continue;

    const cell = userRow.getByRole('cell', { name: value, exact: true });
    await expect(cell).toBeVisible();
  }
};
