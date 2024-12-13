import React from 'react'
import './SignupItems.css'

const Field: React.FC<{title: string, type: string, onChange: (value: string) => void, placeholder: string}> = ({title, type, onChange, placeholder}) => {
  return (
    <div className='signup-form-field'>
      <label htmlFor={title}>{title}</label>
      <input 
        id={title}
        type={type} 
        required
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Field
