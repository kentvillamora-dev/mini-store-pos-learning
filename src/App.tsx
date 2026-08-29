import { useState } from 'react'
import SalesView from './features/sales/SalesView'
import InventoryView from './features/inventory/InventoryView'
import RecordsView from './features/records/RecordsView'

function App() {
  const [activeTab, setActiveTab] =
    useState<'Sales' | 'Inventory' | 'Records'>('Sales')

  return (
    <>
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

      <main>
        {activeTab === 'Sales' && <SalesView />}
        {activeTab === 'Inventory' && <InventoryView />}
        {activeTab === 'Records' && <RecordsView />}
      </main>
    </>
  )
}

export default App
