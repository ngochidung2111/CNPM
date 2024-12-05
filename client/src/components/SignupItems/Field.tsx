import React from 'react'
import './SignupItems.css'
const Field: React.FC<{title: string, type: string}> = ({title, type}) => {
  return (
    <div className='signup-form-field'>
      <span>{title}</span>
      <input type={type} />
    </div>
  )
}

export default Field
