import React from 'react'

export function ScrollArea({ children, className = '' }) {
  return <div className={`scroll-area ${className}`}>{children}</div>
}

export default ScrollArea
