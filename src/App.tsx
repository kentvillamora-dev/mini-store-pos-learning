import { useState } from 'react'
import SalesView from './components/sales/SalesView'
import InventoryView from './components/inventory/InventoryView'
import RecordsView from './components/records/RecordsView'

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

        <div className='auxiliary-information-box'>
          <div className='search-bar-portal'>
            Search Bar Placeholder
            </div>
          <div className='sync-status-box'>
            <div>Online | 2 pending sync</div>
            <div>v2026.09.17_0ff2654</div>
          </div>
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
