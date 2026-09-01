import './InventoryView.css'
import InventoryProductTable from './InventoryProductTable'


function InventoryView() {
  return (
    <>
      <section className='inventory-section'>
        <InventoryProductTable />
      </section>
    </>
  )
}

export default InventoryView
