import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const TelegramLogin: React.FC = () => {
    const qrCodeImage = "images/git-qr-code.ce34b3d3.png";

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f7',
                padding: '20px',
                overflow: 'hidden',
            }}
        >
            <div style={{ marginBottom: '30px' }}>
                <Text
                    style={{
                        fontSize: '30px',
                        fontWeight: '600',
                        color: '#1c1c1e',
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center',
                    }}
                >
                    Welcome to APT
                </Text>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    padding: '15px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    maxWidth: '300px',
                    textAlign: 'center',
                    border: '1px solid #f0f0f0',
                }}
            >
                <img
                    src={qrCodeImage}
                    alt="Telegram QR Code"
                    style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                    }}
                />
            </div>
            <Text
                style={{
                    marginTop: '15px',
                    fontSize: '16px',
                    color: '#8e8e93',
                    fontWeight: '400',
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                Scan to login via Telegram
            </Text>
        </div>
    );
};

export default TelegramLogin;
