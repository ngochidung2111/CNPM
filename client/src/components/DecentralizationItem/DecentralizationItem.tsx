import React from 'react'
import './DecentralizationItem.css'

interface decontralItem {
    avatar: string,
    object: string
}
const DecentralizationItem: React.FC<decontralItem> = ({avatar, object}) => {
  return (
    <div className='item' onClick={() => {
      console.log(object)
    }}>
        <img src={avatar} alt="" />
        <span>{object}</span>
    </div>
  )
}

export default DecentralizationItem
