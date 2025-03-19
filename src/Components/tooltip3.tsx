import React, { useState } from 'react';
import HelpIcon from '@mui/icons-material/Help';
import img from '../img.png';

const TooltipButton: React.FC = () => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
                style={{
                    marginLeft: '10px',
                    position: 'relative',
                    cursor: 'pointer',
                }}
                onClick={() => setShowTooltip(!showTooltip)}
            >
                <HelpIcon style={{color:'white', fontSize:'20px'}}/>
                {showTooltip && (
                    <div style={{
                        visibility: 'visible',
                        width: '750px',
                        fontSize: '40px',
                        backgroundColor: '#E9E9E9',
                        color: 'black',
                        textAlign: 'center',
                        borderRadius: '6px',
                        padding: '5px',
                        position: 'absolute',
                        zIndex: 1,
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(0%)', // Center the tooltip
                        marginTop: '-5px'
                    }}>
                        僅支援txt檔案，檔案格式為一行一個詞，如下圖所示
                        <img src={img} alt="示例圖片" style={{width: '100%', height: 'auto'}}/>


                    </div>
                )}
            </div>
        </div>
    );
};

export default TooltipButton;

