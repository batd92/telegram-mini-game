import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                maxWidth: '800px',
                padding: '10px',
                background: '#E0E7FF',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Breadcrumb
                items={items.map((item) => ({
                    title: item.path ? (
                        <Button
                            type="link"
                            onClick={() => item.path && navigate(item.path)}
                            style={{ color: '#4B79A1', fontWeight: 'bold', padding: 0 }}
                        >
                            {item.label}
                        </Button>
                    ) : (
                        item.label
                    ),
                }))}
            />
        </div>
    );
};

export default Breadcrumbs;
