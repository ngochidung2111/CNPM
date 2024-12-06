import React from 'react'
import './LoginItems.css'
interface ButtonProps {
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({onClick}) => {
  return (
    <div className='button-container'>
      <button onClick={onClick}>Đăng nhập</button>
    </div>
  )
}

export default Button
