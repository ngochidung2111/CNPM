import React, { useState } from 'react'
import Field from '../components/LoginItems/Field.tsx'
import Forgot from '../components/LoginItems/Forgot.tsx'
import Button from '../components/LoginItems/Button.tsx'
import NoAccount from '../components/LoginItems/NoAccount.tsx'
import '../css/Login.css'
import { useLocation } from 'react-router-dom'

const Login: React.FC = () => {
  const location = useLocation();
  const { role } = location.state || {}
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    role: role || '',
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

    if (formData.id.trim() === '') {   ////////
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
      login();
    }
    console.log('click');
  };
  const login = async () => {
    console.log("login before executing", formData);
    // issue: email --> id ? , dang set theo database
    // chua bao ve url
    ////


    let responseData;
    await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)
    if(responseData.success) {
      // đang check only token nên từ từ tính 
      // // thêm thời điểm hết hạn là 3 ngày, nào dùng check phát quá hạn thì cút
      // const now = new Date();
      // const expiry = now.getTime() + 3 * 24 * 60 * 60 * 1000;
      // const token = {
      //   accessToken: responseData.accessToken,
      //   expiry: expiry
      // }
      // // lưu vào local storage để dùng cho các trang cần phải đăng nhập
      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('role',role);
      localStorage.setItem('id', responseData.userData._id); 
      window.location.replace('/home');
    }
    else {
      alert(responseData.errors);
    }
  }

  const fieldInfo = [
    {title: 'Mã số sinh viên', placeholder: 'Nhập mã số sinh viên', type: 'text'},
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
              onChange={(value) => handleInputChange('id', value)} ///////
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
