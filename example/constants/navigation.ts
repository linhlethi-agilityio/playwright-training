export const NAVIGATION_MENU_ITEMS = {
  ALL_ITEMS: {
    id: '#inventory_sidebar_link',
    text: 'All Items',
    expectedUrl: /.*inventory\.html/,
  },
  ABOUT: {
    id: '#about_sidebar_link',
    text: 'About',
    expectedUrl: 'https://saucelabs.com/',
  },
  LOGOUT: {
    id: '#logout_sidebar_link',
    text: 'Logout',
    expectedUrl: /.*saucedemo\.com\/$/,
  },
  RESET_APP: {
    id: '#reset_sidebar_link',
    text: 'Reset App State',
  },
} as const;
