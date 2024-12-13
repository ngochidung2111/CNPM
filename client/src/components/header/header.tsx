import React, { useEffect } from "react";
import "./header.css"; // Import file CSS để styling
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  title: string;
}
let avatar:string
let fullName:string
const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate()
  const redirect = () => {
    navigate('/info')
  }

  useEffect(() => {
      let fetchedData;

  
  
      const id = localStorage.getItem('id')
  

      
      const fetchData = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken')
          if(accessToken) {
            const response = await fetch(`http://localhost:5000/api/students/${id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if(response.status === 200) {
              console.log('api get student success');
              
              fetchedData = await response.json();   
              avatar = fetchedData.avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/4-5.jpg'
              fullName = fetchedData.name || 'Guest';         
            }
          }
          else {
            console.error('Access token not found'); 
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
      
    }, []);
    
  return (
    <header className="header">
      <div className="header-left">
        <img src={require('./hcmut.png')} className="logo" alt="Logo" />
        <span className="title">{title}</span>
      </div>
      <div className="header-right" style={{cursor: 'pointer'}}>
        <span onClick={redirect} className="username">{fullName}</span>
        <img
          onClick={redirect}
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
