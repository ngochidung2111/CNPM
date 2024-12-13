import React, { useState, useEffect } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/Config.css';

interface ConfigProps {
  _id: string;
  defaultPages: number;
  permittedFileTypes: string[];
  pageGrantDates: string[];
  pricePerPage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Config: React.FC<ConfigProps> = ({
  _id,
  defaultPages,
  permittedFileTypes = [],
  pageGrantDates = [],
  pricePerPage,
  createdAt,
  updatedAt,
  __v
}) => {
  const [info, setInfo] = useState({
    _id,
    defaultPages,
    permittedFileTypes,
    pageGrantDates,
    pricePerPage,
    createdAt,
    updatedAt,
    __v
  });

  useEffect(() => {
    // Kiểm tra sự thay đổi của props trước khi cập nhật trạng thái
    setInfo(prevInfo => {
      if (
        prevInfo._id !== _id ||
        prevInfo.defaultPages !== defaultPages ||
        prevInfo.permittedFileTypes.join(',') !== permittedFileTypes.join(',') ||
        prevInfo.pageGrantDates.join(',') !== pageGrantDates.join(',') ||
        prevInfo.pricePerPage !== pricePerPage ||
        prevInfo.createdAt !== createdAt ||
        prevInfo.updatedAt !== updatedAt ||
        prevInfo.__v !== __v
      ) {
        return {
          _id,
          defaultPages,
          permittedFileTypes,
          pageGrantDates,
          pricePerPage,
          createdAt,
          updatedAt,
          __v
        };
      }
      return prevInfo; // Trả lại trạng thái hiện tại nếu không có sự thay đổi
    });
  }, [_id, defaultPages, permittedFileTypes, pageGrantDates, pricePerPage, createdAt, updatedAt, __v]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ ...info });

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Báo cáo trang in", link: "/trangin" },
  ];

  const openModal = () => {
    setModalInfo({ ...info });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeInfo = () => {
    setInfo(modalInfo);
    setIsModalOpen(false);
  };

  const handleAddGrantDate = (date: string) => {
    if (date) {
      setModalInfo({
        ...modalInfo,
        pageGrantDates: [...modalInfo.pageGrantDates, date],
      });
    }
  };

  const handleRemoveGrantDate = (date: string) => {
    setModalInfo({
      ...modalInfo,
      pageGrantDates: modalInfo.pageGrantDates.filter(d => d !== date),
    });
  };

  return (
    <div>
      <Sidebar menuItems={menuItems} />
      <Header title="Mua thêm trang in" />
      <div className="config-system-info-container">
        <h2>Thông tin hệ thống</h2>
        <table className="config-system-info-table">
          <tbody>
            <tr>
              <td className="config-info-label">Số lượng trang được cấp</td>
              <td className="config-info-value">{info.defaultPages || 100} (A4)</td>
            </tr>
            <tr>
              <td className="config-info-label">Loại tệp được chấp nhận</td>
              <td className="config-info-value">{info.permittedFileTypes.join(', ') || 'pdf, doc, docx'}</td>
            </tr>
            <tr>
              <td className="config-info-label">Ngày cấp trang</td>
              <td className="config-info-value">{info.pageGrantDates.join(', ') || '2024-01-01, 2024-02-01'}</td>
            </tr>
            <tr>
              <td className="config-info-label">Giá mỗi trang</td>
              <td className="config-info-value">{info.pricePerPage || 500} VND</td>
            </tr>
          </tbody>
        </table>
        <button className="config-change-btn" onClick={openModal}>
          Thay đổi thông tin
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="config-modal-overlay">
          <div className="config-modal-content">
            <h3>Thay đổi thông tin hệ thống</h3>
            <form>
  <label>
    <span>Số lượng trang được cấp:</span>
    <input
      type="number"
      value={modalInfo.defaultPages}
      onChange={(e) =>
        setModalInfo({
          ...modalInfo,
          defaultPages: +e.target.value,
        })
      }
    />
  </label>
  <label>
    <span>Loại tệp được chấp nhận:</span>
    <input
      type="text"
      value={modalInfo.permittedFileTypes.join(', ')}
      onChange={(e) =>
        setModalInfo({
          ...modalInfo,
          permittedFileTypes: e.target.value.split(',').map(type => type.trim()),
        })
      }
    />
  </label>
  <label>
    <span>Ngày cấp trang:</span>
    <input
      type="text"
      value={modalInfo.pageGrantDates.join(', ')}
      onChange={(e) =>
        setModalInfo({
          ...modalInfo,
          pageGrantDates: e.target.value.split(',').map(date => date.trim()),
        })
      }
    />
  </label>
  <label>
    <span>Thêm ngày cấp trang:</span>
    <input
      type="text"
      value=""
      onChange={(e) => {
        const newDate = e.target.value.trim();
        if (newDate) {
          setModalInfo({
            ...modalInfo,
            pageGrantDates: [...modalInfo.pageGrantDates, newDate],
          });
        }
      }}
    />
  </label>
  <label>
    <span>Giá mỗi trang:</span>
    <input
      type="number"
      value={modalInfo.pricePerPage}
      onChange={(e) =>
        setModalInfo({
          ...modalInfo,
          pricePerPage: +e.target.value,
        })
      }
    />
  </label>
  <div className="config-modal-actions">
    <button type="button" onClick={changeInfo}>
      Lưu thay đổi
    </button>
    <button type="button" onClick={closeModal}>
      Hủy
    </button>
  </div>
</form>
            <div>
              <h4>Ngày cấp trang đã thêm</h4>
              <ul>
                {modalInfo.pageGrantDates.map((date) => (
                  <li key={date}>
                    {date} <button onClick={() => handleRemoveGrantDate(date)}>Xóa</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Config;
