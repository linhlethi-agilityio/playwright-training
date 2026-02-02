export const BASE_API_URL = 'https://pocketbase.io/api/';

export const AUTH_STATE_PATH = 'playwright/.auth/user.json';

export const API_COLLECTIONS_PATH = '/api/collections/';

export const API_ENDPOINTS = {
  AUTH: 'collections/_superusers/auth-with-password',
  USERS: 'collections/users/records',
};

export const SUCCESS_MESSAGES = {
  CREATED_RECORD: 'Successfully created record.',
  UPDATED_RECORD: 'Successfully updated record.',
  DELETED_RECORD: 'Successfully deleted the selected record.',
  DELETED_RECORDS: 'Successfully deleted the selected records.',
};
