import React, { useState, useEffect } from 'react';
import Header from '../components/header/header.tsx';
import Sidebar from '../components/sidebars/Sidebar.tsx';
import '../css/Config.css'; // Import file CSS để styling

interface ConfigProps {
    NumOfPage: number;
    Time: number;
    Max_Size: number;
    TypeOfFile: string;
}

const Config: React.FC<ConfigProps> = ({ NumOfPage, Time, Max_Size, TypeOfFile }) => {

   

    // State lưu thông tin hiện tại và trạng thái modal
    const [info, setInfo] = useState({
        NumOfPage,
        Time,
        Max_Size,
        TypeOfFile
    });
    useEffect(() => {
        setInfo({
            NumOfPage,
            Time,
            Max_Size,
            TypeOfFile
        });
    }, [NumOfPage, Time, Max_Size, TypeOfFile]);
    const initialState = {
        NumOfPage: 100,
        Time: 1,
        Max_Size: 1000,
        TypeOfFile: '.pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .jpg, .jpeg, .png, .gif, .bmp, .txt, .rtf, .html, .zip, .rar, .7z, .tar, .gz, .tgz, .bz2, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .jpg, .jpeg, .png, .gif, .bmp, .txt, .rtf, .html, .zip, .rar, .7z, .tar, .gz, .tgz, .bz2'
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalInfo, setModalInfo] = useState({ ...info });

    // Danh sách menu
    const menuItems = [
        { title: "Quản lý máy in", link: "/printmanagement" },
        { title: "Quản lý cấu hình", link: "/config" },
        { title: "Lịch sử in ấn", link: "/printhistory" },
        { title: "Báo cáo trang in", link: "/trangin" },
      ];

    // Hàm mở modal
    const openModal = () => {
        setModalInfo({ ...info });
        setIsModalOpen(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Hàm thay đổi thông tin và đóng modal
    const changeInfo = () => {
        setInfo(modalInfo);
        setIsModalOpen(false);
    };

    return (
        <div>
            <Sidebar menuItems={menuItems} />
            <Header title='Mua thêm trang in' />
            <div className="system-info-container">
                <h2>Thông tin hệ thống</h2>
                <table className="system-info-table">
                    <tbody>
                        <tr>
                            <td className="info-label">Số lượng trang được cấp</td>
                            <td className="info-value">{info.NumOfPage|| initialState.NumOfPage} (A4)</td>
                        </tr>
                        <tr>
                            <td className="info-label">Thời gian định kỳ cung cấp</td>
                            <td className="info-value">{info.Time || initialState.Time} học kỳ</td>
                        </tr>
                        <tr>
                            <td className="info-label">Kích thước tối đa</td>
                            <td className="info-value">{info.Max_Size || initialState.Max_Size} KB</td>
                        </tr>
                        <tr>
                            <td className="info-label">Loại tệp được chấp nhận</td>
                            <td className="info-value">{info.TypeOfFile || initialState.TypeOfFile}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="change-btn" onClick={openModal}>
                    Thay đổi thông tin
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Thay đổi thông tin hệ thống</h3>
                        <form>
                            <label>
                                Số lượng trang được cấp:
                                <input
                                    type="number"
                                    value={modalInfo.NumOfPage}
                                    onChange={(e) =>
                                        setModalInfo({
                                            ...modalInfo,
                                            NumOfPage: +e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Thời gian định kỳ cung cấp:
                                <input
                                    type="number"
                                    value={modalInfo.Time}
                                    onChange={(e) =>
                                        setModalInfo({
                                            ...modalInfo,
                                            Time: +e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Kích thước tối đa:
                                <input
                                    type="number"
                                    value={modalInfo.Max_Size}
                                    onChange={(e) =>
                                        setModalInfo({
                                            ...modalInfo,
                                            Max_Size: +e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Loại tệp được chấp nhận:
                                <input
                                    type="text"
                                    value={modalInfo.TypeOfFile}
                                    onChange={(e) =>
                                        setModalInfo({
                                            ...modalInfo,
                                            TypeOfFile: e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <div className="modal-actions">
                                <button type="button" onClick={changeInfo}>
                                    Lưu thay đổi
                                </button>
                                <button type="button" onClick={closeModal}>
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Config;


