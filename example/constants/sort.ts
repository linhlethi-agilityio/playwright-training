export const SORT_OPTIONS = {
  NAME_A_TO_Z: {
    value: 'az',
    text: 'Name (A to Z)',
  },
  NAME_Z_TO_A: {
    value: 'za',
    text: 'Name (Z to A)',
  },
  PRICE_LOW_TO_HIGH: {
    value: 'lohi',
    text: 'Price (low to high)',
  },
  PRICE_HIGH_TO_LOW: {
    value: 'hilo',
    text: 'Price (high to low)',
  },
} as const;

export const INVENTORY_SELECTORS = {
  SORT_DROPDOWN: '.product_sort_container',
  INVENTORY_LIST: '.inventory_list',
  INVENTORY_ITEM: '.inventory_item',
  INVENTORY_ITEM_NAME: '.inventory_item_name',
  INVENTORY_ITEM_PRICE: '.inventory_item_price',
} as const;
