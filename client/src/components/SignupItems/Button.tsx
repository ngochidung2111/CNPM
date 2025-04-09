import React, { useEffect } from 'react'
import './SignupItems.css'
interface ButtonProps {
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ onClick }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClick]);

  return (
    <button className='signup-form-button' onClick={onClick}>Xác nhận</button>
  );
};

export default Button
