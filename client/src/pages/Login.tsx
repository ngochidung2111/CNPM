import React from 'react'
import Field from '../components/LoginItems/Field.tsx'
import Forgot from '../components/LoginItems/Forgot.tsx'
import Button from '../components/LoginItems/Button.tsx'
import NoAccount from '../components/LoginItems/NoAccount.tsx'
import '../css/Login.css'
const Login: React.FC = () => {
  const fieldInfo = [
    {title: 'Tài khoản', placeholder: 'Nhập email/SĐT', type: 'text'},
    {title: 'Mật khẩu', placeholder: 'Nhập mật khẩu', type: 'password'}
  ]
  return (
    <div className='login-container'>
        <img src={require('../components/assets/image/hcmut.png')} alt="logo" />
        <span className='login-title'>ĐĂNG NHẬP</span>
        <div className='login-form'>
            <Field title={fieldInfo[0].title} placeholder={fieldInfo[0].placeholder} type={fieldInfo[0].type} />
            <Field title={fieldInfo[1].title} placeholder={fieldInfo[1].placeholder} type={fieldInfo[1].type} />
            <Forgot />  
            <Button />
            <NoAccount />
        </div>
        
    </div>
  )
}

export default Login
