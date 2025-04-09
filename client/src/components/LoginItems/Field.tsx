import React from 'react'
import './LoginItems.css'
interface FieldProps {
    title: string;
    placeholder: string;
    type: string;
    onChange: (value: string) => void;
    error: string;
}
const Field: React.FC<FieldProps> = ({title, placeholder, type, onChange, error}) => {
  return (
    <div className='field-container'>
      <label htmlFor={type} >{title}</label>
      <input id={type} type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {error && <span className='error-message'>{error}</span>}
    </div>
  )
}

export default Field
