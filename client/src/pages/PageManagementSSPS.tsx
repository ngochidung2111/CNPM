import React, { useState, useEffect } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/PageManagementSSPS.css';
import { useNavigate } from 'react-router-dom';
type PrintPage = {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  pageAmount: number;
  paymentMethod: string;
  status: string;
  payOSId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const PrintPageManagement: React.FC = () => {
  const [printPages, setPrintPages] = useState<PrintPage[]>([]);
  const navigate = useNavigate();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null);

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Lịch sử giao dịch", link: "/trangin" },
  ];

  const fetchPrintPages = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:5000/api/transaction', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPrintPages(data);
    } catch (error) {
      console.error('Error fetching print pages:', error);
      navigate('/error');
    }
  };

  const verifyLogin = () => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }

  useEffect(() => {

    verifyLogin();
    fetchPrintPages();
  }, []);

  const handleDeletePage = (index: number) => {
    setSelectedPageIndex(index);
    setIsConfirmationVisible(true); // Show confirmation modal
  };

  const confirmDeletePage = () => {
    if (selectedPageIndex !== null) {
      const updatedPages = [...printPages];
      updatedPages.splice(selectedPageIndex, 1);

      // Update state
      setPrintPages(updatedPages);
    }

    // Hide modal after deletion
    setIsConfirmationVisible(false);
  };

  const cancelDeletePage = () => {
    // Close modal without deleting
    setIsConfirmationVisible(false);
  };

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title='Quản lý mua trang in' />
      <div className="printpage-table-container">
        <table className="printpage-table">
          <thead>
            <tr>
              <th className="printpage-th">MSSV</th>
              <th className="printpage-th">Tên</th>
              <th className="printpage-th">Email</th>
              <th className="printpage-th">Số tiền</th>
              <th className="printpage-th">Số trang</th>
              <th className="printpage-th">Phương thức thanh toán</th>
              <th className="printpage-th">Trạng thái</th>
              <th className="printpage-th">Mã thanh toán</th>
              <th className="printpage-th">Ngày tạo</th>
              <th className="printpage-th">Ngày cập nhật</th>
              <th className="printpage-th">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {printPages.map((page, index) => (
              <tr key={index}>
                <td className="printpage-td">{page.studentId._id}</td>
                <td className="printpage-td">{page.studentId.name}</td>
                <td className="printpage-td">{page.studentId.email}</td>
                <td className="printpage-td">{page.amount}</td>
                <td className="printpage-td">{page.pageAmount}</td>
                <td className="printpage-td">{page.paymentMethod}</td>
                <td className="printpage-td">{page.status}</td>
                <td className="printpage-td">{page.payOSId}</td>
                <td className="printpage-td">{new Date(page.createdAt).toLocaleString()}</td>
                <td className="printpage-td">{new Date(page.updatedAt).toLocaleString()}</td>
                <td className="printpage-td">
                  {/* Delete button */}
                  <button className="printpage-button" onClick={() => handleDeletePage(index)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation modal */}
      {isConfirmationVisible && (
        <div className="printpage-confirmation-modal">
          <div className="printpage-confirmation-modal-content">
            <h3>Chắc chắn xóa bản ghi?</h3>
            <p>Bạn có chắc chắn muốn xóa bản ghi này?</p>
            <div className="printpage-modal-actions">
              <button onClick={confirmDeletePage}>Đồng ý</button>
              <button onClick={cancelDeletePage}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintPageManagement;