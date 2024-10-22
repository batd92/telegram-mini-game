import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Typography, Space } from 'antd';

const { Title } = Typography;

const LeaderBoard: React.FC = () => {
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState<{ id: number; name: string; score: number; }[]>([]);

    useEffect(() => {
        const fetchLeaders = async () => {
            const fakeLeaders = [
                { id: 1, name: 'Player 1', score: 150 },
                { id: 2, name: 'Player 2', score: 120 },
                { id: 3, name: 'Player 3', score: 100 },
                { id: 4, name: 'Player 4', score: 80 },
                { id: 5, name: 'Player 5', score: 60 },
                { id: 6, name: 'Player 6', score: 40 },
                { id: 7, name: 'Player 7', score: 20 },
                { id: 8, name: 'Player 8', score: 10 },
            ];
            setLeaders(fakeLeaders);
        };

        fetchLeaders();
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div style={{ padding: '40px', background: '#f9f9f9', minHeight: '100vh' }}>
            <Space style={{ marginBottom: '20px' }}>
                <Button onClick={handleBackClick} type="default">
                    Back
                </Button>
            </Space>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>LeaderBoard</Title>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <List
                    bordered
                    dataSource={leaders}
                    renderItem={leader => (
                        <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', color: '#555' }}>{leader.name}</span>
                            <span style={{ fontSize: '18px', color: '#555' }}>{leader.score}</span>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default LeaderBoard;
