import { useState } from 'react'

function RecordsView() {

  const [activeTab, setActiveTab] =
    useState<'Line of Credit' | 'Sales Transactions' | 'Restock Entries' | 'Edit Logs'>('Line of Credit')

  return (
    <>
      <div className='primary-controls-area'>
        <button
          onClick={() => setActiveTab('Line of Credit')}
          className={activeTab === 'Line of Credit' ? 'active' : ''}
        >
          Line of Credit
        </button>

        <button
          onClick={() => setActiveTab('Sales Transactions')}
          className={activeTab === 'Sales Transactions' ? 'active' : ''}
        >
          Sales Transactions
        </button>

        <button
          onClick={() => setActiveTab('Restock Entries')}
          className={activeTab === 'Restock Entries' ? 'active' : ''}
        >
          Restock Entries
        </button>

        <button
          onClick={() => setActiveTab('Edit Logs')}
          className={activeTab === 'Edit Logs' ? 'active' : ''}
        >
          Edit Logs
        </button>
      </div>

      <div className='auxiliary-controls-area'>
        Records Auxiliary Controls
      </div>

      <section>
        Records Ledger Area
      </section>
    </>
  )
}

export default RecordsView

