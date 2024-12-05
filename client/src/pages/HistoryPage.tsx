import React from 'react';
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/HistoryPage.css";
import { menuItems } from '../data/menuItems.tsx';

const historyData = [
      { printerId: 'AA.123', printTime: '01/10/2024', documentName: 'CNPM.pdf' },
      { printerId: 'AA.123', printTime: '01/10/2024', documentName: 'CNPM.pdf' },
      { printerId: 'AA.123', printTime: '01/10/2024', documentName: 'CNPM.pdf' },
      { printerId: 'AA.123', printTime: '01/10/2024', documentName: 'CNPM.pdf' },
      { printerId: 'AA.123', printTime: '01/10/2024', documentName: 'CNPM.pdf' },
      { printerId: 'AA.123', printTime: '01/10/2024', documentName: 'CNPM.pdf' }
  ];
const HistoryPage = () => {
  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Xem lịch sử in" />
      <div className="content">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Mã máy in</th>
                            <th>Thời gian in</th>
                            <th>Tên tài liệu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.printerId}</td>
                                <td>{record.printTime}</td>
                                <td>{record.documentName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default HistoryPage;