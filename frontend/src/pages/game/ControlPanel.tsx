import React, { useState } from 'react';
import { Typography, Space, Button } from 'antd';

const { Text } = Typography;

interface ControlPanelProps {
    handleBackToHome: () => void;
    initialSoundState: boolean;
    onSoundToggle: (isSoundOn: boolean) => void;
    timeLeft: number;
    score: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    handleBackToHome,
    initialSoundState,
    onSoundToggle,
    timeLeft,
    score,
}) => {
    const [isSoundOn, setIsSoundOn] = useState(initialSoundState);

    const toggleSound = () => {
        const newSoundState = !isSoundOn;
        setIsSoundOn(newSoundState);
        onSoundToggle(newSoundState);
    };

    return (
        <div style={{ position: 'absolute', top: 15, left: 15, zIndex: 10 }}>
            <Space direction="vertical" size={16}>
                <Space style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '200px',
                }}>
                    <Text style={{ color: '#1C1C1E', fontSize: '18px', marginRight: '5px' }} disabled={true}>
                        ⏳
                    </Text>
                    <Text strong style={{ color: '#007AFF', fontSize: '20px' }}>{timeLeft}s</Text>
                </Space>

                <Space style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '200px',
                }}>
                    <Text style={{ color: '#1C1C1E', fontSize: '18px', marginRight: '5px' }} disabled={true}>
                        🏆
                    </Text>
                    <Text strong style={{ color: '#007AFF', fontSize: '20px' }}>
                        {score.toLocaleString('en-US')}
                    </Text>
                </Space>

                <Space>
                    <Button
                        className="sound-toggle"
                        onClick={toggleSound}
                        style={{
                            backgroundColor: isSoundOn ? '#007AFF' : '#FF3B30',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '5px 15px',
                            fontSize: '18px',
                            fontWeight: '600',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                            width: '100px',
                        }}
                    >
                        <strong style={{ fontSize: '20px' }}>{isSoundOn ? '🔊' : '🔇'}</strong>
                    </Button>
                    <Button
                        className="home"
                        onClick={handleBackToHome}
                        style={{
                            backgroundColor: '#007AFF',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '5px 15px',
                            fontSize: '18px',
                            fontWeight: '600',
                            marginLeft: '10px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                            width: '100px',
                        }}
                    >
                        <strong style={{ fontSize: '20px' }}>🏠</strong>
                    </Button>
                </Space>
            </Space>
        </div>
    );
};

export default ControlPanel;
