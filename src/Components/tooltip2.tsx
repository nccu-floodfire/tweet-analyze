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
                        以計算模型時的theta值判斷重要貼文為何,theta值來自Theta矩陣，計算文本和主題間的機率，機率越大代表文本和主題越相關
                    </div>
                )}
            </div>
        </div>
    );
};

export default TooltipButton;

