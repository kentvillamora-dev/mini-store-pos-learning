import { useState } from 'react'
//import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Sales')

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
          onClick={() => setActiveTab('Record')}
          className={activeTab === 'Record' ? 'active' : ''}
        >
          Records
        </button>
      </nav>

      <main>
        <section>
          This will occupy 2/3 of the parent div
        </section>
        <section>
          This will occupy 1/3 of the parent div
        </section>
        Outside of 2 sections but inside main
      </main>
    </>
  )
}

export default App
