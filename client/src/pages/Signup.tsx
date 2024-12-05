import React from 'react'
import Field from '../components/SignupItems/Field.tsx'
import '../css/Signup.css'
import Button from '../components/SignupItems/Button.tsx'
import HaveAccount from '../components/SignupItems/HaveAccount.tsx'
const Signup: React.FC = () => {
  const fieldInfo = [
      {title: 'Họ và tên', type: 'text'},
      {title: 'Email', type: 'text'},
      {title: 'Mã số sinh viên', type: 'text'},
      {title: 'Số điện thoại', type: 'text'},
      {title: 'Khoa', type: 'text'},
      {title: 'Mật khẩu', type: 'password'},
      {title: 'Ngày sinh', type: 'text'}, // change to date
      {title: 'Xác nhận mật khẩu', type: 'password'},
    ]
  return (
    <div className='wrapper'>
      <div className='signup-container'>
        <img src={require('../components/assets/image/hcmut.png')} alt="logo" />
        <span className='signup-title'>ĐĂNG KÝ</span>
        <div className='signup-form'>
          <div className='signup-form-fields'>
            {fieldInfo.map((item, index) => (
              <Field title={item.title} type={item.type} key={index} />
            ))}
          </div>
          <Button />
          <HaveAccount />
        </div>
      </div>
    </div>
  )
}

export default Signup
