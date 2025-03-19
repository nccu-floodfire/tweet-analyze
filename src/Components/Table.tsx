import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';


function DataTableComponent({ data }) {
    // 將原始數據轉換為包含額外行的格式
    const transformedData = data.flatMap((item, i) => [
        item,
        ...Object.values(item.month).slice(1).map((value, j) => ({
            month: [value],
            English: [Object.values(item.English)[j + 1]],
            Japanese: [Object.values(item.Japanese)[j + 1]],
            Chinese: [Object.values(item.Chinese)[j + 1]],
            English2: [Object.values(item.English2)[j + 1]],
            Japanese2: [Object.values(item.Japanese2)[j + 1]],
            Chinese2: [Object.values(item.Chinese2)[j + 1]],
            // ...其他列
        })),
    ]);
    // console.log('transformedData:', transformedData);

    const columns = [
        {
            name: '月份',
            selector: row => row.month[0],
            sortable: true,
            defaultSortAsc: false,
        },
        {
            name: '英文篇數',
            selector: row => row.English[0],
            sortable: true,
        },
        {
            name: '英文去重複篇數',
            selector: row => row.English2[0],
            sortable: true,
        },
        {
            name: '日文篇數',
            selector: row => row.Japanese[0],
            sortable: true,
        },
        {
            name: '日文去重複篇數',
            selector: row => row.Japanese2[0],
            sortable: true,
        },
        {
            name: '中文篇數',
            selector: row => row.Chinese[0],
            sortable: true,
        },
        {
            name: '中文去重複篇數',
            selector: row => row.Chinese2[0],
            sortable: true,
        },
        // ...其他列
    ];
    const customStyles = {
        cells: {
            style: {
                color: 'black', // 字體顏色
                fontSize: '30px', // 字體大小
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
    border-radius: 10px;
    overflow: hidden;
    width: 1800px;
    `;  

    return (
        <StyledDiv>
            <DataTable
            // title="推特資料概況"
            columns={columns}
            data={transformedData}
            // pagination
            highlightOnHover
            customStyles={customStyles}
            defaultSortAsc={false}
            
        />
        </StyledDiv>
        
    );
}

export default DataTableComponent;
