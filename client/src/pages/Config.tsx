import React, { useState, useEffect } from 'react';
import Header from '../components/header/header.tsx';
import { useNavigate } from 'react-router-dom';
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
  const [newDate, setNewDate] = useState('');
  const navigate = useNavigate();

  const fetchConfig = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/configuration',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setInfo(data);
      }
    } catch (error) {
      console.error('Fetch config error:', error);
    }
  }

  const verifyLogin = () => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }


  useEffect(() => {
    // Kiểm tra sự thay đổi của props trước khi cập nhật trạng thái
    // setInfo(prevInfo => {
    //   if (
    //     prevInfo._id !== _id ||
    //     prevInfo.defaultPages !== defaultPages ||
    //     prevInfo.permittedFileTypes.join(',') !== permittedFileTypes.join(',') ||
    //     prevInfo.pageGrantDates.join(',') !== pageGrantDates.join(',') ||
    //     prevInfo.pricePerPage !== pricePerPage ||
    //     prevInfo.createdAt !== createdAt ||
    //     prevInfo.updatedAt !== updatedAt ||
    //     prevInfo.__v !== __v
    //   ) {
    //     return {
    //       _id,
    //       defaultPages,
    //       permittedFileTypes,
    //       pageGrantDates,
    //       pricePerPage,
    //       createdAt,
    //       updatedAt,
    //       __v
    //     };
    //   }
    //   return prevInfo; // Trả lại trạng thái hiện tại nếu không có sự thay đổi
    // });

    verifyLogin();
    fetchConfig();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ ...info });

  const menuItems = [
    { title: "Quản lý máy in", link: "/printmanagement" },
    { title: "Quản lý cấu hình", link: "/config" },
    { title: "Lịch sử in ấn", link: "/printhistory" },
    { title: "Lịch sử giao dịch", link: "/trangin" },
  ];

  const openModal = () => {
    setModalInfo({ ...info });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeInfo = () => {

    // Gửi request cập nhật thông tin hệ thống
    fetch('http://localhost:5000/api/configuration', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(modalInfo),
    });


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
    setNewDate('');
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
              <td className="config-info-value">{info.defaultPages || 0} (A4)</td>
            </tr>
            <tr>
              <td className="config-info-label">Loại tệp được chấp nhận</td>
              <td className="config-info-value">{info.permittedFileTypes.join(', ') || ''}</td>
            </tr>
            <tr>
              <td className="config-info-label">Ngày cấp trang</td>
              <td className="config-info-value">{info.pageGrantDates.map((date)=>{return date.substring(0, 10)}).join(', ') || ''}</td>
            </tr>
            <tr>
              <td className="config-info-label">Giá mỗi trang</td>
              <td className="config-info-value">{info.pricePerPage || 0} VND</td>
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
      value={modalInfo.pageGrantDates.map((date)=>{return date.substring(0, 10)}).join(', ')}
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
      type="Date"
      value={newDate}
      onChange={(e) => {setNewDate(e.target.value)}}
    />
  </label>
  <button className='dateAdding' type="button" onClick={() => handleAddGrantDate(newDate)}>
      Thêm
  </button>
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
                {modalInfo.pageGrantDates.map((date)=>{return date.substring(0, 10)}).map((date) => (
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
