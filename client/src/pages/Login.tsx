import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Field from '../components/LoginItems/Field.tsx';
import Forgot from '../components/LoginItems/Forgot.tsx';
import Button from '../components/LoginItems/Button.tsx';
import NoAccount from '../components/LoginItems/NoAccount.tsx';
import '../css/Login.css';

const Login: React.FC = () => {
  // const navigate = useNavigate()
  const location = useLocation();
  const { role } = location.state || {}
  const navigator = useNavigate();
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

  const handleLogin = async () => {
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
      if(formData.role==='') {
        alert('Vui lòng chọn loại đăng nhập(role)')
        setTimeout(() => navigator('/authorization'), 1000)
      }
      else {
        login();
      }
    }
    console.log('click');
  };
  const login = async () => {
    console.log("login before executing", formData);
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
      // lưu vào local storage để dùng cho các trang cần phải đăng nhập
      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('role',role);
      localStorage.setItem('id', responseData.userData._id);
      navigator('/');
      console.log('Login successfully', responseData);

    }
    else {
      alert(`responseData.errors:  ${responseData.errors}`);
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
  );
};

export default Login;