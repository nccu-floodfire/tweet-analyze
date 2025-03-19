import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs'; // 引入 Dayjs 類型
import { SideBar } from './Components/sidebar';
import { GlobalStyle } from "./styles/global";
import { Datepicker } from './Components/Datepicker';
import TooltipButton from './Components/tooltip3';



const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dic_file, setDicfile] = useState<File | null>(null);
  const [result, setResult] = useState<any[]>([]); 
  const [startDate1, setStartDate1] = useState<Dayjs | null>(null); 
  const [endDate1, setEndDate1] = useState<Dayjs | null>(null); 
  const [startDate2, setStartDate2] = useState<Dayjs | null>(null); 
  const [endDate2, setEndDate2] = useState<Dayjs | null>(null); 
  const [startDate3, setStartDate3] = useState<Dayjs | null>(null); 
  const [endDate3, setEndDate3] = useState<Dayjs | null>(null); 
  const [result2, setResult2] = useState<any[]>([]); 
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  function handleDicFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setDicfile(e.target.files[0]);
    }
  }

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    if (dic_file) {
      formData.append('dic_file', dic_file);
    }
    if (startDate1) {
      formData.append('startDate1', dayjs(startDate1).format('YYYY-MM-DD'));    }
    if (endDate1) {
      formData.append('endDate1', dayjs(endDate1).format('YYYY-MM-DD')); // 轉換為 UTC 的日期部分
    }
    if (startDate2) {
      formData.append('startDate2', dayjs(startDate2).format('YYYY-MM-DD')); // 轉換為 UTC 的日期部分
    }
    if (endDate2) {
      formData.append('endDate2', dayjs(endDate2).format('YYYY-MM-DD')); // 轉換為 UTC 的日期部分
    }
    if (startDate3) {
      formData.append('startDate3', dayjs(startDate3).format('YYYY-MM-DD')); // 轉換為 UTC 的日期部分
    }
    if (endDate3) {
      formData.append('endDate3', dayjs(endDate3).format('YYYY-MM-DD')); // 轉換為 UTC 的日期部分
    }

    fetch('http://127.0.0.1:5001/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setResult(result.result)
        console.log(result)
        if (result.result === 'Success!') {
          fetch('http://127.0.0.1:5001/centerity', {
            method: 'POST',
            body: formData,
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
          })
            .then((response) => response.json())
            .then((result) => {
              setResult2(result.result)
              console.log(result2)
            })
            .catch((error) => {
              console.log("Error",error)
            })
        }

      })
      .catch((error) => {
        console.log("Error",error)
      })

    };

    return (
      <div>
        <div className='title-style'>
          <h1 >上傳資料</h1>
        </div>
        <div>
          <div className='analytic-title'>
            <h3 >上傳推特原始資料</h3>
          </div>
          <div className="upload-style">
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className='analytic-title'>
            <h3 >上傳斷詞字典資料</h3>
            <TooltipButton />
          </div>
          <div className="upload-style">
            <input type="file" onChange={handleDicFileChange} />
          </div>
          <div className='date-title'>
            <h3 >自選時段一</h3>
            <div style={{ marginTop: '1%'}}>
              <Datepicker startDate={startDate1} endDate={endDate1} setStartDate={setStartDate1} setEndDate={setEndDate1} />
            </div>          </div>
          <div className='date-title'>
            <h3 >自選時段二</h3>
            <div style={{ marginTop: '1%' }}>
              <Datepicker startDate={startDate2} endDate={endDate2} setStartDate={setStartDate2} setEndDate={setEndDate2} />
            </div>          </div>
          <div className='date-title'>
            <h3 >自選時段三</h3>
            <div style={{ marginTop: '1%' }}>
              <Datepicker startDate={startDate3} endDate={endDate3} setStartDate={setStartDate3} setEndDate={setEndDate3} />
            </div>

          </div>

          <div className="upload-style">
            <button onClick={handleUpload}>上傳</button>
          </div>
          <div className='date-title'>
            <p>{result}</p>  
          </div>
        </div>
        <GlobalStyle /> 
        <SideBar />
      </div>
      
      
    );
   
};


export default App;
