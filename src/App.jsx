import React, { useState } from 'react'
import products from './data/products'
import ProductCard from './components/ProductCard'
import OrderSummary from './components/OrderSummary'

export default function App(){
  const [items, setItems] = useState([])

  function handleAdd(product){
    setItems((cur)=>{
      const found = cur.find(i=>i.id===product.id)
      if(found) return cur.map(i=> i.id===product.id ? {...i, qty: i.qty+1} : i)
      return [{...product, qty:1}, ...cur]
    })
  }

  function handleRemove(id){
    setItems((cur)=>cur.filter(i=>i.id!==id))
  }

  function handleClear(){
    setItems([])
  }

  return (
    <div className="app">
      <div className="panel">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div className="title">Coffee Menu</div>
            <div className="sub">Premium selection — minimalist design</div>
          </div>
        </div>

        <div className="grid" style={{marginTop:14}}>
          {products.map(p=> (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </div>

      <OrderSummary items={items} onRemove={handleRemove} onClear={handleClear} />
    </div>
  )
}
