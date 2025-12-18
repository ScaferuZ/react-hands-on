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
        <div className="card-meta">
          <Badge>{category}</Badge>
          <div className="name">{name}</div>
        </div>

        <div className="card-actions">
          <div className="price">${price.toFixed(2)}</div>
          <button className="btn" onClick={() => onAdd(product)} aria-label={`Add ${name}`}>
            <Plus size={14} />
            <span style={{marginLeft:6}}>Add</span>
          </button>
        </div>
      </div>
    </Card>
  )
}
