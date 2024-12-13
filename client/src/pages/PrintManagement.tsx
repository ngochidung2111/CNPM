import React, { useState, useEffect } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/PrintManagement.css'; // Import file CSS để styling
import { useNavigate } from 'react-router-dom';

type Printer = {
  _id: string;
  printerId: string;
  brand: string;
  model: string;
  description: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  location: {
    campus: string;
    building: string;
    room: string;
  };
};

const PrintManagement: React.FC = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const printersPerPage = 5; // Số lượng máy in mỗi trang
  const navigate = useNavigate();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isAddPrinterModalVisible, setIsAddPrinterModalVisible] = useState(false); // State cho modal thêm máy in
  const [isEditPrinterModalVisible, setIsEditPrinterModalVisible] = useState(false); // State cho modal sửa máy in
  const [newPrinter, setNewPrinter] = useState<Printer>({
    _id: '',
    printerId: '',
    brand: '',
    model: '',
    description: '',
    isEnabled: true,
    createdAt: '',
    updatedAt: '',
    __v: 0,
    location: {
      campus: '',
      building: '',
      room: ''
    }
  });

  const [selectedPrinterIndex, setSelectedPrinterIndex] = useState<number | null>(null);
  const [selectedPrinterForEdit, setSelectedPrinterForEdit] = useState<Printer | null>(null);

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Báo cáo trang in", link: "/trangin" },
  ];

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/printers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await response.json();
        setPrinters(data);
      } catch (error) {
        console.error('Error fetching printers:', error);
        navigate('/error');
      }
    };

    fetchPrinters();
  }, []);

  const handleStatusChange = (index: number) => {
    setSelectedPrinterIndex(index);
    setIsConfirmationVisible(true); // Hiển thị modal xác nhận
  };

  const confirmStatusChange = () => {
    if (selectedPrinterIndex !== null) {
      const updatedPrinters = [...printers];
      const currentStatus = updatedPrinters[selectedPrinterIndex].isEnabled;

      // Chuyển trạng thái từ "Có thể sử dụng" sang "Bảo trì" và ngược lại
      updatedPrinters[selectedPrinterIndex].isEnabled = !currentStatus;

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

  // Hàm mở modal sửa máy in
  const openEditPrinterModal = (index: number) => {
    setSelectedPrinterForEdit(printers[index]);
    setIsEditPrinterModalVisible(true);
  };

  // Hàm đóng modal sửa máy in
  const closeEditPrinterModal = () => {
    setIsEditPrinterModalVisible(false);
  };

  // Hàm thêm máy in mới
  const handleAddPrinter = async () => {
    const requestBody = {
      printerId: newPrinter.printerId,
      brand: newPrinter.brand,
      model: newPrinter.model,
      description: newPrinter.description,
      location: newPrinter.location,
    };
  
    console.log('Request Body:', requestBody);
  
    try {
      const response = await fetch('http://localhost:5000/api/printers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const addedPrinter = await response.json();
        setPrinters([...printers, addedPrinter]);
        setNewPrinter({
          _id: '',
          printerId: '',
          brand: '',
          model: '',
          description: '',
          isEnabled: true,
          createdAt: '',
          updatedAt: '',
          __v: 0,
          location: {
            campus: '',
            building: '',
            room: ''
          }
        }); // Reset form
        closeAddPrinterModal();
      } else {
        console.error('Failed to add printer:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding printer:', error);
    }
  };

  // Hàm thay đổi giá trị trường input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    if (field.startsWith('location.')) {
      const locationField = field.split('.')[1];
      setNewPrinter({
        ...newPrinter,
        location: {
          ...newPrinter.location,
          [locationField]: e.target.value
        }
      });
    } else {
      setNewPrinter({ ...newPrinter, [field]: e.target.value });
    }
  };

  // Hàm thay đổi giá trị trường input cho sửa máy in
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    if (selectedPrinterForEdit) {
      if (field.startsWith('location.')) {
        const locationField = field.split('.')[1];
        setSelectedPrinterForEdit({
          ...selectedPrinterForEdit,
          location: {
            ...selectedPrinterForEdit.location,
            [locationField]: e.target.value
          }
        });
      } else {
        setSelectedPrinterForEdit({ ...selectedPrinterForEdit, [field]: e.target.value });
      }
    }
  };

  // Hàm xử lý sửa máy in
  const handleEditPrinter = async () => {
    if (selectedPrinterForEdit) {
      try {
        const response = await fetch(`http://localhost:5000/api/printers/${selectedPrinterForEdit._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand: selectedPrinterForEdit.brand,
            location: selectedPrinterForEdit.location,
          }),
        });

        if (response.ok) {
          const updatedPrinters = printers.map((printer) =>
            printer._id === selectedPrinterForEdit._id ? selectedPrinterForEdit : printer
          );
          setPrinters(updatedPrinters);
          closeEditPrinterModal();
        } else {
          console.error('Failed to update printer');
        }
      } catch (error) {
        console.error('Error updating printer:', error);
      }
    }
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
      <Header title='Lịch sử mua trang in' />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã máy in</th>
              <th>Thương hiệu</th>
              <th>Model</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Nơi đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPrinters.map((printer, index) => (
              <tr key={index}>
                <td>{printer.printerId}</td>
                <td>{printer.brand}</td>
                <td>{printer.model}</td>
                <td>{printer.description}</td>
                <td>{printer.isEnabled ? "Có thể sử dụng" : "Bảo trì"}</td>
                <td>{`${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`}</td>
                <td>
                  {/* Nút thay đổi trạng thái */}
                  <button onClick={() => handleStatusChange(index)}>
                    Thay đổi trạng thái
                  </button>
                  {/* Nút sửa máy in */}
                  <button onClick={() => openEditPrinterModal(index)}>
                    Sửa
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
              value={newPrinter.printerId}
              onChange={(e) => handleInputChange(e, 'printerId')}
            />
            <label>Thương hiệu:</label>
            <input
              type="text"
              value={newPrinter.brand}
              onChange={(e) => handleInputChange(e, 'brand')}
            />
            <label>Model:</label>
            <input
              type="text"
              value={newPrinter.model}
              onChange={(e) => handleInputChange(e, 'model')}
            />
            <label>Mô tả:</label>
            <input
              type="text"
              value={newPrinter.description}
              onChange={(e) => handleInputChange(e, 'description')}
            />
            <label>Nơi đặt:</label>
            <input
              type="text"
              value={newPrinter.location.campus}
              onChange={(e) => handleInputChange(e, 'location.campus')}
            />
            <input
              type="text"
              value={newPrinter.location.building}
              onChange={(e) => handleInputChange(e, 'location.building')}
            />
            <input
              type="text"
              value={newPrinter.location.room}
              onChange={(e) => handleInputChange(e, 'location.room')}
            />
            <label>Trạng thái:</label>
            <select
              value={newPrinter.isEnabled ? "Có thể sử dụng" : "Bảo trì"}
              onChange={(e) => handleInputChange(e, 'isEnabled')}
            >
              <option value="true">Có thể sử dụng</option>
              <option value="false">Bảo trì</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddPrinter}>Thêm máy in</button>
              <button onClick={closeAddPrinterModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal sửa máy in */}
      {isEditPrinterModalVisible && selectedPrinterForEdit && (
        <div className="edit-printer-modal">
          <div className="edit-printer-modal-content">
            <h3>Sửa máy in</h3>
            <label>Thương hiệu:</label>
            <input
              type="text"
              value={selectedPrinterForEdit.brand}
              onChange={(e) => handleEditInputChange(e, 'brand')}
            />
            <label>Nơi đặt:</label>
            <input
              type="text"
              value={selectedPrinterForEdit.location.campus}
              onChange={(e) => handleEditInputChange(e, 'location.campus')}
            />
            <input
              type="text"
              value={selectedPrinterForEdit.location.building}
              onChange={(e) => handleEditInputChange(e, 'location.building')}
            />
            <input
              type="text"
              value={selectedPrinterForEdit.location.room}
              onChange={(e) => handleEditInputChange(e, 'location.room')}
            />
            <div className="modal-actions">
              <button onClick={handleEditPrinter}>Lưu</button>
              <button onClick={closeEditPrinterModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintManagement;