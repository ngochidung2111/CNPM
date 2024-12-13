import React from "react";
import "./header.css"; // Import file CSS để styling
import { useNavigate } from "react-router-dom";
import { fullName, avatar } from '../../pages/InfoUser.tsx'
interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate()
  const redirect = () => {
    navigate('/info')
  }
  return (
    <header className="header">
      <div className="header-left">
        <img src={require('./hcmut.png')} className="logo" alt="Logo" />
        <span className="title">{title}</span>
      </div>
      <div className="header-right" style={{cursor: 'pointer'}} onClick={redirect}>
        <span className="username">{fullName}</span>
        <img
          src={avatar} // Thay link bằng avatar thực tế
          alt="Avatar"
          className="avatar"
          
          />
         
          <button
          className="logout-button"
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
          >
          Logout
          </button>
      </div>
    </header>
  );
};

export default Header;
