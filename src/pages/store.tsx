import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 引入 Link 組件
import { SideBar } from '../Components/sidebar';
import { GlobalStyle } from "../styles/global";
import ArticleIcon from '@mui/icons-material/Article';

function Store() {
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5001/get_file', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setTitles(data)
        })
        .catch((error) => {
            console.log("Error",error)
        })
    }, []); // 將 fetch 放入 useEffect 中，並設定依賴為空陣列，使其只在組件掛載時執行一次

    return (
        <div className='box-title '>
            {titles.map(title => (
                <Link to={`/analytics/${title}`} className='box'> 
                        <ArticleIcon  className='icon' fontSize='large' />
                        {title}
                </Link>
            ))}
            <GlobalStyle />
            <SideBar />
        </div>
    );
}

export default Store;