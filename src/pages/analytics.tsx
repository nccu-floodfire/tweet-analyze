import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link,useParams } from 'react-router-dom';
import MyDataTable from '../Components/Table';
import MyDataTable2 from '../Components/Table2';
import { SideBar } from '../Components/sidebar';
import { GlobalStyle } from "../styles/global";
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import BTM_chart from '../Components/btm_fig';
import BTM_bar from '../Components/btm_bar';
import BTM_doc from '../Components/btm_doc';
import Network from '../Components/network/network';
import { Dataset } from '../Components/types';
import MyComponent from '../Components/timebar';
import TooltipButton from '../Components/tooltip';
import TooltipButton2 from '../Components/tooltip2';
import Timeline from '../Components/timeline';
import axios from 'axios';
import { saveAs } from 'file-saver';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    // maintainAspectRatio: false,
    responsive: true,
    maintainAspectRatio: false,  // 不保持寬高比
    onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    plugins: {
        tooltip: {
            bodyFont: {
                size: 40,
            }, 
            titleFont: {
                size: 40, 
            },
          },
        legend: {
            position: 'top' as 'top',
            labels: {
                color: 'white',
                font: {
                    size: 50,
                },
            },
        },
    },
    
    scales: {
        x: {
          ticks: {
            // 更改 x 軸刻度的字體顏色和大小
            color: 'white',
            font: {
              size: 40,
            },
          },
        },
        y: {
          ticks: {
            // 更改 y 軸刻度的字體顏色和大小
            color: 'white',
            font: {
              size: 40,
            },
          },
        },
      },
};


const Analytics: React.FC = () => {
    const { filename } = useParams<{ filename: string }>();  //紀錄這哪一份rawdata ex: 12.csv_20221211....
    const [result, setResult] = useState<any[]>([]);  //statistic table
    const [result2, setResult2] = useState<any[]>([]);  //centrality table
    const [result3, setResult3] = useState<any[]>([]); //btm bubble chart
    const [chartData, setChartData] = useState<any>(null); //每日貼文數
    const [selectedFile, setSelectedFile] = useState(''); //選擇的日期段
    const [selectedItem, setSelectedItem] = useState(null); //選擇的用戶
    const [cenData, setcenData] = useState({cenData: []}); //用戶每個時間段的中心性
    // const [selectedChart, setSelectedChart] = useState(''); //選擇的日期段 for BTM bubble chart
    const firstbubble = '0';
    const [selectedBubble, setSelectedBubble] = useState(firstbubble); //選擇的topic for BTM bubble chart
    const [barData, setBarData] = useState<any>(null); //關鍵字資料
    const [docData, setDocData] = useState<any>(null); //重要貼文資料
    const [network_data, setNetworkData] = useState<any>(null); //社群網路資料
    const [cen_type, setCenType] = useState('degree'); //中心性類型
    const [stancechange, setStanceChange] = useState<any>(null) //立場變化資料
    const [fileExists, setFileExists] = useState<boolean | null>(null);
    const [timeline, setTimeline] = useState<any>(null);
    const [highlightedNode, _setHighlightedNode] = useState(null);

    const setHighlightedNode = (node: string | null) => {
        console.log('Setting highlighted node to', node);
        _setHighlightedNode(node);
      };

    useEffect(() => {
        const formData = new FormData();
        formData.append('filename', filename);
        fetch('http://127.0.0.1:5001/check-file', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000', 
            }})
            .then(response => response.json())
            .then(data => {
                // console.log('处理数据', data);
                setFileExists(data.exists);})
            .catch(error => console.error('Error fetching data: ', error));
    }, [filename]);

    useEffect(() => {
        
        const formData = new FormData();
        formData.append('filename', filename); 
        formData.append('selectedItem', selectedItem);
        formData.append('selectedBubble', selectedBubble.toString());
        
        fetch('http://127.0.0.1:5001/get_cendata', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',            },
            // body: JSON.stringify({ selectedItem }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((cenData) => {
                setcenData(cenData) //中心性類型
             })
            .catch(error => {
                console.error('Error:', error);    
                // console.log('selectedItem:', selectedItem);
            });
        
        fetch('http://127.0.0.1:5001/result1', {
            method: 'POST',
            body: formData,
            headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const dataArray = Object.keys(data).map((key) => JSON.parse(data[key]));
                setResult(dataArray) //statistic table
            })
            .catch((error) => {
            console.log("Error",error)
            })
        
        fetch('http://127.0.0.1:5001/chartData', {  
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setChartData(data); //每日貼文數
            })
            .catch((error) => {
                console.log("Error", error)
            })
        
        fetch('http://127.0.0.1:5001/result2', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    const csv = Object.values(data);
                    setResult2(csv) //centrality table

                } else {
                    console.log('Data is null or undefined');
                }
            })
            .catch((error) => {
            console.log("Error",error)
            })
        fetch('http://127.0.0.1:5001/timeline', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    console.log('timeline:', data)
                    setTimeline(data) 

                } else {
                    console.log('Data is null or undefined');
                }
            })
            .catch((error) => {
            console.log("Error",error)
            })
            
        
        fetch('http://127.0.0.1:5001/btm_fig', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    const csv = Object.values(data);
                    setResult3(csv)
                    // console.log('btm:', csv)

                } else {
                    console.log('Data is null or undefined');
                }
            })
            .catch((error) => {
            console.log("Error",error)
            })
        
        fetch('http://127.0.0.1:5001/btm_terms', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((barData) => {
                setBarData(barData) 
                // const initialbubble = '0';
                // setSelectedBubble(initialbubble);
                // console.log('test:', selectedBubble)
                // console.log('barData:', barData['btm_terms'])
            
            })
            .catch((error) => {
            console.log("Error",error)
            })

        fetch('http://127.0.0.1:5001/btm_doc', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((docData) => {
                setDocData(docData) 
                // console.log('test:', selectedBubble)
                // console.log('barData:', docData)
            
            })
            .catch((error) => {
            console.log("Error",error)
            })
        
        
        
    }, [filename,selectedItem,selectedBubble]);

    useEffect(() => {
        const formData = new FormData();
        formData.append('filename', filename);

        fetch('http://127.0.0.1:5001/btm_fig', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    const csv = Object.values(data);
                    // setResult3(csv)
                    // console.log('btm:', csv)
                    const initialFile = csv.length > 0 ? Object.keys(csv[0])[0].replace('.csv', '') : '';
                    setSelectedFile(initialFile);
                    // console.log('selectedChart:', initialFile);
                } else {
                    console.log('Data is null or undefined');
                }
            })
            .catch((error) => {
            console.log("Error",error)
            })
    }, []); 

    useEffect(() => {
        const formData = new FormData();
        formData.append('filename', filename);

        fetch('http://127.0.0.1:5001/result2', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data !== null && data !== undefined) {
                const csv = Object.values(data);
                // setResult2(csv) //centrality table
                const initialFile = csv.length > 0 ? Object.keys(csv[0])[0].replace('.csv', '') : '';
                setSelectedFile(initialFile);
            } else {
                console.log('Data is null or undefined');
            }
        })
        .catch((error) => {
            console.log("Error", error)
        });
    }, []); 
    
    useEffect(() => {
        const formData = new FormData();
        formData.append('filename', filename); 
        formData.append('cen_type', cen_type);
        formData.append('selectedFile', selectedFile);
        fetch('http://127.0.0.1:5001/network', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((network) => {
                // const network = JSON.parse(network);
                // console.log('Network:', network); // 查看网络响应数据
                setNetworkData(network); // 更新状态
                // console.log('setNetworkData called'); // 确认这行代码被执行
                
            
            })
            .catch((error) => {
            console.log("Error",error)
            })
    }, [filename, cen_type, selectedFile]);

    useEffect(() => {
        const formData = new FormData();
        formData.append('filename', filename); 
        formData.append('selectedFile', selectedFile);
        fetch('http://127.0.0.1:5001/stance', {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((stance) => {
                setStanceChange(stance); // 更新状态
                // console.log('stanceChange:', stance); // 确认这行代码被执行

            })
            .catch((error) => {
            console.log("Error",error)
            })
    }, [filename, selectedFile]);

    const handleDownload = async () => {
        const formData = new FormData();
        formData.append('filename', filename); 
    
        try {
          const response = await fetch('http://127.0.0.1:5001/download', { 
            method: 'POST', 
            body: formData ,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // 將回傳的資料轉換為 Blob
          const data = await response.text();
          const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    
          // 使用 file-saver 套件來保存檔案
          saveAs(blob, 'Download.csv');
        } catch (error) {
          console.error('Download failed:', error);
        }
    };
    



    const sortedCenData = cenData.cenData.sort((a, b) => a.name - b.name);
    const chartcenData = {
        labels: sortedCenData.map(d => d.name),
        datasets: [{
        label: '接近中心性分數',
        data: sortedCenData.map(d => d.centrality),
        backgroundColor: 'rgba(75,192,192,0.4)', // 設定背景顏色
        borderColor: 'rgba(75,192,192,1)', // 設定邊框顏色
        }],
    };
    const cluster = [ { "key": "A", "color": "#FEF4DC", "clusterLabel": "中立" }, { "key": "B", "color": "#D85656", "clusterLabel": "支持中國共產黨及習近平" }, { "key": "C", "color": "#F7826C", "clusterLabel": "支持中國共產黨" }, { "key": "F", "color": "#B2D0E3", "clusterLabel": "反對中國" }, { "key": "G1", "color": "#95AAA2", "clusterLabel": "反對中國及習近平" }, { "key": "G2", "color": "#B5E3EA", "clusterLabel": "反對中國及習近平但支持共產黨" }, { "key": "H", "color": "#C3D4C8", "clusterLabel": "反對中國及共產黨但支持習近平" }, { "key": "J", "color": "#5776B5", "clusterLabel": "反對中國共產黨及習近平" }, { "key": "無貼文判斷立場", "color": "#F5F5F2", "clusterLabel": "無貼文判斷立場" }];

    function getClusterLabel(key) {
        const clusterItem = cluster.find(item => item.key === key);
        return clusterItem ? clusterItem.clusterLabel : '未知立場';
    }
    return (
        <div>
          {/* 文件检查结果，如果fileExists为null，显示"正在加载数据..."，否则根据存在性显示 */}
          {fileExists === null ? (
            <div>還在分析中...</div>
          ) : fileExists ? (
            <div>
              <div className='analytic-title'>
                <h1>資料概況</h1>
              </div>
              <div className='table'>
                <MyDataTable data={result} />
              </div>
              <div className='chart'>
                {chartData && <Line options={options} data={chartData} style={{ width: "1800px", height: "800px" }}/>}
              </div>
              <div className='analytic-title'>
                        <h1>選擇日期段</h1>
                </div>
              <div className='timestamp2'>
                    
                {timeline && <Timeline startDate={timeline.first} endDate={timeline.last} highlightPeriods={timeline.highlightPeriods} highlightPeriods2={timeline.highlightPeriods2} setSelectedFile={setSelectedFile}/>}
              </div>
              
              <div className='analytic-title'>
                    <h1>主題分類</h1>
                    <TooltipButton2/>
              </div>
                <div className='topic-row'>
                    <div className='half-width'>
                        {result3.length > 0 && <BTM_chart data={result3} selectedChart={selectedFile} onItemSelected={setSelectedBubble} />}
                    </div>
                    <div className='half-width'>
                        <BTM_bar data={barData} selectedChart={selectedFile} selectedBubble={selectedBubble} />
                    </div>
                </div>
                <div className='chart'>
                    {docData && <BTM_doc data={docData} selectedChart={selectedFile} selectedBubble={selectedBubble}/>}
                </div>
                <div className='analytic-title'>
                <h1>用戶社群網路中心性分數</h1>
                
              </div>
                <div className='title2'>
                    <h3>點擊用戶查看變化</h3>
                </div>
              <div className='table'>
                    <MyDataTable2 data={result2} selectedFile={selectedFile} onItemSelected={setSelectedItem} /> 
                    {/* <div className='title2' >
                        <h3>點擊用戶查看變化</h3>   
                    </div>   */}
                    
                </div>
                <div className='title2'>
                        <h3>用戶：{selectedItem}</h3>
                    </div>
              
              <div className='chart'>
                {chartcenData && <Line options={options} data={chartcenData} style={{ width: "1800px", height: "800px" }} />}
              </div>
                {/* <div className='analytic-title'>
                    <h1>社群網路圖</h1>
                    <button onClick={handleDownload}>下載所有立場資料</button>
                </div>
                <div className='centrality'>
                    <button
                        className={cen_type === 'degree' ? 'selected' : ''}
                        onClick={() => setCenType('degree')}
                    >
                        Degree Centrality
                    </button>
                    <button
                        className={cen_type === 'betweeness' ? 'selected' : ''}
                        onClick={() => setCenType('betweeness')}
                    >
                        Betweeness Centrality
                    </button>
                    <button
                        className={cen_type === 'closeness' ? 'selected' : ''}
                        onClick={() => setCenType('closeness')}
                    >
                        Closeness Centrality
                    </button>
                    <button
                        className={cen_type === 'eigenvector' ? 'selected' : ''}
                        onClick={() => setCenType('eigenvector')}
                    >
                        Eigenvector Centrality
                    </button>
                    <TooltipButton />
                </div> */}
                
                {network_data ? (
                    <React.StrictMode>
                        <Network data={network_data} highlightedNode={highlightedNode} />
                    </React.StrictMode>
                ) : (
                    <div>Loading...</div>
                )}
                <div className='title2'>
                    {stancechange && stancechange.length > 0 ? (
                    <div>
                        <div className='analytic-title'>
                            <h1>立場變化</h1>
                        </div>
                        <div className='stance-change-list'>
                            {stancechange.map((item, index) => (
                                <Link 
                                    to={`/analytics/${filename}/${selectedFile}/${item[0]}`} 
                                    key={index} 
                                    className='stance-change-item'
                                    onMouseEnter={() => setHighlightedNode(item[0])}
                                    // onMouseLeave={() => setHighlightedNode(null)}
                                >
                                    <h3>用戶：{item[0]}</h3>
                                    <h4>原立場：{getClusterLabel(item[1])}</h4>
                                    <h4>新立場：{getClusterLabel(item[2])}</h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='analytic-title'>
                            <h1>無立場變化</h1>
                    </div>
                )}
                </div>
                
            </div>
            ) : (
                <div className='analytic-title'>
                    <h1>還在分析中</h1>
                </div>
            )}
      
          {/* 无论文件是否存在，都显示的组件 */}
          <div>
            <GlobalStyle /> 
            <SideBar />
          </div>
        </div>
      );
      
    
};


export default Analytics;
