import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

interface MyDataTable3Props {
    data: any;
}
const DataTableComponent: React.FC<MyDataTable3Props> = ({ data }) => {

    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
        if (data && data['data'] && data['data']['old']) {
            // console.log('tabledata:', data['data']['old']);
            // console.log('creat:', data['data']['old']['created_at']);
            const transformedData = Object.keys(data['data']['old']['created_at']).map((value) => ({
                created_at: data['data']['old'].created_at[value],
                text: data['data']['old'].text[value]
            }));
            setTransformedData(transformedData);
        } else {
            console.log('No valid data found for:');
            setTransformedData([]); // Clear the table or show a message
        }
    }, [data]);

    const columns = [
        {  
            id: 'created_at',
            name: '發文日期',
            selector: row => row.created_at,
            sortable: true,
            defaultSortAsc: false,
            width: "300px",                       // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
        },
        {
            id: 'text',
            name: '推文',
            selector: row => row.text,
            sortable: true,
        },
    ];

    const customStyles = {
        cells: {
            style: {
                color: 'black', // 字體顏色
                fontSize: '30px'
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
        // margin-top: 5%;
        cursor: pointer;
    `;

    
    // const handleSort = (column, sortDirection) => {
    //     setSortColumn(column.selector); // 更新排序列
    //     setSortDirection(sortDirection); // 更新排序方向
    // };
    return (

        <StyledDiv>
            <DataTable
                columns={columns}
                data={transformedData}
                pagination
                highlightOnHover
                customStyles={customStyles}
                defaultSortAsc={false}
            />
            
        </StyledDiv>
    );
}

export default DataTableComponent;
