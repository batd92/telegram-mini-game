import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Card } from 'antd';
import { fetchTasks, updateTaskHistory } from '../services/apiService';
import { ITask } from '../interfaces/ITask';
import Breadcrumbs from '../components/Breadcrumb';

const Task: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetchTasks();
                setTasks(response);
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        loadTasks();
    }, []);

    const handleOpenTask = async (task: ITask) => {
        window.open(task.link, '_blank');
        await updateTaskHistory({ task_id: task._id, data: '' });
    };

    return (
        <div style={{ padding: '20px', background: '#F0F4F8', minHeight: '100vh' }}>
            <Breadcrumbs items={[
                { label: 'Home', path: '/home' },
                { label: 'List Task' }
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
                    dataSource={tasks}
                    renderItem={(task) => (
                        <List.Item>
                            <Card
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid #E7E7E7',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    width: '100%',
                                    background: task.history ? '#E7F9E5' : '#ffffff',
                                }}
                                hoverable
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 500 }}>
                                        {task.title}
                                    </span>
                                    <Button
                                        type="primary"
                                        onClick={() => handleOpenTask(task)}
                                        style={{
                                            borderRadius: '4px',
                                            background: '#FF6F61',
                                            borderColor: '#FF6F61',
                                            color: '#ffffff',
                                            fontWeight: 'bold',
                                        }}
                                        disabled={!!task.history}
                                    >
                                        {'+' + (task.score || 0)}
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

export default Task;
