import React from 'react'
import './HomepageHeader.css'
const HomepageHeader: React.FC = () => {
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
      <a href='authorization' className='homepage-header-button'>Đăng nhập</a>
      
    </div>
  )
}

export default HomepageHeader
