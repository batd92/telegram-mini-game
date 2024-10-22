import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Avatar, Space, Row, Col } from 'antd';

const { Title } = Typography;

const Home: React.FC = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            setTimeout(() => {
                const fakeData = {
                    userName: 'John Doe',
                };
                setUserName(fakeData.userName);
            }, 1000);
        };

        fetchUserData();
    }, []);

    const handleGameClick = () => {
        navigate('/game');
    };

    const handleCopyClick = () => {
        const urlToCopy = "https://example.com/invite";
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    function openPage(page: string) {
        switch (page) {
            case 'history':
                navigate('/history');
                break;
            case 'task':
                navigate('/task');
                break;
            case 'leaderboard':
                navigate('/leaderboard');
                break;
            default:
                break;
        }
    }

    return (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f9f9f9', minHeight: '100vh', paddingTop: '150px' }}>
            <Avatar
                size={250}
                src="/images/bg.png"
                alt="User Avatar"
                style={{ margin: '20px auto', border: '2px solid #f0f0f0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
            <Title level={1} style={{ fontWeight: 'bold', color: '#333' }}>APT-92</Title>
            <Button
                type="primary"
                size="large"
                onClick={handleGameClick}
                style={{
                    width: '100%',
                    background: '#007aff',
                    border: 'none',
                    color: '#fff',
                    fontSize: '20px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                }}
            >
                Play Game
            </Button>
            <Space>
                <Button
                    style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #e0e0e0',
                        color: '#333',
                        fontSize: '18px',
                    }}
                >
                    Invite Friend
                </Button>
                <Button
                    onClick={handleCopyClick}
                    icon={<img style={{ width: '35px', height: '20px' }} src="/images/copy.svg" alt="Copy" />}
                    style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #e0e0e0',
                        color: '#333',
                    }}
                >
                </Button>
            </Space>

            <Row style={{ width: '100%', marginTop: '60px' }}>
                <Col span={8}>
                    <Button
                        style={{
                            width: '100%',
                            background: '#007aff',
                            color: '#fff',
                            marginBottom: '10px',
                            borderRadius: '10px',
                        }}
                        onClick={() => openPage('leaderboard')}
                    >
                        Leaderboard
                    </Button>
                </Col>
                <Col span={8}>
                    <Button
                        style={{
                            width: '100%',
                            background: '#007aff',
                            color: '#fff',
                            marginBottom: '10px',
                            borderRadius: '10px',
                        }}
                        onClick={() => openPage('task')}
                    >
                        Tasks
                    </Button>
                </Col>
                <Col span={8}>
                    <Button
                        style={{
                            width: '100%',
                            background: '#007aff',
                            color: '#fff',
                            marginBottom: '10px',
                            borderRadius: '10px',
                        }}
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
