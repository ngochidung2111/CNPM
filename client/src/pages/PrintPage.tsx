import React, { useState } from "react";
import axios from 'axios';
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PurchasePage.css";
import { menuItems } from '../data/menuItems.tsx';

const PrintPage: React.FC = () => {
  const [formData, setFormData] = useState({
    studentId: "2212922", //
    printerId: "",
    fileName: "",
    paperSize: "",
    pages: 0,
    copies: 0,
    isDoubleSided: false,
    paperUsage: {},
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "pages" || id === "copies" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isDoubleSided: event.target.checked }));
  };

  const handleSubmit = async () => {
    const { paperSize, pages, copies } = formData;
    const paperUsage = { A4: 0, A3: 0 };

    if (paperSize && pages && copies) {
      paperUsage[paperSize] = pages * copies;
    }

    const baseURL = 'http://localhost:5000/api';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMjExNjE0Iiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MzQwNTM0MTUsImV4cCI6MTczNDEzOTgxNX0.cEBN9wkxyjUXvVAbK22p1vBVZHoZ89FTfjSMujJTq8E';

    try {
      const response = await axios.post(`${baseURL}/printingLogs`, { ...formData, paperUsage }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating printing log:", error);
      alert(error.response?.data?.error || "Đã xảy ra lỗi khi in tài liệu");
    }
  };

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="In tài liệu" />
      <div className="PrintPage-main-content">
        <div className="PrintPage-form-container">
          <div className="PrintPage-upload-container">
            <label className="PrintPage-upload-label">Tải tài liệu</label>
            <div className="PrintPage-icon-container">
              <label htmlFor="upload" className="PrintPage-icon-label">
                <i className="fas fa-upload"></i>
              </label>
            </div>
            <input id="upload" type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
          </div>
          <div>
            <label htmlFor="printer">Máy in</label>
            <select id="printerId" value={formData.printerId} onChange={handleInputChange}>
              <option value="">Chọn máy in</option>
              <option value="2334567">Máy in 1</option>
              <option value="2334568">Máy in 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="paperSize">Kích thước trang</label>
            <select id="paperSize" value={formData.paperSize} onChange={handleInputChange}>
              <option value="">Chọn kích thước trang</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div>
            <label htmlFor="pages">Số lượng trang</label>
            <input id="pages" type="number" placeholder="Số lượng trang" value={formData.pages} onChange={handleInputChange} />
          </div>
          <div className="checkbox-container">
            <label htmlFor="isDoubleSided">In hai mặt</label>
            <input id="isDoubleSided" type="checkbox" checked={formData.isDoubleSided} onChange={handleCheckboxChange} />

          </div>
          <div>
            <label htmlFor="copies">Số bản in</label>
            <input id="copies" type="number" placeholder="Số bản in" value={formData.copies} onChange={handleInputChange} />
          </div>
          <button onClick={handleSubmit}>IN TÀI LIỆU</button>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
