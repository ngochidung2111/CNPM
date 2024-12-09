import React from 'react'
import './SignupItems.css'
const Button: React.FC<{onClick: () => void}> = ({onClick}) => {
  return (
    <div className='signup-form-button'>
      <button onClick={onClick}>XÁC NHẬN</button>
    </div>
  )
}

export default Button
