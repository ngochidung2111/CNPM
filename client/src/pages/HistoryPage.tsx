import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/HistoryPage.css";
import { menuItems } from '../data/menuItems.tsx';

interface PrintJob {
  printerId: string;
  printTime: string;
  documentName: string;
  paperSize: string;
  pages: number;
  copies: number;
  isDoubleSided: string;
}

interface TotalPages {
  A4: number;
  A3: number;
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState<PrintJob[]>([]);
  const [totalPages, setTotalPages] = useState<TotalPages>({ A4: 0, A3: 0 });
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2024-12-31");

  const fetchHistoryData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const studentId = localStorage.getItem('id');
    const response = await axios.get(
      `http://localhost:5000/api/printingLogs/date/${studentId}?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { printJobs, totalPages } = response.data;

    if (printJobs && printJobs.length > 0) {
      const formattedData: PrintJob[] = printJobs.map((job: any) => ({
        printerId: job.printerId,
        printTime: new Date(job.startTime).toLocaleString("vi-VN"),
        documentName: job.fileName,
        paperSize: job.properties.paperSize,
        pages: job.properties.pages,
        copies: job.properties.copies,
        isDoubleSided: job.properties.isDoubleSided ? "Có" : "Không",
      }));

      setHistoryData(formattedData);
      setTotalPages(totalPages);
    } else {
      setHistoryData([]); // Không có dữ liệu lịch sử
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn("No history data found for this student.");
      setHistoryData([]);
    } else {
      console.error("Error fetching history data:", error);
    }
  }
};

const verifyLogin = () => {
  if (!localStorage.getItem('accessToken')) {
    navigate('/');
  }
}

  useEffect(() => {
    verifyLogin();
    fetchHistoryData();
  }, [startDate, endDate]); // Gọi lại khi `startDate` hoặc `endDate` thay đổi

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Xem lịch sử in" />
      <div className="HistoryPage-content">
        <div className="HistoryPage-table-container">
          {/* Bộ lọc ngày tháng */}
          <div className="filter-container">
            <label htmlFor="startDate">Từ ngày:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">Đến ngày:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={fetchHistoryData}>Lọc</button>
          </div>

          {/* Bảng lịch sử in */}
          <table>
            <thead>
              <tr>
                <th>Mã máy in</th>
                <th>Thời gian in</th>
                <th>Tên tài liệu</th>
                <th>Kích thước giấy</th>
                <th>Số lượng trang</th>
                <th>Số bản in</th>
                <th>In hai mặt</th>
              </tr>
            </thead>
            <tbody>
              {historyData.length > 0 ? (
                historyData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.printerId}</td>
                    <td>{record.printTime}</td>
                    <td>{record.documentName}</td>
                    <td>{record.paperSize}</td>
                    <td>{record.pages}</td>
                    <td>{record.copies}</td>
                    <td>{record.isDoubleSided}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>Không có lịch sử in trong khoảng thời gian này</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
