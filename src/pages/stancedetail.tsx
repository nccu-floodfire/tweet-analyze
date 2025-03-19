import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link,useParams } from 'react-router-dom';
import MyDataTable2 from '../Components/stanceTable';
import MyDataTable3 from '../Components/stanceTable2';
import { SideBar } from '../Components/sidebar';
import { GlobalStyle } from "../styles/global";
import '../index.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const StanceDetail: React.FC = () => {
    const { filename, time, user } = useParams<{ filename: string, time:string, user: string }>();  
    const [data, setData] = useState<any[]>([]);
    const [username, setUser] = useState<string>('');
    

    useEffect(() => {
        
        const formData = new FormData();
        formData.append('filename', filename); 
        formData.append('time', time);
        formData.append('user', user);
    
        fetch('http://127.0.0.1:5001/stanceDetail', {
            method: 'POST',
            body: formData,
            headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data",Object.values(data['data']['old']['from_user_realname'])[0])
                setData(data) 
                setUser(Object.values(data['data']['old']['from_user_realname'])[0] as string) 
            })
            .catch((error) => {
            console.log("Error",error)
            })
        
        
        
        
    }, [filename,user]);

    return (
        <div>
            <div style={{display:'flex',justifyContent:'center',color:'white', marginTop:'3%'}}>
                <Link to={`/analytics/${filename}/`}>
                    <ArrowBackIcon style={{color:'white', fontSize:'50px'}}/></Link>
            </div>
            
            <div className='title3'>{user}  {username}</div>
            <div className='title3'>原立場資料</div>
            <div className='table'>
                <MyDataTable2 data={data} />
            </div>
            <div className='title3'>新立場資料</div>
            <div className='table'>
                <MyDataTable3 data={data} />
            </div>

          
          <div>
            <GlobalStyle /> 
            <SideBar />
          </div>
        </div>
      );
      
    
};


export default StanceDetail;
