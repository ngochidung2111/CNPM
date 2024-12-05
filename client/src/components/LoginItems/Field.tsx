import React from 'react'
import './LoginItems.css'
interface FieldProps {
    title: string;
    placeholder: string;
    type: string;
}
const Field: React.FC<FieldProps> = ({title, placeholder, type}) => {
  return (
    <div className='field-container'>
      <span>{title}</span>
      <input type={type} placeholder={placeholder} />
    </div>
  )
}

export default Field
