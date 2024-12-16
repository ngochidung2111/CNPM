import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebars/Sidebar.tsx";
import "../css/PurchasePage.css";
import { menuItems } from "../data/menuItems.tsx";

const PrintPage: React.FC = () => {
  const [formData, setFormData] = useState({
    studentId: localStorage.getItem("id"),
    printerId: "",
    fileName: "",
    paperSize: "",
    pages: 0,
    copies: 0,
    isDoubleSided: false,
    paperUsage: {},
  });

  const [printers, setPrinters] = useState([]);
  const [showPrinterModal, setShowPrinterModal] = useState(false);

  useEffect(() => {
    const fetchPrinters = async () => {
      const baseURL = "http://localhost:5000/api";
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(`${baseURL}/printers`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const Printers = response.data;
        setPrinters(Printers);
      } catch (error) {
        console.error("Error fetching printers:", error);
        alert(error.response?.data?.error || "Không thể lấy danh sách máy in");
      }
    };

    fetchPrinters();
  }, []);

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

  const handleSubmit = async () => {
    const { paperSize, pages, copies } = formData;
    const paperUsage = { A4: 0, A3: 0 };

    if (paperSize && pages && copies) {
      paperUsage[paperSize] = pages * copies;
    }

    const baseURL = "http://localhost:5000/api";
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${baseURL}/printingLogs`,
        { ...formData, paperUsage },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating printing log:", error);
      alert(error.response?.data?.error || "Đã xảy ra lỗi khi in tài liệu");
    }
  };

  const handlePrinterSelect = (printerId: string) => {
    setFormData((prev) => ({ ...prev, printerId }));
    setShowPrinterModal(false);
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
            <input id="upload" type="file" style={{ display: "none" }} onChange={handleFileUpload} />
          </div>
          <div>
            <label>Máy in</label>
            <button className="printer-select-button" onClick={() => setShowPrinterModal(true)}>
              {formData.printerId ? `Máy in: ${formData.printerId}` : "Chọn máy in"}
            </button>
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
          <div className="radio-container">
            <label>Chế độ in</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="printMode"
                  value="false"
                  checked={!formData.isDoubleSided}
                  onChange={() => setFormData((prev) => ({ ...prev, isDoubleSided: false }))}
                />
                In 1 mặt
              </label>
              <label>
                <input
                  type="radio"
                  name="printMode"
                  value="true"
                  checked={formData.isDoubleSided}
                  onChange={() => setFormData((prev) => ({ ...prev, isDoubleSided: true }))}
                />
                In 2 mặt
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="copies">Số bản in</label>
            <input id="copies" type="number" placeholder="Số bản in" value={formData.copies} onChange={handleInputChange} />
          </div>
          <button className="print-button" onClick={handleSubmit}>IN TÀI LIỆU</button>
        </div>
      </div>

      {showPrinterModal && (
  <div className="printer-modal">
    <div className="printer-modal-content">
      <h3>Chọn máy in</h3>
      <ul className="printer-list">
        {printers.map((printer: any) => (
          <li
            key={printer._id}
            className={printer.isEnabled ? "enabled" : "disabled"}
            onClick={() => {
              if (printer.isEnabled) handlePrinterSelect(printer.printerId);
            }}
          >
            <div className="printer-info">
              <div className="printer-details">
                <strong>Máy in:</strong> {printer.brand} - {printer.model} <br />
                <strong>Vị trí:</strong> {printer.location.campus}, {printer.location.building}, {printer.location.room} <br />
                <strong>Mô tả:</strong> {printer.description} <br />
                <strong>Trạng thái:</strong>{" "}
                <span className={printer.isEnabled ? "status-true" : "status-false"}>
                  {printer.isEnabled ? "Hoạt động" : "Không hoạt động"}
                </span>
              </div>
              <div className="printer-image">
                <img
                  src="https://gtchanoi.com/data/media/1413/images/may-in-canon-2900.jpg"
                  alt="Máy in"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="close-modal" onClick={() => setShowPrinterModal(false)}>
        Đóng
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default PrintPage;
