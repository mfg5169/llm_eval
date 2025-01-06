import React from 'react'

interface LabelProps {
    className: string;  // ClassName should be `className` (camelCase)
    text: string;
  }
  

function Label({ className, text }: LabelProps) {
  return (
    <div className={className}>
     <label>{text}</label>
    </div>
  )
}

export default Label