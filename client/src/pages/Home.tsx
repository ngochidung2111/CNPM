// src/pages/Home.js
import React from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import { menuItems } from '../data/menuItems.tsx';
import '../css/Home.css'; // Import file CSS để styling
const Home: React.FC = () => {

  return (
   
    <div>
      <Sidebar menuItems={menuItems} />
        <Header title='Mua thêm trang in' />
      <h1 className='main'>Home Page</h1>
    </div>
  );
};

export default Home;