import React, { useState } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/PrintHistorySSPS.css'; // Import file CSS để styling

// Định nghĩa interface cho dữ liệu lịch sử in
interface PrintHistoryItem {
  id: number;
  mssv: string;
  date: string;
  printer: string;
  document: string;
}

const PrintHistory: React.FC = () => {
  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Báo cáo trang in", link: "/trangin" },
  ];

  // Dữ liệu giả để hiển thị bảng lịch sử in, với kiểu PrintHistoryItem
  const printHistoryData: PrintHistoryItem[] = [
    { id: 1, mssv: "1234", date: "2024-12-01", printer: "Printer1", document: "Document1.pdf" },
    { id: 2, mssv: "5678", date: "2024-12-02", printer: "Printer2", document: "Document2.pdf" },
    { id: 3, mssv: "9101", date: "2024-12-03", printer: "Printer3", document: "Document3.pdf" },
  ];

  return (
    <div className="container">
      <Sidebar menuItems={menuItems} />
      <Header title="Lịch sử in ấn" />

      <div className="content">
        <h2>Lịch sử in ấn</h2>

        {/* Bảng Lịch sử in */}
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">MSSV</th>
              <th className="table-header">Ngày</th>
              <th className="table-header">Máy in</th>
              <th className="table-header">Tài liệu</th>
            </tr>
          </thead>
          <tbody>
            {printHistoryData.map((item) => (
              <tr key={item.id}>
                <td className="table-cell">{item.mssv}</td>
                <td className="table-cell">{item.date}</td>
                <td className="table-cell">{item.printer}</td>
                <td className="table-cell">{item.document}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintHistory;
