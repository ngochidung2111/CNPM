import React, { useState, useEffect } from 'react'
import './InfoUserItems.css'
interface Info {
  label: string,
  value: string
}
interface InfoFrameProps {
  title: string,
  info: Info[],
  onValuesChange: (newValues: Info[]) => void,
  onResetInput: Boolean
}
const InfoFrame: React.FC<InfoFrameProps> = ({ title, info, onValuesChange, onResetInput }) => {
  const [inputValue, setInputValue] = useState([false, false, false, false, false, false, false, false]);
  const [values, setValues] = useState(info.map(item => item.value));

  useEffect(() => {
    if (onResetInput) {
      setInputValue(prev => prev.map(() => false));
    }
  }, [onResetInput]);

  useEffect(() => {
    setValues(info.map(item => item.value));
    console.log(info.map(item => item.value));
  }, [info])

  const handleValueChange = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
    
    const updatedInfo = info.map((item, i) => ({
      ...item,
      value: i === index ? newValue : values[i]
    }));
    onValuesChange(updatedInfo);
    
  };
  // console.log(values);
  

  return (
    <div className='info-frame'>
      <span>{title}</span>
      {info.map((item, index) => (
        <form className='info-frame-item' style={{borderBottom: index === info.length - 1 ? '1px solid #000' : 'none'}} key={index}>
          <p>{item.label}</p>
          {!inputValue[index] ?
          <p>
            {values[index]}
            <img onClick={() => setInputValue(prev => {
              const newArr = [...prev];
              newArr[index] = true;
              return newArr;
            })} src={require('../assets/image/Vector.png')} alt="edit" />
          </p> : 
          <input 
            type="text" 
            value={values[index]} 
            onChange={(e) => handleValueChange(index, e.target.value)} 
            autoFocus
          />}
        </form>
      ))}
    </div>
  )
}

export default InfoFrame
