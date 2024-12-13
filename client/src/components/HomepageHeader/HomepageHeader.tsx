import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomepageHeader.css';

const HomepageHeader: React.FC = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const role = (localStorage.getItem('role') || '');

  const handleButtonClick = () => {
    if (role === 'Student') {
      navigate('/print');
    } else if (role === 'SPSO') {
      navigate('/printmanagement');
    } else {
      navigate('/authorization');
    }
  };

  return (
    <div className='homepage-header'>
      <div className='homepage-header-label'>
        <img src={require('../assets/image/hcmut.png')} alt="Logo" />
        <div className='homepage-header-location'>
          <span className='homepage-header-location-above'>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</span>
          <span className='homepage-header-location-below'>TRƯỜNG ĐẠI HỌC BÁCH KHOA</span>
        </div>
      </div>
      <div className='homepage-header-title'>
        DỊCH VỤ IN ẤN SINH VIÊN
      </div>
      <button onClick={handleButtonClick} className='homepage-header-button'>
        {role === 'Student' ? 'In Ngay' : role === 'SPSO' ? 'Quản Lý' : 'Đăng Nhập'}
      </button>
    </div>
  );
};

export default HomepageHeader;