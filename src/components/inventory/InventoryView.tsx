import { defaultProducts } from './defaultProducts'
import InventoryTable from './InventoryTable'
import { useState } from 'react'

function InventoryView() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [...new Set(defaultProducts.map((product) => product.category))]

  return (
    <>
      <div className='primary-controls-area'>
        <button
          className={selectedCategory === 'All' ? 'active' : ''}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='auxiliary-controls-area'>
        Inventory Auxiliary Controls
      </div>

      <section>
        <InventoryTable selectedCategory={selectedCategory} />
      </section>
    </>
  )
}

export default InventoryView

