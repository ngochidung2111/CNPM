import React from 'react'
import './SignupItems.css'
import { useNavigate } from 'react-router-dom'
const HaveAccount: React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className='signup-have-account'>
      <span>Đã có tài khoản?</span>
      <span onClick={() => navigate('/login')}>Đăng nhập</span>
    </div>
  )
}

export default HaveAccount
