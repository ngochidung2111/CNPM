import React, { useState } from 'react'
import Field from '../components/LoginItems/Field.tsx'
import Forgot from '../components/LoginItems/Forgot.tsx'
import Button from '../components/LoginItems/Button.tsx'
import NoAccount from '../components/LoginItems/NoAccount.tsx'
import '../css/Login.css'
// import { useNavigate } from 'react-router-dom'
const Login: React.FC = () => {
  // const navigate = useNavigate()
  const [formData, setFormData] = useState({
    account: '',
    password: ''
  });
  const [hasError, setHasError] = useState([false, false]);
  const handleInputChange = (name: string, value: string) => {
    setHasError([false, false]);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleLogin = () => {
    const newHasError = [...hasError];

    if (formData.account.trim() === '') {
      newHasError[0] = true;
    } else {
      newHasError[0] = false;
    }
    
    if (formData.password.trim() === '') {
      newHasError[1] = true;
    } else {
      newHasError[1] = false;
    }
    setHasError(newHasError);

    if (!(newHasError[0] || newHasError[1])) {
      console.log('Form data:', formData);
      // check login valid here
    }
    console.log('click');
  };

  const fieldInfo = [
    {title: 'Tài khoản', placeholder: 'Nhập email/SĐT', type: 'text'},
    {title: 'Mật khẩu', placeholder: 'Nhập mật khẩu', type: 'password'}
  ]
  return (
    <div className='login-container'>
        <img src={require('../components/assets/image/hcmut.png')} alt="logo" />
        <span className='login-title'>ĐĂNG NHẬP</span>
        <div className='login-form'>
            <Field 
              title={fieldInfo[0].title} 
              placeholder={fieldInfo[0].placeholder} 
              type={fieldInfo[0].type} 
              onChange={(value) => handleInputChange('account', value)}
              error={hasError[0] ? 'Vui lòng nhập tài khoản' : ''}
            />
            <Field 
              title={fieldInfo[1].title} 
              placeholder={fieldInfo[1].placeholder} 
              type={fieldInfo[1].type} 
              onChange={(value) => handleInputChange('password', value)}
              error={hasError[1] ? 'Vui lòng nhập mật khẩu' : ''}
            />
            <Forgot />  
            <Button onClick={handleLogin} />
            <NoAccount />
        </div>
        
    </div>
  )
}

export default Login
