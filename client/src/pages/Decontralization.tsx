import React from 'react'
import '../css/Decontralization.css'
import DecontralizationItem from '../components/DecentralizationItem/DecentralizationItem.tsx'
import personIcon from '../components/assets/image/person.png'
import personFillIcon from '../components/assets/image/person-fill.png'

const Decontralization: React.FC = () => {
    const props = [{
        avatar: personIcon,
        object: 'Sinh viên'
    },
    {
        avatar: personFillIcon,
        object: 'SPSO'
    }]
  return (
    <div className="decentralization-container">
        <img className='logo' src={require('../components/assets/image/hcmut.png')} alt="Logo" />
        <div className="items-container">
            <DecontralizationItem avatar={props[0].avatar} object={props[0].object} />
            <DecontralizationItem avatar={props[1].avatar} object={props[1].object} />
        </div>
    </div>
  )
}

export default Decontralization
