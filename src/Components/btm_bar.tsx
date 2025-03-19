import React from 'react';
import { Bar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';
import 'chartjs-plugin-datalabels';
// import { HorizontalBar } from 'react-chartjs-2';


interface BarProps {
    data: any;
    selectedChart: string;  // 新增這一行
    selectedBubble: any;
}

const options = {
    responsive: true,
    maintainAspectRatio: false,  // 不保持寬高比

    onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    indexAxis: "y" as const,
    plugins: {
        tooltip: {
            bodyFont: {
                size: 30,
            }, 
            titleFont: {
                size: 30, 
            },
          },
        legend: {
            position: 'top' as 'top',
            labels: {
                color: 'white',
                font: {
                    size: 30,
                },
            },
        },
        datalabels: {
            color: 'black',
            font: {
                size: 30,
            },
            formatter: function(value, context) {
                return context.dataset.data[context.dataIndex].label;
            }
        },
    },
    
    scales: {
        x: {
          ticks: {
            // 更改 x 軸刻度的字體顏色和大小
            color: 'white',
            font: {
              size: 30,
            },
          },
        },
        y: {
          ticks: {
            // 更改 y 軸刻度的字體顏色和大小
            color: 'white',
            font: {
              size: 30,
            },
          },
        },
      },
};

const BTM_bar: React.FC<BarProps> = ({ data, selectedChart, selectedBubble}) => {
    
    const [transformedData, setTransformedData] = useState([]);    
    useEffect(() => {
        // console.log('bar:', data);
        if (data) {
            // 20221211_0.csv to 20221211_0 選擇檔案
            const Bubble = Number(selectedBubble)
            const fileOptions = Object.keys(data['btm_terms']).reduce((obj, key) => {
                const newKey = key.replace(`_${Bubble}.csv`, ''); 
                obj[newKey] = data['btm_terms'][key];
                return obj;
            }, {});
            // console.log('bubbleoption:', fileOptions);
            const currentData = fileOptions[selectedChart];
            // console.log('currentData:', currentData);
            if (currentData ) {
                const transformedData = Object.keys(currentData['Terms']).map((value) => ({
                    Terms: currentData.Terms[value],
                    Type: currentData.Type[value],
                    Probability: currentData.Probability[value],
                }));
                setTransformedData(transformedData);
                // console.log('transformedData:', transformedData);
            } else {
                // console.log('No valid data found for:', selectedChart);
                setTransformedData([]); // Clear the table or show a message
            }
        }
        else{
            console.log('No data found');
        }
    }, [data]);
    const colors = ['#FEF4DC','#FCD2A5','#F7777C','#B27089','#A293B4','#B5E3EA'];

    const groupByType = transformedData.reduce((groups, item) => {
        const group = (groups[item.Type] || []);
        group.push(item);
        groups[item.Type] = group;
        // console.log('groupByType:', groups);
        return groups;
        
    }, {});

    const datasets = Object.keys(groupByType).map((type, index) => ({
        
        label: type,
        data: groupByType[type].map(item => item.Probability),
        backgroundColor: colors[index % colors.length],
    }));

    const barData = {
        labels: [...new Set(transformedData.map(item => item.Terms))],
        datasets,
    };
    
    

  return <Bar data={barData} options={options}  style={{ width: "800px", height: "800px" }} // 直接通過樣式設定尺寸
  />;
};

export default BTM_bar;