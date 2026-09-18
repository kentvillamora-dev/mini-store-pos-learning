import { defaultProducts } from '../inventory/defaultProducts'
import { useState } from 'react'

function SalesView() {
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
        Sales Auxiliary Controls
      </div>

      <section>
        <div className='sales-product-selection'>
          Product Selection Area
        </div>
        <div className='sales-checkout-cart'>
          Checkout Cart Area
        </div>
      </section>
    </>
  )
}

export default SalesView
