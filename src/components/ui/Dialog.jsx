import React from 'react'

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null

  return (
    <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:60}}>
      <div onClick={() => onOpenChange(false)} style={{position:'absolute',inset:0,background:'rgba(2,6,23,0.6)'}} />
      <div style={{position:'relative',background:'#071322',padding:20,borderRadius:12,minWidth:360,boxShadow:'0 10px 40px rgba(2,6,23,0.8)'}}>
        {children}
      </div>
    </div>
  )
}

export default Dialog
