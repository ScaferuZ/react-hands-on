import React from 'react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <Card>
      <img className="card-img" src={product.img} alt={product.name} />
      <div style={{width:'100%'}}>
        <div className="card-row">
          <div>
            <div style={{fontWeight:700}}>{product.name}</div>
            <Badge>{product.category}</Badge>
          </div>
          <div style={{textAlign:'right'}}>
            <div className="price">${product.price.toFixed(2)}</div>
            <div style={{marginTop:8}}>
              <button className="btn" onClick={() => onAdd(product)} aria-label={`Add ${product.name}`}>
                <ShoppingCart size={14} style={{verticalAlign:'middle', marginRight:8}} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
