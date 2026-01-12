export const LOGIN_CREDENTIALS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
} as const;

export const LOGIN_ERROR_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
  INVALID_CREDENTIALS:
    'Username and password do not match any user in this service',
  LOCKED_OUT: 'Sorry, this user has been locked out',
} as const;

export const LOGIN_FAILURE_CASES = [
  {
    description: 'invalid user',
    username: 'standard_user100',
    password: 'secret_sauce1',
    expectedError: LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS,
  },
  {
    description: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED,
  },
  {
    description: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED,
  },
  {
    description: 'empty username and password',
    username: '',
    password: '',
    expectedError: LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED,
  },
  {
    description: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: LOGIN_ERROR_MESSAGES.LOCKED_OUT,
  },
] as const;
