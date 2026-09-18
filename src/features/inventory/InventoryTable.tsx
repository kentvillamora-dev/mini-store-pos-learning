import { defaultProducts } from './defaultProducts'

function InventoryTable() {
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
          {defaultProducts.map((product) => (
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
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable