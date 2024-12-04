import React, { useState } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/PrintManagement.css'; // Import file CSS để styling

type Printer = {
  code: string;
  brand: string;
  location: string;
  status: string;
};

const PrintManagement: React.FC = () => {
  const [printers, setPrinters] = useState<Printer[]>([
    { code: "AAJ123", brand: "SAMSUNG", location: "H6-811", status: "Có thể sử dụng" },
    { code: "AAJ124", brand: "HP", location: "H6-812", status: "Bảo trì" },
    { code: "AAJ125", brand: "CANON", location: "H6-813", status: "Có thể sử dụng" },
    { code: "AAJ126", brand: "EPSON", location: "H6-814", status: "Có thể sử dụng" },
    { code: "AAJ127", brand: "BROTHER", location: "H6-815", status: "Bảo trì" },
    { code: "AAJ128", brand: "XEROX", location: "H6-816", status: "Có thể sử dụng" },
    { code: "AAJ129", brand: "OKI", location: "H6-817", status: "Có thể sử dụng" },
    { code: "AAJ130", brand: "KYOCERA", location: "H6-818", status: "Bảo trì" },
  ]);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const printersPerPage = 5; // Số lượng máy in mỗi trang

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isAddPrinterModalVisible, setIsAddPrinterModalVisible] = useState(false); // State cho modal thêm máy in
  const [newPrinter, setNewPrinter] = useState<Printer>({
    code: '',
    brand: '',
    location: '',
    status: 'Có thể sử dụng',
  });

  const [selectedPrinterIndex, setSelectedPrinterIndex] = useState<number | null>(null);

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Báo cáo trang in", link: "/trangin" },
  ];

  const handleStatusChange = (index: number) => {
    setSelectedPrinterIndex(index);
    setIsConfirmationVisible(true); // Hiển thị modal xác nhận
  };

  const confirmStatusChange = () => {
    if (selectedPrinterIndex !== null) {
      const updatedPrinters = [...printers];
      const currentStatus = updatedPrinters[selectedPrinterIndex].status;

      // Chuyển trạng thái từ "Có thể sử dụng" sang "Bảo trì" và ngược lại
      updatedPrinters[selectedPrinterIndex].status = currentStatus === "Có thể sử dụng" ? "Bảo trì" : "Có thể sử dụng";

      // Cập nhật lại state
      setPrinters(updatedPrinters);
    }

    // Ẩn modal sau khi thay đổi
    setIsConfirmationVisible(false);
  };

  const cancelStatusChange = () => {
    // Đóng modal mà không thay đổi gì
    setIsConfirmationVisible(false);
  };

  // Hàm mở modal thêm máy in
  const openAddPrinterModal = () => {
    setIsAddPrinterModalVisible(true);
  };

  // Hàm đóng modal thêm máy in
  const closeAddPrinterModal = () => {
    setIsAddPrinterModalVisible(false);
  };

  // Hàm thêm máy in mới
  const handleAddPrinter = () => {
    setPrinters([...printers, newPrinter]);
    setNewPrinter({ code: '', brand: '', location: '', status: 'Có thể sử dụng' }); // Reset form
    closeAddPrinterModal();
  };

  // Hàm thay đổi giá trị trường input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
      setNewPrinter({ ...newPrinter, [field]: e.target.value });
    };

  // Tính toán các máy in cần hiển thị trên trang hiện tại
  const indexOfLastPrinter = currentPage * printersPerPage;
  const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
  const currentPrinters = printers.slice(indexOfFirstPrinter, indexOfLastPrinter);

  // Hàm thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(printers.length / printersPerPage); // Tổng số trang

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title='Mua thêm trang in' />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã máy in</th>
              <th>Thương hiệu</th>
              <th>Nơi đặt</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPrinters.map((printer, index) => (
              <tr key={index}>
                <td>{printer.code}</td>
                <td>{printer.brand}</td>
                <td>{printer.location}</td>
                <td>{printer.status}</td>
                <td>
                  {/* Nút thay đổi trạng thái */}
                  <button onClick={() => handleStatusChange(index)}>
                    Thay đổi trạng thái
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Sau
          </button>
        </div>

        <button onClick={openAddPrinterModal}>Thêm máy in</button>
      </div>

      {/* Modal xác nhận */}
      {isConfirmationVisible && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Chắc chắn thay đổi trạng thái?</h3>
            <p>Trạng thái máy in sẽ được thay đổi giữa "Có thể sử dụng" và "Bảo trì".</p>
            <div className="modal-actions">
              <button onClick={confirmStatusChange}>Đồng ý</button>
              <button onClick={cancelStatusChange}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm máy in */}
      {isAddPrinterModalVisible && (
        <div className="add-printer-modal">
          <div className="add-printer-modal-content">
            <h3>Thêm máy in mới</h3>
            <label>Mã máy in:</label>
            <input
              type="text"
              value={newPrinter.code}
              onChange={(e) => handleInputChange(e, 'code')}
            />
            <label>Thương hiệu:</label>
            <input
              type="text"
              value={newPrinter.brand}
              onChange={(e) => handleInputChange(e, 'brand')}
            />
            <label>Nơi đặt:</label>
            <input
              type="text"
              value={newPrinter.location}
              onChange={(e) => handleInputChange(e, 'location')}
            />
            <label>Tình trạng:</label>
            <select
              value={newPrinter.status}
              onChange={(e) => handleInputChange(e, 'status')}
            >
              <option value="Có thể sử dụng">Có thể sử dụng</option>
              <option value="Bảo trì">Bảo trì</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddPrinter}>Thêm máy in</button>
              <button onClick={closeAddPrinterModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintManagement;
