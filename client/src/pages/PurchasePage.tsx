import React from "react";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PrintPage.css"; // Giữ nguyên tên file CSS nếu không thay đổi
import { menuItems } from '../data/menuItems.tsx';

const PurchasePage: React.FC = () => {

  const getStudentData = () => {
    return {
      name: "Nguyễn Văn A",
      mssv: "2211614",
      date: "01/01/2004",
    };
  };

  const studentData = getStudentData();

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
                <td>Ngày</td>
                <td>{studentData.date}</td>
              </tr>
              <tr>
                <td>Số trang A4</td>
                <td>
                  <input
                    type="text"
                    placeholder="Nhập số lượng trang"
                    className="PurchasePage-input"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="PurchasePage-button-container">
                  <button className="PurchasePage-pay-button">Thanh toán</button>
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