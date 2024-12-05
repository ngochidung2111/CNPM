import React from "react";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PurchasePage.css";
import { menuItems } from '../data/menuItems.tsx';

const PrintPage: React.FC = () => {


  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="In tài liệu" />
      <div className="main-content">
        <div className="form-container">
          <div className="upload-container">
                    <label className="upload-label">In tài liệu</label>
                    <div className="icon-container">
                        <label htmlFor="upload" className="icon-label">
                            <i className="fas fa-upload"></i>
                        </label>
                    </div>
                    <input id="upload" type="file" style={{ display: 'none' }} />
                </div>
          <div>
            <label htmlFor="printer">Máy in</label>
            <select id="printer">
              <option>Chọn máy in</option>
            </select>
          </div>
          <div>
            <label htmlFor="page-size">Kích thước trang</label>
            <select id="page-size">
              <option>Chọn kích thước trang</option>
            </select>
          </div>
          <div>
            <label htmlFor="page-quantity">Số lượng trang</label>
            <input id="page-quantity" type="text" placeholder="Số lượng trang" />
          </div>
          <div>
            <label htmlFor="print-sides">Số mặt in</label>
            <input id="print-sides" type="text" placeholder="Số mặt in" />
          </div>
          <div>
            <label htmlFor="copies">Số bản in</label>
            <input id="copies" type="text" placeholder="Số bản in" />
          </div>
          <div>
            <label htmlFor="print-order">Đặt in</label>
            <div className="date-time">
              <input type="date" />
              <input type="time" />
            </div>
          </div>
          <button>IN TÀI LIỆU</button>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
