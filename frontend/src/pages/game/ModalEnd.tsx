import React from 'react';
import { Modal, Button } from 'antd';

interface ModalProps {
    isOpen: boolean;
    attempts: number;
    onPlayAgain: () => void;
    onBackToHome: () => void;
}

const ModalEnd: React.FC<ModalProps> = ({
    isOpen,
    attempts,
    onPlayAgain,
    onBackToHome,
}) => {
    return (
        <Modal
            open={isOpen}
            title="🎉 Game Over 🎉"
            onCancel={onBackToHome}
            footer={null}
            centered
            closable={false}
            style={{ textAlign: 'center' }}
            width={300}
        >
            <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button
                    onClick={onBackToHome}
                    className="modal-button"
                    type="primary"
                    style={{ flex: 1, marginRight: '5px' }}
                >
                    Home
                </Button>
                <Button
                    onClick={onPlayAgain}
                    className="modal-button"
                    type="primary"
                    style={{ flex: 1, marginLeft: '5px' }}
                    disabled={attempts <= 0}
                >
                    Play Again
                </Button>
            </div>
            <div className="attempts-info" style={{ textAlign: 'center', marginTop: '10px' }}>
                {attempts > 0 ? `You have ${attempts} attempts left to play again!` : "No attempts left!"}
            </div>
        </Modal>
    );
};

export default ModalEnd;
