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

    const handlePlayAgain = (event: React.MouseEvent) => {
        event.stopPropagation();
        onPlayAgain();
    };

    const handleBackToHome = (event: React.MouseEvent) => {
        event.stopPropagation();
        onBackToHome();
    };

    return (
        <Modal
            open={isOpen}
            title={<span style={{ fontSize: '1.4rem', fontWeight: '600' }}>🎉 Game Over 🎉</span>}
            onCancel={onBackToHome}
            footer={null}
            centered
            closable={false}
            className="apple-modal"
            width={320}
        >
            <div className="modal-content">
                <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>
                    {attempts > 0 ? `You have ${attempts} attempts left to play again!` : "No attempts left!"}
                </p>

                <div className="button-group">
                    <Button
                        onClick={handleBackToHome}
                        type="default"
                        className="apple-button"
                    >
                        Home
                    </Button>
                    <Button
                        onClick={handlePlayAgain}
                        type="default"
                        className="apple-button play-again"
                        disabled={attempts <= 0}
                    >
                        Play Again
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalEnd;