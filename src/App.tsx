import { useState } from 'react'
import NavigationButtons from './components/navigation/NavigationButtons'

function App() {
  const [activeView, setActiveView] = useState('Sales')

  return (
    <>
      <header>
        <nav className="navigation-buttons-area">
          <NavigationButtons
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </nav>

        <div className="auxiliary-information-area">
          <div className="search-bar-area">
            Search Portal
          </div>

          <aside className="sync-version-area">
            <div>Sync Status</div>
            <div>Version ID</div>
          </aside>
        </div>
      </header>

      <div className="primary-controls-area">
        Primary Controls
      </div>

      <div className="auxiliary-controls-area">
        Auxiliary Controls
      </div>

      <main>
        Active View: {activeView}
      </main>
    </>
  )
}

export default App