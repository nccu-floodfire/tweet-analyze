import React, { useState } from 'react';
import HelpIcon from '@mui/icons-material/Help';

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
                <HelpIcon style={{color:'white', fontSize:'50px'}}/>
                {showTooltip && (
                    <div style={{
                        visibility: 'visible',
                        width: '500px',
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
                        此四種中心性計算的資料來源為「選擇的時間段」用戶中轉推數大於5的用戶
                    </div>
                )}
            </div>
        </div>
    );
};

export default TooltipButton;

