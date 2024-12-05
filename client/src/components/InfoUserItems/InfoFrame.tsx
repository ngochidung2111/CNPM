import React from 'react'
import './InfoUserItems.css'
interface Info {
  label: string,
  value: string
}
interface InfoFrameProps {
  title: string,
  info: Info[]
}
const UserInfo: React.FC<InfoFrameProps> = ({ title, info }) => {
  return (
    <div className='info-frame'>
      <span>{title}</span>
      {info.map((item, index) => (
        <form className='info-frame-item' style={{borderBottom: index === info.length - 1 ? '1px solid #000' : 'none'}} key={index}>
          <p>{item.label}</p>
          <p>
            {item.value}<img src={require('../assets/image/Vector.png')} alt="edit" />
          </p>
        </form>
      ))}
    </div>
  )
}

export default UserInfo
