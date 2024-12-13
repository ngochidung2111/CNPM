import React, { useState } from 'react'
import './AuthorizationItem.css'
import { useNavigate } from 'react-router-dom'

interface authorizationItem {
    avatar: string,
    object: string
}
const AuthorizationItem: React.FC<authorizationItem> = ({avatar, object}) => {
  const navigate = useNavigate()
  const handleClick = (role: String) => {
    role =  role === "Sinh viên" ? 'Student' : 'SPSO';
    navigate('/login', { state: { role } });
  }
  return (
    <div className='item' onClick={() => handleClick(object)}>
        <img src={avatar} alt="" />
        <span>{object}</span>
    </div>
  )
}

export default AuthorizationItem
