import React, { useState } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/PageManagementSSPS.css'; // Import CSS for styling

type PrintPage = {
  _id: string;
  mssv: string;
  name: string;
  date: string;
  pages: number;
};

const PrintPageManagement: React.FC = () => {
  const [printPages, setPrintPages] = useState<PrintPage[]>([
    {
      _id: "1",
      mssv: "12345678",
      name: "Nguyen Van A",
      date: "2024-12-05T08:07:12.886Z",
      pages: 50,
    },
    // Add other print page records here
  ]);

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const pagesPerPage = 5; // Number of records per page

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null);

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Báo cáo trang in", link: "/trangin" },
  ];

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

  // Calculate records to display on the current page
  const indexOfLastPage = currentPage * pagesPerPage;
  const indexOfFirstPage = indexOfLastPage - pagesPerPage;
  const currentPages = printPages.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(printPages.length / pagesPerPage); // Total pages

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
              <th className="printpage-th">Ngày</th>
              <th className="printpage-th">Số trang</th>
              <th className="printpage-th">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPages.map((page, index) => (
              <tr key={index}>
                <td className="printpage-td">{page.mssv}</td>
                <td className="printpage-td">{page.name}</td>
                <td className="printpage-td">{new Date(page.date).toLocaleString()}</td>
                <td className="printpage-td">{page.pages}</td>
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

        {/* Pagination */}
        <div className="printpage-pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "printpage-active" : ""}
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