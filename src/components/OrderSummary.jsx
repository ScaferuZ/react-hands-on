import React, { useState } from 'react'
import { ScrollArea } from './ui/ScrollArea'
import { Trash2, Plus, Minus } from 'lucide-react'
import Dialog from './ui/Dialog'
import useToast from './ui/use-toast'

export default function OrderSummary({ items = [], onInc, onDec, onRemove, onClear }) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleConfirm = () => {
    // simple confirm flow
    toast({ title: 'Payment received', description: `Total charged $${total.toFixed(2)}` })
    onClear()
    setOpen(false)
  }

  return (
    <div className="panel">
      <div className="order-header">
        <div>
          <div style={{fontWeight:700}}>Your Order</div>
          <div className="muted">Review items before checkout</div>
        </div>
        <div>
          <button className="btn" onClick={onClear} aria-label="Clear order"><Trash2 size={16} /></button>
        </div>
      </div>

      <ScrollArea>
        {items.length === 0 ? (
          <div className="empty muted">No items yet — add drinks from the left.</div>
        ) : (
          <div className="order-items">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="order-item">
                <div style={{flex:1}}>
                  <div className="name">{product.name}</div>
                  <div className="qty">{product.category} • {qty} × ${product.price.toFixed(2)}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <button className="btn" onClick={() => onDec(product)} aria-label="Decrease"><Minus size={14} /></button>
                  <div style={{minWidth:24,textAlign:'center',fontWeight:700}}>{qty}</div>
                  <button className="btn" onClick={() => onInc(product)} aria-label="Increase"><Plus size={14} /></button>
                  <button className="btn" onClick={() => onRemove(product)} aria-label="Remove"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="order-footer">
        <div>
          <div className="muted">Subtotal</div>
          <div style={{fontWeight:700}}>${subtotal.toFixed(2)}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="muted">Tax</div>
          <div>${tax.toFixed(2)}</div>
          <div style={{marginTop:6,fontSize:16,fontWeight:800}}>Total ${total.toFixed(2)}</div>
        </div>
      </div>

      <div style={{marginTop:12,display:'flex',gap:8}}>
        <button className="btn btn-primary" style={{flex:1}} onClick={() => setOpen(true)} disabled={items.length === 0}>Checkout</button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="dialog-summary">
          <div style={{fontWeight:800,fontSize:18,marginBottom:8}}>Confirm Payment</div>
          <div className="muted" style={{marginBottom:12}}>Please confirm the following order totals.</div>

          <div className="dialog-items">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="dialog-row" style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{fontWeight:700}}>{product.name} × {qty}</div>
                <div style={{fontWeight:700}}>${(product.price * qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
            <div className="muted">Subtotal</div>
            <div>${subtotal.toFixed(2)}</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className="muted">Tax</div>
            <div>${tax.toFixed(2)}</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontWeight:800,fontSize:16}}>
            <div>Total</div>
            <div>${total.toFixed(2)}</div>
          </div>

          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleConfirm}>Confirm Payment</button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
