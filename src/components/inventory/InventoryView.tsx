import InventoryTable from './InventoryTable'

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
        <InventoryTable />
      </section>
    </>
  )
}

export default InventoryView

