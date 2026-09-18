import './InventoryView.css'
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
        <div className='product-subcategory-filters'>
          Product Subcategory Filters
        </div>

        <div className='low-stock-filters'>
          <button>All</button>
          <button>Low</button>
          <button>Out</button>
        </div>

        <div className='add-product-area'>
          <button>Add Product</button>
        </div>
      </div>

      <section>
        <InventoryTable selectedCategory={selectedCategory} />
      </section>
    </>
  )
}

export default InventoryView

