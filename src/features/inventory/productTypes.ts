export const productCategories = [
  'Snacks',
  'Beverages',
  'Coffee & Milk',
  'Instant Noodles',
  'Canned Goods',
  'Cooking Essentials',
  'Household Cleaning',
  'Personal Care',
  'Miscellaneous'
] as const

export type ProductCategory =
  typeof productCategories[number]

export type ProductSubCategory =
  | 'Candies'
  | 'Biscuits'
  | 'Small Chips'
  | 'Big Chips'
  | 'Minicakes'
  | 'Chocolates'
  | 'Soft Drinks'
  | 'Energy Drinks'
  | 'Water'
  | 'Other Beverages'
  | 'Coffee'
  | 'Milk'
  | 'Juice'
  | 'Instant Mami'
  | 'Pancit Canton'
  | 'Cup Noodles'
  | 'Sardines'
  | 'Tuna'
  | 'Corned Beef'
  | 'Meat Loaf'
  | 'Other Canned Goods'
  | 'Repacked'
  | 'Seasonings'
  | 'Condiments'
  | 'Other Essentials'
  | 'Detergent Powder'
  | 'Detergent Bar'
  | 'Fabric Conditioner'
  | 'Dishwashing'
  | 'Other Cleaning Items'
  | 'Shampoo'
  | 'Toothpaste'
  | 'Bath Soap'
  | 'Personal Hygiene'
  | 'Other Care Items'
  | 'Cigarettes'
  | 'Other Items'

export type Product = {
  name: string,
  category: ProductCategory,
  subcategory: ProductSubCategory
}