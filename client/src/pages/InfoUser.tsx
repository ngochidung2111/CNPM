import React, { useEffect, useState } from 'react'
import Button from '../components/InfoUserItems/Button.tsx'
import InfoFrame from '../components/InfoUserItems/InfoFrame.tsx'
import Header from '../components/header/header.tsx'
import Sidebar from './../components/sidebars/Sidebar.tsx';
interface Info {
  label: string,
  value: string
}
const InfoUser: React.FC = () => {
  const menuItems = [
    { title: "In tài liệu", link: "/print" },
    { title: "Mua thêm trang in", link: "/mua-them-trang-in" },
    { title: "Xem lịch sử in", link: "/lich-su-in" },
  ];
    const [info, setInfo] = useState([
        { label: 'Họ và tên', value: 'Nguyễn Văn A' },
        { label: 'Mã số sinh viên', value: '2222222' },
        { label: 'Khoa', value:'Khoa học và Kỹ thuật Máy tính' },
        { label: 'Ngày tháng năm sinh', value: '01/01/2024' },
        { label: 'Phái', value: 'Nữ' },
        { label: 'Địa chỉ', value: '242 Phạm Văn Đồng, P.Hiệp Bình Chánh, TP.Thủ Đức, TP.HCM' },
        { label: 'Email', value: 'a.nguyenvnpm@hcmut.edu.vn' },
        { label: 'Số điện thoại', value: '0123456789' },
    ])
    const [lastInfo, setLastInfo] = useState(info)
    const [clickButton, setClickButton] = useState(false);
    const handleUpdate = () => {
        setClickButton(true);
        setLastInfo(info);
        console.log('Cập nhật: ', info);
    }

    const handleCancel = () => {
        setClickButton(true);
        setInfo(lastInfo);
        console.log('Hủy: ', lastInfo);
    }

    const handlePersonalInfoChange = (newValues: Info[]) => {
        const updatedInfo = [...info];
        newValues.forEach((item, index) => {
            updatedInfo[index] = item;
        });
        setInfo(updatedInfo);
    };

    const handleAccountInfoChange = (newValues: Info[]) => {
        const updatedInfo = [...info];
        newValues.forEach((item, index) => {
            updatedInfo[info.length - 2 + index] = item;
        });
        setInfo(updatedInfo);
    };

  return (
    <div>
      <Header title='Thông tin cá nhân'/>
      <Sidebar menuItems={menuItems}/>
      <div className='info-user' style={{marginTop: '100px'}}>
        <InfoFrame 
          title="THÔNG TIN CÁ NHÂN" 
          info={info.slice(0, -2)} 
          onValuesChange={handlePersonalInfoChange}
          onResetInput={clickButton}  
        />
        <InfoFrame 
          title="THÔNG TIN TÀI KHOẢN" 
          info={info.slice(-2)} 
          onValuesChange={handleAccountInfoChange}
          onResetInput={clickButton}
        />      
        <div style={{display: 'flex', justifyContent: 'center', gap: '100px', marginTop: '40px'}}>
          <Button text="Cập nhật" color="#76ADFF" onClick={handleUpdate} />
          <Button text="Hủy" color="#EB4A4A" onClick={handleCancel} />
        </div>
      </div>
    </div>
  )
}

export default InfoUser
