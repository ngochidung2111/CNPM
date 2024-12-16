import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PrintPage.css";
import { menuItems } from "../data/menuItems.tsx";

const PurchasePage: React.FC = () => {
  const [pageAmount, setPageAmount] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [paymentChecking, setPaymentChecking] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const pricePerPage = 400;

  const getStudentData = () => {
    return {
      name: localStorage.getItem("name"),
      mssv: localStorage.getItem("id"),
    };
  };

  const studentData = getStudentData();
  const payOSCode = Number(String(Date.now()).slice(-6)); // Tạo mã ngẫu nhiên 6 số

  const handlePayment = async () => {
    if (!pageAmount || pageAmount <= 0) {
      setError("Vui lòng nhập số lượng trang hợp lệ.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:5000/api/payOS/createPayment",
        {
          price: totalPrice,
          payOSCode: payOSCode,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const paymentUrl = response.data.url;
      if (paymentUrl) {
        monitorPaymentStatus(payOSCode, totalPrice, pageAmount);
        window.open(paymentUrl, "_blank");
        resetForm();
      } else {
        setError("Không thể tạo giao dịch thanh toán.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      setError("Đã xảy ra lỗi khi tạo giao dịch thanh toán.");
    }
  };

  const monitorPaymentStatus = async (payOSCode: number, totalPrice: number, pageAmount: number) => {
    setPaymentChecking(true);
    const accessToken = localStorage.getItem("accessToken");

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/payOS/checkPaymentStatus/${payOSCode}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const paymentData = response.data?.paymentData;

        if (!paymentData) {
          console.error("No payment data found");
          clearInterval(interval);
          setPaymentChecking(false);
          setError("Không thể kiểm tra trạng thái thanh toán.");
          return;
        }

        if (paymentData.status === "PAID") {
          clearInterval(interval);
          setPaymentChecking(false);
          setMessage("Thanh toán thành công! Bạn đã mua thêm trang in.");
          await createTransaction( totalPrice, pageAmount);
        } else if (paymentData.status === "CANCELLED") {
          clearInterval(interval);
          setPaymentChecking(false);
          setError("Giao dịch đã bị hủy.");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 1000);
  };

  const createTransaction = async ( amount: number, pageAmount: number) => {
    try {
      const transactionId = `${Date.now().toString().slice(-6)}`;
      const studentId = studentData.mssv;
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:5000/api/transaction",
        {
          _id: transactionId,
          studentId: studentId,
          amount: amount,
          pageAmount: pageAmount,
          paymentMethod: "BKPay",
          payOSId: payOSCode,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Transaction created successfully.");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const resetForm = () => {
    setPageAmount(null);
    setTotalPrice(0);
    setError("");
    setMessage("");
  };

  useEffect(() => {
    if (pageAmount && pageAmount > 0) {
      setTotalPrice(pageAmount * pricePerPage);
    } else {
      setTotalPrice(0);
    }
  }, [pageAmount]);

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Mua thêm trang in" />
      <div className="PurchasePage-content">
        <div className="PurchasePage-box">
          <table>
            <tbody>
              <tr>
                <td>Tên sinh viên</td>
                <td>{studentData.name}</td>
              </tr>
              <tr>
                <td>MSSV</td>
                <td>{studentData.mssv}</td>
              </tr>
              <tr>
                <td>Số trang</td>
                <td>
                  <input
                    type="number"
                    placeholder="Nhập số lượng trang"
                    className="PurchasePage-input"
                    value={pageAmount || ""}
                    onChange={(e) => {
                      setPageAmount(Number(e.target.value));
                      setError("");
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Tổng tiền</td>
                <td>{totalPrice} VNĐ</td>
              </tr>
              {error && (
                <tr>
                  <td colSpan={2} style={{ color: "red", textAlign: "center" }}>
                    {error}
                  </td>
                </tr>
              )}

              {message && (
                <tr>
                  <td colSpan={2} style={{ color: "green", textAlign: "center" }}>
                    {message}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="PurchasePage-button-container">
                  <button
                    className="PurchasePage-pay-button"
                    onClick={handlePayment}
                  >
                    Thanh toán
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
