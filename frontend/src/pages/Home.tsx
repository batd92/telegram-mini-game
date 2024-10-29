import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Avatar, Space, Row, Col } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const BOT_BASE_URL = 'https://t.me/Binance_Moonbix_bot/start?startApp=ref_89898989';

const Home: React.FC = () => {
    const { me } = useAuth();
    const navigate = useNavigate();
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const calculateTotalScore = () => {
            if (me) {
                return me.analytics.task_score + me.analytics.game_score + me.analytics.referral_score;
            }
            return 0;
        };

        setTotalScore(calculateTotalScore());
    }, [me, navigate]);

    const handleGameClick = () => {
        navigate('/game');
    };

    const handleCopyClick = () => {
        const urlToCopy = BOT_BASE_URL + me?._id.toString();
        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => { })
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
        borderRadius: '8px',
        fontSize: '18px',
    };

    const buttonSecondaryStyle = {
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        color: '#333',
        marginBottom: '10px',
        fontSize: '18px',
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f9f9f9',
            minHeight: '92vh',
            paddingTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <div>
                <Avatar
                    size={300}
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
                        Score: {totalScore} {/* Use totalScore state */}
                    </Text>
                    <p style={{ fontSize: '18px', color: '#555' }}>
                        Remaining Plays: {me?.game_info.remaining_play || 0}
                    </p>
                </div>

                <Button
                    type="primary"
                    size="large"
                    onClick={handleGameClick}
                    style={buttonStyle}
                    disabled={+(me?.game_info?.remaining_play || 0) <= 0}
                >
                    Play Game
                </Button>

                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button
                            style={{ ...buttonSecondaryStyle, flex: '0 0 80%', height: '40px' }}
                            onClick={() => openPage('invite')}
                        >
                            Invite Friend
                        </Button>
                        <Button
                            onClick={handleCopyClick}
                            aria-label="Copy Invite Link"
                            icon={
                                <img
                                    style={{ width: '25px', height: '25px' }}
                                    src="/images/copy.svg"
                                    alt="Copy"
                                />
                            }
                            style={{ ...buttonSecondaryStyle, flex: '0 0 15%', marginLeft: '10px', height: '40px' }}
                        >
                        </Button>
                    </div>
                </Space>
            </div>

            <Row style={{ width: '100%', marginTop: '20px', justifyContent: 'space-between' }}>
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
