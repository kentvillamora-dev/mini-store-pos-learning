import { Fragment, useState } from 'react'
import { productGroups } from './productTypes'
import { defaultProducts } from './defaultProducts'

function InventoryProductTable() {
  const [selectedCategory, setSelectedCategory] =
    useState('All Categories')

  return (
    <>
      <div className="inventory-category-controls">
        <button
          className={`inventory-category-button${
            selectedCategory === 'All Categories' ? ' active' : ''
          }`}
          onClick={() => setSelectedCategory('All Categories')}
        >
          All
        </button>

        {Object.keys(productGroups).map((category) => (
          <button
            key={category}
            className="inventory-category-button"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <table className="inventory-product-table">
        <thead>
          <tr>
            <th scope="col">Products</th>
            <th scope="col">Stock</th>
            <th scope="col">Unit Cost</th>
            <th scope="col">SRP</th>
            <th scope="col">Sell Price</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(productGroups)
            .filter(
              (category) =>
                selectedCategory === 'All Categories' ||
                category === selectedCategory
            )
            .map((category) => (
              <Fragment key={category}>
                <tr className="inventory-category-row">
                  <td colSpan={5}>{category}</td>
                </tr>

                {defaultProducts
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <tr key={product.name}
                        className="inventory-product-row"
                    >
                      <td>{product.name}</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  ))}
              </Fragment>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default InventoryProductTable
