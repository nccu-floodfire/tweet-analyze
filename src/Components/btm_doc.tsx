import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';



interface docProps {
    data: any;
    selectedChart: string;  // 新增這一行
    selectedBubble: any;
}



const BTM_doc: React.FC<docProps> = ({ data, selectedChart, selectedBubble}) => {
    
    const [transformedData, setTransformedData] = useState([]);    
    useEffect(() => {
        // console.log('bar:', data);
        if (data) {
            // 20221211_0.csv to 20221211_0 選擇檔案
            const Bubble = Number(selectedBubble)
            const fileOptions = Object.keys(data['top_5_doc']).reduce((obj, key) => {
                const newKey = key.replace(`_${Bubble}.csv`, ''); 
                obj[newKey] = data['top_5_doc'][key];
                return obj;
            }, {});
            // console.log('bubbleoption:', fileOptions);
            const currentData = fileOptions[selectedChart];
            // console.log('currentData:', currentData);
            if (currentData) {
                const transformedData = Object.keys(currentData['from_user_name']).map((value) => ({
                    from_user_name: currentData.from_user_name[value],
                    from_user_realname: currentData.from_user_realname[value],
                    created_at: currentData.created_at[value],
                    text: currentData.text[value]
                }));
                setTransformedData(transformedData);
                // console.log('transformedData:', transformedData);
            }
            else {
                // console.log('No valid data found for:', selectedChart);
                setTransformedData([]); // Clear the table or show a message
            }
        }
        else{
            console.log('No data found');
        }
    }, [data]);
    
    const columns = [
        {
            name: '帳號',
            selector: row => row.from_user_name,
            sortable: true,
            defaultSortAsc: false,
            width: "200px",                       // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
        },
        {
            name: '名稱',
            selector: row => row.from_user_realname,
            sortable: true,
            width: "200px",                       // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: '發文時間',
            selector: row => row.created_at,
            sortable: true,
            width: "350px",                       // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },  
        },
        {
            name: '貼文',
            selector: row => row.text,
            sortable: true,
            style: {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                
            },
        },
    ];
    // console.log('Columns:', columns);


    const customStyles = {
        cells: {
            style: {
                color: 'black', // 字體顏色
                fontSize: '30px',
            },
            
        },
        headCells: {
            style: {
                fontSize: '30px', // 表頭字體大小
                backgroundColor: 'grey', // 表頭背景顏色
                color: 'white', // 表頭字體顏色
            },
        },
    };

    const StyledDiv = styled.div`
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
        width: 2000px;
        margin-bottom: 5%;
        cursor: pointer;
    `;
    

    return (
        
        <StyledDiv>
            
            <DataTable
                columns={columns}
                data={transformedData}
                // pagination
                highlightOnHover
                customStyles={customStyles}
                defaultSortAsc={false}
            />
            
        </StyledDiv>
    );
};

export default BTM_doc;