import React, { useState, useEffect } from 'react';
import { List, Button, Card } from 'antd';
import { fetchReferral } from '../services/apiService';
import Breadcrumbs from '../components/Breadcrumb';
import { IReferred } from '../interfaces/IReferred';

const Referral: React.FC = () => {
    const [referrals, setReferrals] = useState<IReferred[]>([]);

    useEffect(() => {
        const loadReferrals = async () => {
            const response = await fetchReferral();
            setReferrals(response);
        };

        loadReferrals();
    }, []);

    return (
        <div style={{ padding: '20px', background: '#F0F4F8', minHeight: '100vh' }}>
            <Breadcrumbs items={[
                { label: 'Home', path: '/home' },
                { label: 'Referral' }
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
                    dataSource={referrals}
                    renderItem={(referral) => (
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
                                        {referral.user_name}
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
                                        {'+' + 100}
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

export default Referral;
