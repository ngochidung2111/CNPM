import React, { useEffect } from 'react'
import './LoginItems.css'
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
    <button className='button-container' onClick={onClick}>Đăng nhập</button>
  );
};

export default Button;