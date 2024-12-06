import React, { useState, useEffect } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/PrintHistorySSPS.css'; // Import CSS for styling

type PrintHistory = {
  _id: string;
  printerId: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  fileName: string;
  startTime: string;
  status: string;
  paperUsage: {
    A4: number;
    A3: number;
  };
  properties: {
    paperSize: string;
    pages: number;
    copies: number;
    isDoubleSided: boolean;
  };
};

const PrintHistorySSPS: React.FC = () => {
  const [printHistory, setPrintHistory] = useState<PrintHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const historyPerPage = 2; // Number of records per page

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<number | null>(null);

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Báo cáo trang in", link: "/trangin" },
  ];

  useEffect(() => {
    const fetchPrintHistory = async () => {
      try {
        const response = await fetch('https://1931603c-7652-4e64-aa9e-0c26a3c45d8e.mock.pstmn.io/his');
        const data = await response.json();
        setPrintHistory(data);
      } catch (error) {
        console.error('Error fetching print history:', error);
      }
    };

    fetchPrintHistory();
  }, []);

 

  const confirmDeleteHistory = () => {
    if (selectedHistoryIndex !== null) {
      const updatedHistory = [...printHistory];
      updatedHistory.splice(selectedHistoryIndex, 1);

      // Update state
      setPrintHistory(updatedHistory);
    }

    // Hide modal after deletion
    setIsConfirmationVisible(false);
  };

  const cancelDeleteHistory = () => {
    // Close modal without deleting
    setIsConfirmationVisible(false);
  };

  // Calculate records to display on the current page
  const indexOfLastHistory = currentPage * historyPerPage;
  const indexOfFirstHistory = indexOfLastHistory - historyPerPage;
  const currentHistory = printHistory.slice(indexOfFirstHistory, indexOfLastHistory);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(printHistory.length / historyPerPage); // Total pages

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title='Lịch sử in ấn' />
      <div className="printhistoryssps-table-container">
        <table className="printhistoryssps-table">
          <thead>
            <tr>
              <th className="printhistoryssps-th">Mã máy in</th>
              <th className="printhistoryssps-th">Mã sinh viên</th>
              <th className="printhistoryssps-th">Tên sinh viên</th>
              <th className="printhistoryssps-th">Email</th>
              <th className="printhistoryssps-th">Tên tệp</th>
              <th className="printhistoryssps-th">Thời gian bắt đầu</th>
              <th className="printhistoryssps-th">Trạng thái</th>
              <th className="printhistoryssps-th">Số trang A4</th>
              <th className="printhistoryssps-th">Số trang A3</th>
              <th className="printhistoryssps-th">Kích thước giấy</th>
              <th className="printhistoryssps-th">Số trang</th>
              <th className="printhistoryssps-th">Số bản sao</th>
              <th className="printhistoryssps-th">In hai mặt</th>
              
            </tr>
          </thead>
          <tbody>
            {currentHistory.map((history, index) => (
              <tr key={index}>
                <td className="printhistoryssps-td">{history.printerId}</td>
                <td className="printhistoryssps-td">{history.studentId._id}</td>
                <td className="printhistoryssps-td">{history.studentId.name}</td>
                <td className="printhistoryssps-td">{history.studentId.email}</td>
                <td className="printhistoryssps-td">{history.fileName}</td>
                <td className="printhistoryssps-td">{new Date(history.startTime).toLocaleString()}</td>
                <td className="printhistoryssps-td">{history.status}</td>
                <td className="printhistoryssps-td">{history.paperUsage.A4}</td>
                <td className="printhistoryssps-td">{history.paperUsage.A3}</td>
                <td className="printhistoryssps-td">{history.properties.paperSize}</td>
                <td className="printhistoryssps-td">{history.properties.pages}</td>
                <td className="printhistoryssps-td">{history.properties.copies}</td>
                <td className="printhistoryssps-td">{history.properties.isDoubleSided ? "Có" : "Không"}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="printhistoryssps-pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "printhistoryssps-active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Sau
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {isConfirmationVisible && (
        <div className="printhistoryssps-confirmation-modal">
          <div className="printhistoryssps-confirmation-modal-content">
            <h3>Chắc chắn xóa lịch sử in?</h3>
            <p>Bạn có chắc chắn muốn xóa lịch sử in này?</p>
            <div className="printhistoryssps-modal-actions">
              <button onClick={confirmDeleteHistory}>Đồng ý</button>
              <button onClick={cancelDeleteHistory}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintHistorySSPS;