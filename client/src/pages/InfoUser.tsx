import React, { useEffect, useState } from 'react'
import Button from '../components/InfoUserItems/Button.tsx'
import InfoFrame from '../components/InfoUserItems/InfoFrame.tsx'
import Header from '../components/header/header.tsx'
import Sidebar from './../components/sidebars/Sidebar.tsx';
import { data } from 'react-router-dom';
interface Info {
  label: string,
  value: string
}


const InfoUser: React.FC = () => {
  
  const [info, setInfo] = useState<Info[]>([]);

  useEffect(() => {
    

    const id = 2211651 // how to get it???????????
    let fetchedData;
    
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
            const fetchedInfo = [
              {
                label: 'Họ và tên',
                value: fetchedData.name
              },
              {
                label: 'Mã số sinh viên',
                value: fetchedData._id
              },
              {
                label: 'Khoa',
                value: 'Khoa hoc va Ky thuat May tinh'
              },
              {
                label: 'Ngày tháng năm sinh',
                value: '10/6/2004'
              },
              {
                label: 'Phái',
                value: 'Nam'
              },
              {
                label: 'Địa chỉ',
                value: 'Binh Duong'
              },
              {
                label: 'Email',
                value: fetchedData.email
              },
              {
                label: 'Số điện thoại',
                value: '0909090909'
              }]
              console.log('fetchedInfo: ', fetchedInfo);
              
            setInfo(fetchedInfo);
            console.log();
            
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




  const menuItems = [
    { title: "In tài liệu", link: "/print" },
    { title: "Mua thêm trang in", link: "/mua-them-trang-in" },
    { title: "Xem lịch sử in", link: "/lich-su-in" },
  ];
  const [clickButton, setClickButton] = useState(false);
    const [lastInfo, setLastInfo] = useState(info)
    const changeDatabase = async (newInfo) => {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${newInfo._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify(Object.fromEntries(Object.entries(newInfo).slice(-6))),
        });
        if(response.status === 200) {
          console.log('Database updated successfully');
        }  else {
          console.log('Database updated failed');
          
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    const handleUpdate = () => {
        setClickButton(true);
        setLastInfo(info);
        console.log('Cập nhật: ', info);
        const newInfo = {
          _id: info[1].value,
          email: info[6].value, /// add  // update email in database when change it in this component
          name: info[0].value,
          faculty: info[2].value,
          dob: info[3].value,
          sex: info[4].value,
          address: info[5].value,
          phoneNumber: info[7].value /// add 
        }
        console.log('newInfo: ', Object.fromEntries(Object.entries(newInfo).slice(-6)));
        
        changeDatabase(newInfo);
    }

    const handleCancel = () => {
        setClickButton(true);
        setInfo(lastInfo);
        console.log('Hủy: ', info);
    }

    const handlePersonalInfoChange = (newValues: Info[]) => {
        const updatedInfo = [...info];
        newValues.forEach((item, index) => {
            updatedInfo[index] = item;
        });
        setInfo(updatedInfo);
        setClickButton(false);
    };

    const handleAccountInfoChange = (newValues: Info[]) => {
        const updatedInfo = [...info];
        newValues.forEach((item, index) => {
            updatedInfo[info.length - 2 + index] = item;
        });
        setInfo(updatedInfo);
        setClickButton(false);

    };
  //////////////////// why not change there //////////////////
  
  return (
    <div>
      <Header title='Thông tin cá nhân'/>
      <Sidebar menuItems={menuItems}/>
      <div className='info-user' style={{marginTop: '100px'}}>
        <InfoFrame 
          title="THÔNG TIN CÁ NHÂN" 
          info={info.slice(0, -2)}
          onValuesChange={handlePersonalInfoChange}
          onResetInput={clickButton}  
        />
        <InfoFrame 
          title="THÔNG TIN TÀI KHOẢN" 
          info={info.slice(-2)} 
          onValuesChange={handleAccountInfoChange}
          onResetInput={clickButton}
        />      
        <div style={{display: 'flex', justifyContent: 'center', gap: '100px', marginTop: '40px'}}>
          <Button text="Cập nhật" color="#76ADFF" onClick={handleUpdate} />
          <Button text="Hủy" color="#EB4A4A" onClick={handleCancel} />
        </div>
      </div>
    </div>
  )
}

export default InfoUser
