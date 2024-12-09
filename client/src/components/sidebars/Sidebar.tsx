import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface MenuItem {
  title: string;
  link: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location = useLocation(); // Để theo dõi URL hiện tại
  const savedSelectedIndex = localStorage.getItem("selectedMenuIndex");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    savedSelectedIndex ? parseInt(savedSelectedIndex) : null
  );

  useEffect(() => {
    // Reset trạng thái khi quay lại trang chính (ví dụ: trang home)
    if (location.pathname === "/") {
      // Xóa trạng thái lưu trong localStorage khi quay lại trang chính
      localStorage.removeItem("selectedMenuIndex");
      setSelectedIndex(null); // Reset selectedIndex
    }
  }, [location.pathname]);

  const handleMenuClick = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem("selectedMenuIndex", index.toString()); // Lưu vào localStorage
  };

  return (
    <aside className="sidebar">
      
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(index)}
              className={selectedIndex === index ? "active" : ""}
            >
              <Link to={item.link} className="menu-item">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        
      </div>
    </aside>
  );
};

export default Sidebar;
