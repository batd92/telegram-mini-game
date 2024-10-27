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
                    backgroundColor: 'rgba(0, 51, 102, 0.9)',
                    borderRadius: 8,
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#ffffff' }} disabled={true}>
                        ⏳ <Text strong style={{ color: '#FFD700' }}>{timeLeft}s</Text>
                    </Text>
                </Space>

                <Space style={{
                    backgroundColor: 'rgba(0, 51, 102, 0.9)',
                    borderRadius: 8,
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#ffffff' }} disabled={true}>
                        🏆 <Text strong style={{ color: '#FFD700' }}>{score}</Text>
                    </Text>
                </Space>

                <Space>
                    <Button
                        className="sound-toggle"
                        onClick={toggleSound}
                        style={{
                            backgroundColor: isSoundOn ? 'rgba(0, 51, 102, 0.9)' : 'rgba(153, 0, 0, 0.9)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 8,
                        }}
                    >
                        <strong>{isSoundOn ? '🔊' : '🔇'}</strong>
                    </Button>
                    <Button
                        className="home"
                        onClick={handleBackToHome}
                        style={{
                            backgroundColor: 'rgba(0, 51, 102, 0.9)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 8,
                        }}
                    >
                        <strong>🏠</strong>
                    </Button>
                </Space>
            </Space>
        </div>
    );
};

export default ControlPanel;
