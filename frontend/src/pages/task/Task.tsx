import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Typography, Space } from 'antd';

const { Title } = Typography;

const Task: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<{ id: number; title: string; }[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fakeTasks = [
                { id: 1, title: 'Task 1' },
                { id: 2, title: 'Task 2' },
                { id: 3, title: 'Task 3' },
                { id: 4, title: 'Task 4' },
                { id: 5, title: 'Task 5' },
                { id: 6, title: 'Task 6' },
                { id: 7, title: 'Task 7' },
                { id: 8, title: 'Task 8' },
                { id: 9, title: 'Task 9' },
                { id: 10, title: 'Task 10' },
                { id: 11, title: 'Task 11' },
                { id: 12, title: 'Task 12' },
                { id: 13, title: 'Task 13' },
                { id: 14, title: 'Task 14' },
                { id: 15, title: 'Task 15' },
            ];
            setTasks(fakeTasks);
        };

        fetchTasks();
    }, []);

    const handleButtonClick = (id: number) => {
        navigate(`/task/${id}`);
    };

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
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Task List</Title>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <List
                    bordered
                    dataSource={tasks}
                    renderItem={task => (
                        <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', color: '#555' }}>{task.title}</span>
                            <Button type="primary" onClick={() => handleButtonClick(task.id)}>
                                Open Task
                            </Button>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default Task;
