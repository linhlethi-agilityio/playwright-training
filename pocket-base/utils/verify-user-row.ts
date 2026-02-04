import { expect, FrameLocator } from '@playwright/test';

import { UserData } from '@pocket-base/services';

import { TableHelper } from './table';

const VISIBLE_FIELDS: (keyof UserData)[] = ['email', 'username'];

export const verifyUserRowMatchesApiResponse = async (
  frame: FrameLocator,
  apiResponse: UserData
) => {
  const table = new TableHelper(frame);
  const userRow = table.getRow(apiResponse.email);
  await expect(userRow).toBeVisible();

  for (const field of VISIBLE_FIELDS) {
    const value = apiResponse[field];
    if (!value) continue;

    const cell = table.getCell(userRow, value);
    await expect(cell).toBeVisible();
  }
};
