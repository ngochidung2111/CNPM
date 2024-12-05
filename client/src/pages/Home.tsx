// src/pages/Home.js
import React from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import { menuItems } from '../data/menuItems.tsx';
const Home: React.FC = () => {

  return (
   
    <div>
      <Sidebar menuItems={menuItems} />
        <Header title='Mua thêm trang in' />
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;