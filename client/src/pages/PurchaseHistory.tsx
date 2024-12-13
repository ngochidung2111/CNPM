import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PurchaseHistory.css";
import { menuItems } from "../data/menuItems.tsx";

interface Transaction {
  id: string;
  time: string;
  number: number;
  total: number;
  paymentMethod: string;
  status: string;
  payOSId: string;
}

const PurchaseHistory = () => {
  const [historyData, setHistoryData] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMjExNjE0Iiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MzQwNTM0MTUsImV4cCI6MTczNDEzOTgxNX0.cEBN9wkxyjUXvVAbK22p1vBVZHoZ89FTfjSMujJTq8E";

        const response = await axios.get(
          "http://localhost:5000/api/transaction/student/2212922",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const formattedData: Transaction[] = response.data.map((transaction: any) => ({
          id: transaction._id,
          time: new Date(transaction.createdAt).toLocaleString("vi-VN"),
          number: transaction.pageAmount,
          total: transaction.amount,
          paymentMethod: transaction.paymentMethod,
          status: transaction.status,
          payOSId: transaction.payOSId,
        }));

        setHistoryData(formattedData);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Lịch sử mua" />
      <div className="PurchaseHistory-content">
        <div className="PurchaseHistory-table-container">
          <table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Thời gian mua</th>
                <th>Số trang</th>
                <th>Tổng tiền (VNĐ)</th>
                <th>Phương thức thanh toán</th>
                <th>Trạng thái</th>
                <th>Mã giao dịch</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record, index) => (
                <tr key={index}>
                  <td>{record.id}</td>
                  <td>{record.time}</td>
                  <td>{record.number}</td>
                  <td>{record.total.toLocaleString("vi-VN")}</td>
                  <td>{record.paymentMethod}</td>
                  <td>{record.status}</td>
                  <td>{record.payOSId}</td>
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
