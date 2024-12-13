import React, { useEffect, useState } from 'react';
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
  const [historyData, setHistoryData] = useState<PrintJob[]>([]);
  const [totalPages, setTotalPages] = useState<TotalPages>({ A4: 0, A3: 0 });

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMjExNjE0Iiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MzQwNTM0MTUsImV4cCI6MTczNDEzOTgxNX0.cEBN9wkxyjUXvVAbK22p1vBVZHoZ89FTfjSMujJTq8E";

        const response = await axios.get(
          "http://localhost:5000/api/printingLogs/date/2212922?startDate=2024-01-01&endDate=2024-12-31",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { printJobs, totalPages } = response.data;

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
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Xem lịch sử in" />
      <div className="HistoryPage-content">
        {/* <div className="HistoryPage-summary">
          <h3>Tổng số trang đã in</h3>
          <p>A4: {totalPages.A4 || 0} trang</p>
          <p>A3: {totalPages.A3 || 0} trang</p>
        </div> */}
        <div className="HistoryPage-table-container">
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
              {historyData.map((record, index) => (
                <tr key={index}>
                  <td>{record.printerId}</td>
                  <td>{record.printTime}</td>
                  <td>{record.documentName}</td>
                  <td>{record.paperSize}</td>
                  <td>{record.pages}</td>
                  <td>{record.copies}</td>
                  <td>{record.isDoubleSided}</td>
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
