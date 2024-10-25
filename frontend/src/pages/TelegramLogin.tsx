import React from 'react';
import { QRCode } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const TelegramLogin: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <QRCode
                    errorLevel="H"
                    size={200}
                    iconSize={50}
                    value="https://ant.design/"
                    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                />
                <Text
                    style={{
                        marginTop: '20px',
                        fontSize: '20px',
                        color: '#2e2e2e',
                    }}
                >
                    Please access login from Telegram.
                </Text>
            </div>
        </div>
    );
};

export default TelegramLogin;
