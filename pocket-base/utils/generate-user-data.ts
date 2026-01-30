export const generateUserData = (suffix: string) => {
  const uid = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    email: `testuser_${suffix}_${uid}@example.com`,
    emailVisibility: true,
    password: 'Test123456',
    passwordConfirm: 'Test123456',
    username: `testuser_${suffix}_${uid}`,
    name: `Test User ${suffix} ${uid}`,
  };
};
