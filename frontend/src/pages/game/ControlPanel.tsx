import React, { useEffect, useRef } from 'react';
import { Typography, Space, Button } from 'antd';

const { Text } = Typography;

interface ControlPanelProps {
    handleBackToHome: () => void;
    isSoundOn: boolean;
    timeLeft: number;
    score: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    handleBackToHome,
    isSoundOn,
    timeLeft,
    score,
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isSoundOn) {
                audio.play().catch((err: any) => {
                    console.error('Error playing audio:', err);
                });
            } else {
                audio.pause();
            }
        }
    }, [isSoundOn]);

    return (
        <div style={{ position: 'absolute', top: 15, left: 15, zIndex: 10 }}>
            <Space direction="vertical" size={16}>
                <Space style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#fff' }}>
                        ⏳ <Text strong style={{ color: '#ffd700' }}>{timeLeft}s</Text>
                    </Text>
                </Space>

                <Space style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#fff' }}>
                        🏆 <Text strong style={{ color: '#ffd700' }}>{score}</Text>
                    </Text>
                </Space>

                <Space>
                    <Button
                        className="sound-toggle"
                        onClick={handleBackToHome}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none' }}
                    >
                        <strong>{isSoundOn ? '🔊' : '🔇'}</strong>
                    </Button>
                    <Button
                        className="home"
                        onClick={handleBackToHome}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none' }}
                    >
                        <strong>🏠</strong>
                    </Button>
                </Space>
            </Space>
            <audio
                ref={audioRef}
                src="/sounds/BASXHKZIR_-_BASXHKZIR_-_Only_Alone.mp3"
                loop
            />
        </div>
    );
};

export default ControlPanel;
