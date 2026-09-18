import './InventoryTable.css'
import { defaultProducts } from './defaultProducts'
import { Fragment } from 'react'

type InventoryTableProps = {
  selectedCategory: string
}

function InventoryTable({ selectedCategory }: InventoryTableProps) {
  const categories = [...new Set(defaultProducts.map((product) => product.category))]

  const displayedCategories = selectedCategory === 'All' ? categories : [selectedCategory]

  return (
    <div className='inventory-table-container'>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Unit Cost</th>
            <th>Retail Price</th>
            <th>Profit Margin</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {displayedCategories.map((category) => (
            <Fragment key={category}>
              <tr className='inventory-category-row'>
                <td colSpan={6}>{category}</td>
              </tr>

              {defaultProducts
                .filter((product) => product.category === category)
                .map((product) => (
                  <tr key={product.name}>
                    <td>{product.name}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <div className='inventory-action-buttons'>
                        <button>Restock</button>
                        <button>Modify</button>
                      </div>
                    </td>
                  </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable