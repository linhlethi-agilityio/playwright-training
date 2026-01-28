export const generateUserData = (suffix: string) => {
  const timestamp = Date.now();
  return {
    email: `testuser_${suffix}_${timestamp}@example.com`,
    password: 'Test123456',
    passwordConfirm: 'Test123456',
    username: `testuser_${suffix}_${timestamp}`,
  };
};
