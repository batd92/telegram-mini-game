import React, { useState } from 'react';
import { QRCode } from 'antd';
import './Intro.css';

const Intro: React.FC = () => {
    const [size, setSize] = useState<number>(220);

    return (
        <div className="intro-container">
            <QRCode
                errorLevel="H"
                size={size}
                iconSize={size / 4}
                value="https://ant.design/"
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <p className="intro-text">Please access login from Telegram.</p>
        </div>
    );
};

export default Intro;
