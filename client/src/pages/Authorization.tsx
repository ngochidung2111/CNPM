import React from 'react'
import '../css/Authorization.css'
import AuthorizationItem from '../components/AuthorizationItem/AuthorizationItem.tsx'
import personIcon from '../components/assets/image/person.png'
import personFillIcon from '../components/assets/image/person-fill.png'

const Authorization: React.FC = () => {
    const props = [{
        avatar: personIcon,
        object: 'Sinh viên'
    },
    {
        avatar: personFillIcon,
        object: 'SPSO'
    }]
  return (
    <div className="authorization-container">
        <img className='logo' src={require('../components/assets/image/hcmut.png')} alt="Logo" />
        <div className="items-container">
            <AuthorizationItem avatar={props[0].avatar} object={props[0].object} />
            <AuthorizationItem avatar={props[1].avatar} object={props[1].object} />
        </div>
    </div>
  )
}

export default Authorization
