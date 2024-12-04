// src/pages/Home.js
import React from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/Home.css'; // Import file CSS để styling
const Home: React.FC = () => {

    const menuItems = [
        { title: "In tài liệu", link: "/print" },
        { title: "Mua thêm trang in", link: "/mua-them-trang-in" },
        { title: "Xem lịch sử in", link: "/lich-su-in" },
      ];
  return (
   
    <div>
      <Sidebar menuItems={menuItems} />
        <Header title='Mua thêm trang in' />
      <h1 className='main'>Home Page</h1>
    </div>
  );
};

export default Home;