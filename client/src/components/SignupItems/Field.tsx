import React from 'react'
import './SignupItems.css'

const Field: React.FC<{title: string, type: string, onChange: (value: string) => void, placeholder: string}> = ({title, type, onChange, placeholder}) => {
  return (
    <div className='signup-form-field'>
      <span>{title}</span>
      <input 
        type={type} 
        required
        onChange={(e) => onChange(e.target.value)}
        // placeholder={placeholder} cần thì thêm
      />
    </div>
  )
}

export default Field
