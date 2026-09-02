import { useState } from 'react'
import SalesView from './features/sales/SalesView'
import InventoryView from './features/inventory/InventoryView'
import RecordsView from './features/records/RecordsView'

function App() {
  const [activeTab, setActiveTab] =
    useState<'Sales' | 'Inventory' | 'Records'>('Sales')

  return (
    <>
      <header>
        <nav>
          <button
            onClick={() => setActiveTab('Sales')}
            className={activeTab === 'Sales' ? 'active' : ''}
          >
            Sales
          </button>

          <button
            onClick={() => setActiveTab('Inventory')}
            className={activeTab === 'Inventory' ? 'active' : ''}
          >
            Inventory
          </button>
          
          <button
            onClick={() => setActiveTab('Records')}
            className={activeTab === 'Records' ? 'active' : ''}
          >
            Records
          </button>
        </nav>

        <div className='auxillary-information-box'>
          Auxiliary Information
        </div>
      </header>

      <main>
        {activeTab === 'Sales' && <SalesView />}
        {activeTab === 'Inventory' && <InventoryView />}
        {activeTab === 'Records' && <RecordsView />}
      </main>
    </>
  )
}

export default App
