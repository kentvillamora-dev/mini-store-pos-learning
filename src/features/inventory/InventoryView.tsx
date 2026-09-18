import './InventoryView.css'

function InventoryView() {
  return (
    <>
      <div className='primary-controls-area'>
        Inventory Primary Controls
      </div>

      <div className='auxiliary-controls-area'>
        Inventory Auxiliary Controls
      </div>

      <section>
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
          </tbody>
        </table>
      </section>
    </>
  )
}

export default InventoryView

