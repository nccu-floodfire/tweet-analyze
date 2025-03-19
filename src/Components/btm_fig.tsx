import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {useState, useEffect} from 'react';
import 'chartjs-plugin-datalabels';

interface ChartProps {
    data: any;
    selectedChart: string;  // 新增這一行
    onItemSelected: (item: string) => void;
}

const BTM_chart: React.FC<ChartProps> = ({ data, selectedChart, onItemSelected}) => {
    
    const [transformedData, setTransformedData] = useState([]);    
    useEffect(() => {
        if (data.length > 0) {
            const fileOptions = Object.keys(data[0]).reduce((obj, key) => {
                const newKey = key.replace('.csv', ''); 
                obj[newKey] = data[0][key];
                return obj;
            }, {});
            // console.log('fileOptions:', fileOptions);
            const currentData = fileOptions[selectedChart];
            // console.log('currentData:', currentData);
            if (currentData ) {
                const transformedData = Object.keys(currentData['topic']).map((value) => ({
                    x: currentData.x[value],
                    y: currentData.y[value],
                    topic: currentData.topic[value],
                    size: currentData.size[value],
                }));
                setTransformedData(transformedData);
                // console.log('transformedData:', transformedData);
            } else {
                console.log('No valid data found for:', selectedChart);
                setTransformedData([]); // Clear the table or show a message
            }
        }
        else{
            console.log('No data found');
        }
    }, [data, selectedChart]);
    const colors = ['#FEF4DC','#FCD2A5','#F7777C','#B27089','#A293B4','#B5E3EA'];

    const chartData = {
        datasets: transformedData.map((item, index) => ({
            label: item.topic,
            data: [{ x: item.x, y: item.y, r: item.size*2.5, label: item.topic}],
            backgroundColor: colors[index % colors.length],//['#FEF4DC','#FCD2A5','#F7777C','#B27089','#A293B4','#B5E3EA'], // 設定背景顏色
            
        })),
    };
    

    const handleBubbleClicked = (event, elements, chart) => {
        if (elements.length > 0) {
            const chartElement = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true)[0];
            const index = chartElement.index;
            const datasetIndex = chartElement.datasetIndex;
            const bubble = chart.data.datasets[datasetIndex].data[index];
            onItemSelected(bubble.label);
            // console.log('Bubble clicked:', bubble.label);
        }
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,  // 不保持寬高比
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        onClick: handleBubbleClicked,
        plugins: {
            tooltip: {
                bodyFont: {
                    size: 20,
                }, 
                titleFont: {
                    size: 20, 
                },
              },
            legend: {
                position: 'bottom' as 'bottom',
                labels: {
                    color: 'white',
                    font: {
                        size: 30,
                    },
                },
            },
            datalabels: {
                // display: false,
                color: 'black',
                font: {
                    size: 20,
                },
                formatter: function(value, context) {
                    // console.log('context:', context);
                    return context.dataset.data[context.dataIndex].topic;
                }
            },
        },
        
        scales: {
            x: {
              ticks: {
                // 更改 x 軸刻度的字體顏色和大小
                color: 'grey',
                font: {
                  size: 30,
                },
              },
            },
            y: {
              ticks: {
                // 更改 y 軸刻度的字體顏色和大小
                color: 'grey',
                font: {
                  size: 30,
                },
              },
            },
          },
    };
  return <Bubble 
            data={chartData} 
            options={options} 
            style={{ width: "800px", height: "800px" }} // 直接通過樣式設定尺寸
            />;
};

export default BTM_chart;