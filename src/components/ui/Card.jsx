import React from 'react'

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`card-root ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
