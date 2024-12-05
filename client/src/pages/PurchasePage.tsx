import React from "react";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PrintPage.css";
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
      <div className="content">
        <div className="box">
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
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="button-container">
                  <button className="pay-button">Thanh toán</button>
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
