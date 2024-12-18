import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTransactionData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const studentId = localStorage.getItem("id");

      if (!studentId || !accessToken) {
        console.warn("Missing student ID or access token.");
        setHistoryData([]);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/transaction/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const formattedData: Transaction[] = response.data.map(
        (transaction: any) => ({
          id: transaction._id,
          time: new Date(transaction.createdAt).toLocaleString("vi-VN"),
          number: transaction.pageAmount,
          total: transaction.amount,
          paymentMethod: transaction.paymentMethod,
          status: transaction.status,
          payOSId: transaction.payOSId,
        })
      );

      setHistoryData(formattedData);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const verifyLogin = () => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }

  useEffect(() => {
    verifyLogin();
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
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : historyData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Không có giao dịch nào
                  </td>
                </tr>
              ) : (
                historyData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.id}</td>
                    <td>{record.time}</td>
                    <td>{record.number}</td>
                    <td>{record.total.toLocaleString("vi-VN")}</td>
                    <td>{record.paymentMethod}</td>
                    <td>{record.status}</td>
                    <td>{record.payOSId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
