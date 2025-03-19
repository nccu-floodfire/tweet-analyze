// 引入 React 和 styled-components 的类型定义
import { display } from '@mui/system';
import React, { useState }  from 'react';
import styled from 'styled-components';

interface MyComponentProps {
  result2: any[]; // 假设 result2 是任意数组
  setSelectedFile: (fileName: string) => void; // 事件处理函数类型
}

// 创建一个 StyledDiv 组件，这将使 div 固定在屏幕右下角
const StyledTimestamp = styled.div`           
  display: flex;    
  background-color: #16171C;
  
  justify-content: space-around;
  padding: 1% 100%;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1); 
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  margin-right: 3%;
  background-color: ${(props) => (props.isSelected ? '#E9E9E8' : '#16171C')}; // Selected color
  color: ${(props) => (props.isSelected ? 'black' : 'white')}; // Text color changes on selection
  &:hover {
    background-color: #E9E9E8; // Hover color 16171C
    color: black;
  }
`;

// 定义组件
const MyComponent: React.FC<MyComponentProps> = ({ result2, setSelectedFile }) => {
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    // console.log('result2:', result2);
  return (
    
    <StyledTimestamp>
      {result2.length > 0 ? 
      <>
        <div style={{display:'flex', alignItems:'center',color:'white', fontSize:'40px'}}>時</div>
        <div style={{display:'flex', alignItems:'center',color:'white', fontSize:'40px'}}>間</div>
        <div style={{display:'flex', alignItems:'center',color:'white', fontSize:'40px'}}>段</div>
        <div style={{display:'flex', alignItems:'center',color:'white', fontSize:'40px'}}>選</div>
        <div style={{display:'flex', alignItems:'center',color:'white', fontSize:'40px', marginRight:'3%'}}>擇：</div>

       {Object.keys(result2[0]).map(key => {
        const fileName = key.replace('.csv', '');
        const isSelected = fileName === selectedFileName;
        return (
          <StyledButton
            key={key}
            isSelected={isSelected}
            onClick={() => {
              setSelectedFile(fileName);
              console.log('fileName:', fileName);
              setSelectedFileName(fileName); // Update state to mark this button as selected
            }}
          >
            {fileName}
          </StyledButton>
        );
      }) }
      </> : null}
    </StyledTimestamp>
  );
}

export default MyComponent;

