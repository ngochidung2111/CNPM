import React from 'react';
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PurchaseHistory.css";
import { menuItems } from '../data/menuItems.tsx';

const historyData = [
      { id: '123', time: '01/10/2024', number: 20,total:20000 },
      { id: '123', time: '01/10/2024', number: 20,total:20000 },
      { id: '123', time: '01/10/2024', number: 20,total:20000 },
      { id: '123', time: '01/10/2024', number: 20,total:20000 },
      { id: '123', time: '01/10/2024', number: 20,total:20000 }
  ];
const PurchaseHistory = () => {
  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Lịch sử mua" />
      <div className="content">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Thời gian mua</th>
                            <th>Số trang</th>
                            <th>Tổng tiền (VNĐ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.id}</td>
                                <td>{record.time}</td>
                                <td>{record.number}</td>
                                <td>{record.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default PurchaseHistory;