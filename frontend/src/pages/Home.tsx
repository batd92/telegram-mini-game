import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Avatar, Space, Row, Col, Spin, Alert } from 'antd';
import { fetchMe } from '../services/apiService';
import { IMe } from '../interfaces/IMe';

const { Title, Text } = Typography;

const BOT_BASE_URL = 'https://t.me/Binance_Moonbix_bot/start?startApp=ref_89898989';

const Home: React.FC = () => {
    const [me, setMe] = useState<IMe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true);
            try {
                const response = await fetchMe();
                setMe(response);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    navigate('/login');
                } else {
                    setError('Failed to load user data.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [navigate]);

    const calculateTotalScore = () => {
        if (me) {
            return me.analytics.task_score + me.analytics.game_score + me.analytics.referral_score;
        }
        return 0;
    };

    const handleGameClick = () => {
        navigate('/game');
    };

    const handleCopyClick = () => {
        const urlToCopy = BOT_BASE_URL + me?._id.toString();
        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => {})
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    const openPage = (page: string) => {
        navigate(`/${page}`);
    };

    const buttonStyle = {
        width: '100%',
        background: '#007aff',
        color: '#fff',
        marginBottom: '10px',
        borderRadius: '10px',
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
    }

    if (error) {
        return <Alert message={error} type="error" showIcon />;
    }

    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f9f9f9',
            minHeight: '100vh',
            paddingTop: '100px',
        }}>
            <Avatar
                size={320}
                src="/images/bg.png"
                alt="User Avatar"
                style={{
                    margin: '10px auto',
                    border: '2px solid #f0f0f0',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            />
            <Title level={1} style={{ fontWeight: 'bold', color: '#333' }}>
                {me?.first_name || 'User'}
            </Title>

            <div style={{ margin: '10px 0', color: '#333' }}>
                <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#007aff' }}>
                    Score: {calculateTotalScore()}
                </Text>
                <p style={{ fontSize: '18px', color: '#555' }}>
                    Remaining Plays: {me?.game_info.remaining_play || 0}
                </p>
            </div>

            <Button
                type="primary"
                size="large"
                onClick={handleGameClick}
                style={{
                    ...buttonStyle,
                    border: 'none',
                    fontSize: '20px',
                    marginBottom: '20px',
                }}
                disabled={+(me?.game_info?.remaining_play || 0) <= 0}
            >
                Play Game
            </Button>

            <Space style={{ marginBottom: '20px' }}>
                <Button
                    style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #e0e0e0',
                        color: '#333',
                        fontSize: '18px',
                    }}
                    onClick={() => openPage('invite')}
                >
                    Invite Friend
                </Button>
                <Button
                    onClick={handleCopyClick}
                    aria-label="Copy Invite Link"
                    icon={
                        <img
                            style={{ width: '35px', height: '20px' }}
                            src="/images/copy.svg"
                            alt="Copy"
                        />
                    }
                    style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #e0e0e0',
                        color: '#333',
                    }}
                />
            </Space>

            <Row style={{ width: '100%', marginTop: '60px' }}>
                <Col span={8}>
                    <Button
                        style={buttonStyle}
                        onClick={() => openPage('referral')}
                    >
                        Referral
                    </Button>
                </Col>
                <Col span={8}>
                    <Button
                        style={buttonStyle}
                        onClick={() => openPage('task')}
                    >
                        Tasks
                    </Button>
                </Col>
                <Col span={8}>
                    <Button
                        style={buttonStyle}
                        onClick={() => openPage('history')}
                    >
                        History
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
