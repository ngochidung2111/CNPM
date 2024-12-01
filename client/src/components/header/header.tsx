import React from "react";
import "./header.css"; // Import file CSS để styling
interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={require('./hcmut.png')} className="logo" alt="Logo" />
        <span className="title">{title}</span>
      </div>
      <div className="header-right">
        <span className="username">Nguyễn Văn A</span>
        <img
          src="https://via.placeholder.com/40" // Thay link bằng avatar thực tế
          alt="Avatar"
          className="avatar"
        />
      </div>
    </header>
  );
};

export default Header;
