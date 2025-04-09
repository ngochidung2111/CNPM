import React from 'react'
import './HomepageFooter.css'
const HomepageFooter: React.FC = () => {
  return (
    <div className='homepage-footer'>
      <div className='homepage-footer-content-left'>
        <img src={require('../assets/image/hcmut.png')} alt="Logo" />
        <div className='homepage-footer-location'>
          <span> Cơ sở Lý Thường Kiệt: 268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM </span>
          <span> Cơ sở Dĩ An: Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương </span>
        </div>
      </div>
      <div className='homepage-footer-content-right'>
        <span>Thông tin liên hệ và hỗ trợ:</span>
        <a href="mybk">MyBK</a>
        <a href="email">Email</a>
        <a href="form">Biểu mẫu thông tin liên hệ</a>
      </div>
    </div>
  )
}

export default HomepageFooter
