import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

interface MyDataTable2Props {
    data: any;
    selectedFile: string;  // 新增這一行
    onItemSelected: (item: string) => void;
}
const DataTableComponent: React.FC<MyDataTable2Props> = ({ data, selectedFile, onItemSelected}) => {

    const [transformedData, setTransformedData] = useState([]);
    const [defaultSortFieldId, setDefaultSortFieldId] = useState('betweenness_centrality_Score');
    // console.log('selectedFile:', selectedFile);
    
    useEffect(() => {
        // console.log('tabledata:', data);
        if (data.length > 0) {
            const fileOptions = Object.keys(data[0]).reduce((obj, key) => {
                const newKey = key.replace('.csv', ''); 
                obj[newKey] = data[0][key];
                return obj;
            }, {});
            const currentData = fileOptions[selectedFile];
            // console.log('currentData2:', currentData);
            if (currentData && currentData['Name']) {
                const transformedData = Object.keys(currentData['Name']).map((value) => ({
                    Name: currentData.Name[value],
                    Account: currentData.Account[value],
                    Follower: currentData.Follower[value],
                    betweenness_centrality_Score: currentData.betweenness_centrality_Score[value],
                    closeness_centrality_Score: currentData.closeness_centrality_Score[value],
                    degree_centrality_Score: currentData.degree_centrality_Score[value],
                    eigenvector_centrality_Score: currentData.eigenvector_centrality_Score[value]
                }));
                setTransformedData(transformedData);
            } else {
                console.log('No valid data found for:', selectedFile);
                setTransformedData([]); // Clear the table or show a message
            }
        }
    }, [data, selectedFile]);

    const columns = [
        {  
            id: 'Name',
            name: '名稱',
            selector: row => row.Name,
            sortable: true,
            defaultSortAsc: false,
        },
        {
            id: 'Account',
            name: '帳號',
            selector: row => row.Account,
            sortable: true,
        },
        {
            id: 'degree_centrality_Score',
            name: '度中心性',
            selector: row => row.degree_centrality_Score,
            sortable: true,
        },
        {
            id: 'betweenness_centrality_Score',
            name: '介數中心性',
            selector: row => row.betweenness_centrality_Score,
            sortable: true,
        },
        {
            id: 'closeness_centrality_Score',
            name: '接近中心性',
            selector: row => row.closeness_centrality_Score,
            sortable: true,
        },
        {
            id: 'eigenvector_centrality_Score',
            name: '特徵向量中心性',
            selector: row => row.eigenvector_centrality_Score,
            sortable: true,
        },
        {
            id: 'Follower',
            name: '追蹤人數',
            selector: row => row.Follower,
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
        cursor: pointer;
    `;

    const handleRowClicked = (row) => {
        onItemSelected(row.Account);
        console.log('Row clicked:', row);
        setDefaultSortFieldId('betweenness_centrality_Score'); // 或其他你想要的欄位
        // console.log('item:' ,selectedItem)
      };
    
    // const handleSort = (column, sortDirection) => {
    //     setSortColumn(column.selector); // 更新排序列
    //     setSortDirection(sortDirection); // 更新排序方向
    // };
    return (
        
        <StyledDiv>
            <DataTable
                onRowClicked={handleRowClicked}
                columns={columns}
                data={transformedData}
                pagination
                highlightOnHover
                customStyles={customStyles}
                defaultSortAsc={false}
                defaultSortFieldId={defaultSortFieldId}
            />
            
        </StyledDiv>
    );
}

export default DataTableComponent;
