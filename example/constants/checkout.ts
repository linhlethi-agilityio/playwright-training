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
