import { useState } from 'react'

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
          onClick={() => setActiveTab('Records')}
          className={activeTab === 'Records' ? 'active' : ''}
        >
          Records
        </button>
      </nav>

      <main>
        {activeTab === 'Sales' && (
          <>
            <section>
              This will occupy 2/3 of the parent div
            </section>
            <section>
              This will occupy 1/3 of the parent div
            </section>
            Outside of 2 sections but inside main
          </>
        )}

        {activeTab === 'Inventory' && (
          <>
            <section>
              This section will hold Procurement Details
            </section>
            <section>
              This section will hold the Product Lists
            </section>
            Place holder text to indicate area outside of sections
          </>
        )}

        {activeTab === 'Records' && (
          <>
            <section>
              This will occupy Line-of-Credit records
            </section>
            <section>
              This will occupy most recent sale transactions
            </section>
            <section>
              This will occupy most recent procurement transactions
            </section>
            Placeholder text
          </>
        )}
      </main>
    </>
  )
}

export default App
