import React, { useState } from 'react'
import ScrollArea from './ui/ScrollArea'
import { Trash2 } from 'lucide-react'
import Dialog from './ui/Dialog'
import { useToast } from './ui/use-toast'

export default function OrderSummary({ items, onRemove, onClear }) {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  return (
    <div className="panel">
      <div className="order-header">
        <div>
          <div className="title">Your Order</div>
          <div className="sub">Review items and complete the sale</div>
        </div>
        <button className="btn" onClick={onClear} aria-label="Clear order">
          <Trash2 size={16} />
        </button>
      </div>

      <ScrollArea>
        {items.length === 0 ? (
          <div className="empty muted">No items yet — add coffees from the left.</div>
        ) : (
          <div className="order-items">
            {items.map((it) => (
              <div key={it.id} className="order-item">
                <div style={{flex:1}}>
                  <div className="name">{it.name}</div>
                  <div className="qty">Qty: {it.qty} • ${it.price.toFixed(2)}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700}}>${(it.price * it.qty).toFixed(2)}</div>
                  <button className="btn" style={{marginTop:8}} onClick={() => onRemove(it.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="order-footer">
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <div className="muted">Total</div>
          <div style={{fontWeight:700,fontSize:18,color:'#fff'}}>${total.toFixed(2)}</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={() => setOpen(true)}>Checkout</button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <div style={{minWidth:320}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <div style={{fontWeight:700,fontSize:16}}>Confirm Order</div>
            <div className="muted">Total ${total.toFixed(2)}</div>
          </div>

          <div style={{maxHeight:240,overflow:'auto',marginBottom:12}}>
            {items.length === 0 ? (
              <div className="empty muted">No items in the order.</div>
            ) : (
              items.map((it) => (
                <div key={it.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
                  <div>
                    <div style={{fontWeight:700}}>{it.name}</div>
                    <div className="muted" style={{fontSize:13}}>Qty: {it.qty} • ${it.price.toFixed(2)}</div>
                  </div>
                  <div style={{fontWeight:700}}>${(it.qty * it.price).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn" onClick={() => {
              onClear()
              setOpen(false)
              toast({ title: 'Payment successful', description: `Collected $${total.toFixed(2)}` })
            }}>Confirm Payment</button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
