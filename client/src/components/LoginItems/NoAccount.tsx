import React from 'react'
import { useNavigate } from 'react-router-dom';

const NoAccount: React.FC = () => {
  const navigate = useNavigate(); // Khai báo hook
  return (
    <div className='no-account-container'>
        <span>Chưa có tài khoản?</span>
        <span onClick={() => navigate('/signup')}>Đăng ký</span>
    </div>
  )
}

export default NoAccount
