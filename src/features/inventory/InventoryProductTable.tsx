import { Fragment } from 'react'
import { productGroups } from './productTypes'
import { defaultProducts } from './defaultProducts'

function InventoryProductTable() {
  return (
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
        {Object.keys(productGroups).map((category) => (
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
  )
}

export default InventoryProductTable
