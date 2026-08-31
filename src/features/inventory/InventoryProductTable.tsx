import { Fragment, useState } from 'react'
import { productGroups } from './productTypes'
import { defaultProducts } from './defaultProducts'

function InventoryProductTable() {
  const [selectedCategory, setSelectedCategory] =
    useState('All Categories')

  return (
    <>
      <div>
        <button
          onClick={() => setSelectedCategory('All Categories')}
        >
          All Categories
        </button>

        {Object.keys(productGroups).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <table>
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
                <tr>
                  <td colSpan={5}>{category}</td>
                </tr>

                {defaultProducts
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <tr key={product.name}>
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
