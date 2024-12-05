import React from 'react'
import './InfoUserItems.css'
interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, color, onClick }) => {
  return (
    <div className="info-button">
      <button onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
    </div>
  )
}

export default Button
