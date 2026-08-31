export const productGroups = {
  'Snacks': [
    'Candies',
    'Biscuits',
    'Small Chips',
    'Big Chips',
    'Minicakes',
    'Chocolates',
    'Other Snacks'
  ],
  'Beverages': [
    'Soft Drinks',
    'Energy Drinks',
    'Water',
    'Other Beverages'
  ],
  'Coffee & Milk': [
    'Coffee',
    'Milk',
    'Juice',
    'Other Powdered Drinks'
  ],
  'Instant Noodles': [
    'Instant Mami',
    'Pancit Canton',
    'Cup Noodles',
    'Other Instant Noodles'
  ],
  'Canned Goods': [
    'Sardines',
    'Tuna',
    'Corned Beef',
    'Meat Loaf',
    'Other Canned Goods'
  ],
  'Cooking Essentials': [
    'Repacked',
    'Seasonings',
    'Condiments',
    'Other Essentials'
  ],
  'Household Cleaning': [
    'Detergent Powder',
    'Detergent Bar',
    'Fabric Conditioner',
    'Dishwashing',
    'Other Cleaning Items'
  ],
  'Personal Care': [
    'Shampoo',
    'Toothpaste',
    'Bath Soap',
    'Personal Hygiene',
    'Other Care Items'
  ],
  'Miscellaneous': [
    'Cigarettes',
    'Other Items'
  ]
} as const

export type ProductCategory =
  keyof (typeof productGroups)

export type ProductSubCategoryFor<Category extends ProductCategory> =
  (typeof productGroups)[Category][number]

export type Product<Category extends ProductCategory> = {
  name: string,
  category: Category,
  subcategory: ProductSubCategoryFor<Category>
}

export type AnyProduct = {
  [Category in ProductCategory]: Product<Category>
}[ProductCategory]