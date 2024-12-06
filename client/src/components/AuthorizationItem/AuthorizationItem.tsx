import React from 'react'
import './AuthorizationItem.css'
import { useNavigate } from 'react-router-dom'

interface authorizationItem {
    avatar: string,
    object: string
}
const AuthorizationItem: React.FC<authorizationItem> = ({avatar, object}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    console.log(object)
    navigate('/login')
  }
  return (
    <div className='item' onClick={handleClick}>
        <img src={avatar} alt="" />
        <span>{object}</span>
    </div>
  )
}

export default AuthorizationItem
