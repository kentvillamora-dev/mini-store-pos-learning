import './NavigationButtons.css'

type NavigationButtonsProps = {
  activeView: string
  setActiveView: (view: string) => void
}

function NavigationButtons({
  activeView,
  setActiveView,
  }: NavigationButtonsProps) {
  return (
    <div className="navigation-buttons">
      <button
        className={activeView === 'Sales' ? 'active' : ''}
        onClick={() => setActiveView('Sales')}
      >
        Sales
      </button>

      <button
        className={activeView === 'Inventory' ? 'active' : ''}
        onClick={() => setActiveView('Inventory')}
      >
        Inventory
      </button>

      <button
        className={activeView === 'Records' ? 'active' : ''}
        onClick={() => setActiveView('Records')}
      >
        Records
      </button>
    </div>
  )
}

export default NavigationButtons