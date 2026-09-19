function App() {
  return (
    <>
      <header>
        <nav className="navigation-buttons-area">
          Navigation Buttons
        </nav>

        <div className="auxiliary-information-area">
          <div className="search-bar-area">
            Search Portal
          </div>

          <aside className="sync-version-area">
            <div className="sync-status-box">
              Sync Status
            </div>
            <div className="version-id-box">
              Version ID
            </div>
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
        Main Content
      </main>
    </>
  )
}

export default App