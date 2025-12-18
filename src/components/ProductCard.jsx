import React from 'react'
import Card from './ui/Card'
import { Badge } from './ui/Badge'
import { Plus } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  const { name, category, price, img } = product

  return (
    <Card className="product-card">
      <img src={img} alt={name} className="card-img" />

      <div className="card-row">
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Badge>{category}</Badge>
          <div style={{fontWeight:700}}>{name}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="price">${price.toFixed(2)}</div>
          <button className="btn" onClick={() => onAdd(product)} aria-label={`Add ${name}`}>
            <Plus size={14} style={{verticalAlign:'middle',marginRight:6}} /> Add
          </button>
        </div>
      </div>
    </Card>
  )
}
