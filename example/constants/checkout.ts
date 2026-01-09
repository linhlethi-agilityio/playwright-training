export const CHECKOUT_SELECTORS = {
  CART_BADGE: '.shopping_cart_badge',
  CART_LINK: '.shopping_cart_link',
  CART_ITEM: '.cart_item',
  CART_ITEM_NAME: '.inventory_item_name',
  CHECKOUT_BUTTON: '#checkout',
  CONTINUE_BUTTON: '#continue',
  FINISH_BUTTON: '#finish',
  CANCEL_BUTTON: '#cancel',
  FIRST_NAME_INPUT: '#first-name',
  LAST_NAME_INPUT: '#last-name',
  POSTAL_CODE_INPUT: '#postal-code',
  ERROR_MESSAGE: '[data-test="error"]',
  CHECKOUT_COMPLETE_CONTAINER: '.checkout_complete_container',
  COMPLETE_HEADER: '.complete-header',
  ADD_TO_CART_BUTTON: '[data-test^="add-to-cart"]',
  REMOVE_BUTTON: '[data-test^="remove"]',
} as const;

export const CHECKOUT_INFO = {
  VALID: {
    firstName: 'Jonny',
    lastName: 'Jams',
    postalCode: '52000',
  },
  EMPTY_FIRST_NAME: {
    firstName: '',
    lastName: 'Jams',
    postalCode: '52000',
  },
  EMPTY_LAST_NAME: {
    firstName: 'Jonny',
    lastName: '',
    postalCode: '52000',
  },
  EMPTY_POSTAL_CODE: {
    firstName: 'Jonny',
    lastName: 'Jams',
    postalCode: '',
  },
  ALL_EMPTY: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },
} as const;

export const CHECKOUT_ERROR_MESSAGES = {
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
} as const;

export const CHECKOUT_URLS = {
  CART: /.*cart\.html/,
  CHECKOUT_STEP_ONE: /.*checkout-step-one\.html/,
  CHECKOUT_STEP_TWO: /.*checkout-step-two\.html/,
  CHECKOUT_COMPLETE: /.*checkout-complete\.html/,
} as const;
