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

  function isValidDate(dateStr) {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 26;
  
    // Tách ngày, tháng, năm
    const [day, month, year] = dateStr.split('/').map(Number);
  
    // Kiểm tra năm
    if (year < minYear || year > minYear + 8) return false;
  
    // Kiểm tra tháng (1-12)
    if (month < 1 || month > 12) return false;


    // Xác định số ngày tối đa của tháng
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    // Kiểm tra năm nhuận
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (isLeapYear && month === 2) daysInMonth[1] = 29;
  
    // Kiểm tra ngày
    if (day < 1 || day > daysInMonth[month - 1]) return false;


    return true; 
  }
  const signup = async (dataSend) => {
          try {
            const response = await fetch('http://localhost:5000/api/students', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataSend)  
            });
            const data = await response.json();
            console.log('data: ' ,data);
            if(data.success) {
              alert('Đăng ký thành công');
            } else {
              alert(data.message);
            }
          }
            
          catch {
            console.error('Error: Failed to fetch data');
            alert('Đăng ký thất bại');
          }
      }
  
  const handleSignup = () => {
    // check if all fields are filled
    const isFormValid = Object.values(formData).every(value => value !== '');
    let valid = false;
    if(formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp');
    }
    else if(formData.password.length < 6) {
      alert('Mật khẩu phải ít nhất 6 ký tự');
    }
    else if(formData.studentId.length !== 7) {
      alert('Mã số sinh viên phải 7 chữ số');
    }
    else if(!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      alert('Email không hợp lệ');
    }
    else if(!formData.phone.match(/^(0[1-9]|\+\d{1,2})[0-9]{8,9}$/)) {
      alert('Số điện thoại không hợp lệ');
    }
    else if (!isValidDate(formData.birthDate)){
      alert('Ngày sinh không hợp lệ')
    }
    else {
      valid = true;
    }
    if (isFormValid && valid) {
      const dataSend = {
          "_id": formData.studentId,   
          "name": formData.fullName,             
          "email": formData.email,
          "password": formData.password,   
          "faculty": formData.faculty,
          "phone": formData.phone,
          "dob": formData.birthDate,   
          "pageBalance": 100                
      }
      console.log('Thông tin đăng ký: ', dataSend);
      signup(dataSend);
      window.location.href = '/login';
    }
    else {
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
