import { ERROR_MESSAGES } from '@pocket-base/constants';

const updateUid = Date.now();

export const UPDATE_USER_DATA = {
  username: `updated_user_${updateUid}`,
  email: `updated_user_${updateUid}@example.com`,
  password: 'NewPassword123',
  passwordConfirm: 'NewPassword123',
};

export const CREATE_USER_VALIDATION_CASES = [
  {
    name: 'empty email',
    formData: {
      id: '987654376547654',
      email: '',
      password: '',
      passwordConfirm: '',
      username: 'admin123',
      name: 'Admin',
    },
    errorField: 'email',
    expectedError: ERROR_MESSAGES.REQUIRED,
  },
  {
    name: 'empty password',
    formData: {
      id: '987654376547654',
      email: 'test@example.com',
      password: '',
      passwordConfirm: '',
      username: 'admin123',
      name: 'Admin',
    },
    errorField: 'Password',
    expectedError: ERROR_MESSAGES.REQUIRED,
  },
  {
    name: 'empty password confirm',
    formData: {
      id: '987654376547654',
      email: 'test@example.com',
      password: 'Test123456',
      passwordConfirm: '',
      username: 'admin123',
      name: 'Admin',
    },
    errorField: 'Password confirm',
    expectedError: ERROR_MESSAGES.REQUIRED,
  },
  {
    name: 'mismatched password confirm',
    formData: {
      id: '987654376547654',
      email: 'test@example.com',
      password: 'Test123456',
      passwordConfirm: 'WrongPassword123',
      username: 'admin123',
      name: 'Admin',
    },
    errorField: 'Password confirm',
    expectedError: ERROR_MESSAGES.PASSWORD_MISMATCH,
  },
];
