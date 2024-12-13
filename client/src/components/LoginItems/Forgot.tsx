import React from 'react'
import { useNavigate } from 'react-router-dom'
const Forgot: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/forgot')
  }
  return (
    <div className='forgot-container'>
      <span onClick={handleClick}>Quên mật khẩu?</span>
    </div>
  )
}

export default Forgot
