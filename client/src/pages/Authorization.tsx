import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Authorization.css';
import AuthorizationItem from '../components/AuthorizationItem/AuthorizationItem.tsx';
import personIcon from '../components/assets/image/person.png';
import personFillIcon from '../components/assets/image/person-fill.png';

const Authorization: React.FC = () => {
  const navigate = useNavigate();

  const props = [
    {
      avatar: personIcon,
      object: 'Sinh viên',
      role: 'Student'
    },
    {
      avatar: personFillIcon,
      object: 'SPSO',
      role: 'SPSO'
    }
  ];

  const handleAuthorizationClick = (role: string) => {
    navigate('/login', { state: { role } });
  };

  return (
    <div className="authorization-container">
      <img className='logo' src={require('../components/assets/image/hcmut.png')} alt="Logo" />
      <div className="items-container">
        <div onClick={() => handleAuthorizationClick(props[0].role)}>
          <AuthorizationItem avatar={props[0].avatar} object={props[0].object} />
        </div>
        <div onClick={() => handleAuthorizationClick(props[1].role)}>
          <AuthorizationItem avatar={props[1].avatar} object={props[1].object} />
        </div>
      </div>
    </div>
  );
};

export default Authorization;