import React from 'react'
import './LoginItems.css'
interface ButtonProps {
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({onClick}) => {
  return (
    
      <button className='button-container' onClick={onClick}>Đăng nhập</button>
   
  )
}

export default Button
