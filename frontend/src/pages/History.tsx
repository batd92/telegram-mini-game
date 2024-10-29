import { List, Button, Card } from 'antd';
import { fetchGameHistory } from '../services/apiService';
import { useEffect, useState } from 'react';
import { IGameHistory } from '../interfaces/IGameHistory';
import Breadcrumbs from '../components/Breadcrumb';
import { formatDateTime } from '../utils';

const UserHistory: React.FC = () => {
    const [gameHistorys, setGameHistory] = useState<IGameHistory[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchGameHistory();
            setGameHistory(response);
        };

        loadData();
    }, []);

    return (
        <div style={{ padding: '20px', background: '#F0F4F8', minHeight: '100vh' }}>
            <Breadcrumbs items={[
                { label: 'Home', path: '/home' },
                { label: 'History' }
            ]}
            />
            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >

                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={gameHistorys}
                    renderItem={(gameHistory) => (
                        <List.Item>
                            <Card
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid #E7E7E7',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    width: '100%',
                                    background: '#ffffff',
                                }}
                                hoverable
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 500 }}>
                                        {formatDateTime(gameHistory.createdAt)}
                                    </span>
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
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default UserHistory;
