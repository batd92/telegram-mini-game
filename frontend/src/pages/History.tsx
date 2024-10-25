import { useNavigate } from 'react-router-dom';
import { List, Button, Typography, Space, Card } from 'antd';
import { fetchGameHistory } from '../services/apiService';
import { useEffect, useState } from 'react';
import { IGameHistory } from '../interfaces/IGameHistory';

const { Title } = Typography;

const UserHistory: React.FC = () => {
    const navigate = useNavigate();
    const [gameHistorys, setGameHistory] = useState<IGameHistory[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchGameHistory();
            setGameHistory(response);
        };

        loadData();
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div style={{ padding: '20px', background: '#F0F4F8', minHeight: '100vh' }}>
            <Space style={{ marginBottom: '20px' }}>
                <Button
                    onClick={handleBackClick}
                    type="default"
                    style={{
                        borderRadius: '4px',
                        background: '#4B79A1',
                        color: '#ffffff',
                        border: 'none',
                    }}
                >
                    Back
                </Button>
            </Space>
            <Title level={2} style={{ textAlign: 'left', marginBottom: '20px', color: '#333333' }}>
                History
            </Title>
            <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
                <List
                    bordered
                    dataSource={gameHistorys}
                    renderItem={(gameHistory) => (
                        <List.Item>
                            <Card
                                style={{
                                    width: '100%',
                                    padding: '5px',
                                    borderRadius: '8px',
                                    background: '#ffffff',
                                    border: '1px solid #E7E7E7',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                }}
                                hoverable
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '16px', color: '#555555' }}>
                                        {gameHistory.createdAt}
                                    </span>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <Button
                                            type="primary"
                                            style={{
                                                borderRadius: '4px',
                                                background: '#FF6F61',
                                                borderColor: '#FF6F61',
                                                color: '#ffffff',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {'+' + (gameHistory.score || 0)}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default UserHistory;
