import React from 'react'
import Field from '../components/SignupItems/Field.tsx'
import '../css/Signup.css'
import Button from '../components/SignupItems/Button.tsx'
import HaveAccount from '../components/SignupItems/HaveAccount.tsx'
const Signup: React.FC = () => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    studentId: '',
    phone: '',
    faculty: '',
    password: '',
    birthDate: '',
    confirmPassword: ''
  });

  const fieldInfo = [
    {title: 'Họ và tên', type: 'text', key: 'fullName', placeholder: 'Nguyen Van A'},
    {title: 'Email', type: 'text', key: 'email', placeholder: 'example@gmail.com'},
    {title: 'Mã số sinh viên', type: 'text', key: 'studentId', placeholder: '2222222'},
    {title: 'Số điện thoại', type: 'text', key: 'phone', placeholder: '0909090909'},
    {title: 'Khoa', type: 'text', key: 'faculty', placeholder: 'MT'},
    {title: 'Mật khẩu', type: 'password', key: 'password', placeholder: 'Nhập mật khẩu'},
    {title: 'Ngày sinh', type: 'text', key: 'birthDate', placeholder: '10/06/2004'},
    {title: 'Xác nhận mật khẩu', type: 'password', key: 'confirmPassword', placeholder: 'Nhập lại mật khẩu'}
  ]

  const handleSignup = () => {
    // check if all fields are filled
    const isFormValid = Object.values(formData).every(value => value !== '');
    
    if (isFormValid) {
      if(formData.password === formData.confirmPassword) {
      console.log('Thông tin đăng ký:', formData);
      alert('Đăng ký thành công');
      // window.location.href = '/login';
      }
      else {
        alert('Mật khẩu không khớp');
      }
    } else {
      console.log('Vui lòng điền đầy đủ thông tin');
    }
  }

  const handleFieldChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  }

  return (
    <div className='wrapper'>
      <div className='signup-container'>
        <img src={require('../components/assets/image/hcmut.png')} alt="logo" />
        <span className='signup-title'>ĐĂNG KÝ</span>
        <div className='signup-form'>
          <div className='signup-form-fields'>
            {fieldInfo.map((item, index) => (
              <Field 
                title={item.title} 
                type={item.type} 
                key={index}
                onChange={(value) => handleFieldChange(item.key, value)}
                placeholder={item.placeholder}
              />
            ))}
          </div>
          <Button onClick={handleSignup}/>
          <HaveAccount />
        </div>
      </div>
    </div>
  )
}

export default Signup
