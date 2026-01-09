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

export const NAVIGATION_SELECTORS = {
  MENU_BUTTON: '.bm-burger-button button',
  MENU_CONTAINER: '.bm-menu',
  MENU_ITEM_LIST: '.bm-item-list',
  MENU_CLOSE_BUTTON: '.bm-cross-button button',
} as const;
