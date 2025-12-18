import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((opts) => {
    const id = Math.random().toString(36).slice(2,9)
    const t = { id, title: opts.title || 'Notification', description: opts.description || '', duration: opts.duration ?? 3000 }
    setToasts((s) => [...s, t])
    return id
  }, [])

  const remove = useCallback((id) => setToasts((s) => s.filter(t => t.id !== id)), [])

  const value = useMemo(() => ({ toast, remove, toasts }), [toast, remove, toasts])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return { toast: ctx.toast, remove: ctx.remove }
}

export function ToastViewport() {
  const ctx = useContext(ToastContext)
  if (!ctx) return null

  return (
    <div style={{position:'fixed',right:18,top:18,zIndex:80,display:'flex',flexDirection:'column',gap:10}}>
      {ctx.toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={() => ctx.remove(t.id)} />
      ))}
    </div>
  )
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    const id = setTimeout(() => onClose(), toast.duration)
    return () => clearTimeout(id)
  }, [toast, onClose])

  return (
    <div style={{minWidth:260,background:'#081824',padding:12,borderRadius:10,boxShadow:'0 6px 18px rgba(0,0,0,0.6)',border:'1px solid rgba(255,255,255,0.03)'}}>
      <div style={{fontWeight:700,marginBottom:4}}>{toast.title}</div>
      {toast.description ? <div style={{fontSize:13,color:'#9aa4b2'}}>{toast.description}</div> : null}
    </div>
  )
}

export default useToast
