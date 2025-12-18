import React, { useState } from 'react'
import products from './data/products'
import ProductCard from './components/ProductCard'
import OrderSummary from './components/OrderSummary'

export default function App(){
  const [cart, setCart] = useState({})

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev[product.id]
      return {...prev, [product.id]: { product, qty: existing ? existing.qty + 1 : 1 }}
    })
  }

  const inc = (product) => addToCart(product)

  const dec = (product) => {
    setCart(prev => {
      const existing = prev[product.id]
      if (!existing) return prev
      if (existing.qty <= 1) {
        const copy = {...prev}
        delete copy[product.id]
        return copy
      }
      return {...prev, [product.id]: { product, qty: existing.qty - 1 }}
    })
  }

  const remove = (product) => {
    setCart(prev => {
      const copy = {...prev}
      delete copy[product.id]
      return copy
    })
  }

  const clear = () => setCart({})

  const items = Object.values(cart)

  return (
    <div className="app">
      <div>
        <div style={{padding:20}}>
          <div className="title">Coffee POS — Premium Minimal</div>
          <div className="sub">Select drinks on the left. Your order shows on the right.</div>
        </div>

        <div className="panel">
          <div className="grid">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <OrderSummary items={items} onInc={inc} onDec={dec} onRemove={remove} onClear={clear} />
      </div>
    </div>
  )
}
