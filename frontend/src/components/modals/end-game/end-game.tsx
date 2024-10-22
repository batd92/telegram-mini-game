import React from 'react';
import '../end-game/end-game.css';

interface ModalProps {
    isOpen: boolean;
    attempts: number;
    score: number;
    onPlayAgain: () => void;
    onBackToHome: () => void;
}

const ModalEndGame: React.FC<ModalProps> = ({ isOpen, attempts, score, onPlayAgain, onBackToHome }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">🎉 Game Over 🎉</h2>
                <div className="modal-stats">
                    <div className="stat">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2Wz08TQRTHe+CvqImkUQwH2//BLQdqjAcT7179C4xGgp6MQQwnMIIXA40IsYgXLrQlEaioeBIT4sG0BqupRsvusj9m95nXdn/QMMPaztYNmW/y0u7sN2/eZ/fN7MRiQkJCQpFVLv96K7e6XuLpDSMnVUv5dcDg6Q0jJ1UCoNdvQFseHNUWBoj+bAAwnATONSvavZhHezk4kpqpj56ZqpPE5D5gOD7nOsGIdi/mST2RR+gAvuK7BWhAPD9H/MV3C5CY3IezU3VCBTg0+XTcTYD/WcWzvP7JT4//cH3949+ZxbO8gQCUO31uAuVuHxOA5fVPHL+54/rit3aYACxvYIDC0jQUco8DAdC87UVN5Dbh4YtSIIAJijdwC2FhWJA2c+rYFqJ5/RNjK2BhWNBxLdTP8AYC4BVBFmviH+PkApjFJPAOaU7hHjEBUBRvAP5rC5F3V8GqPAXQa12tgYvzCmQ/GlCVbTAtaPzidWY+DIANCazPD8CWd8GvTgGGsgp8qBI4SjiO97kCgG0dOVmnAPc3dTfH17oNi59MqKm2O4b3+QK0ZKtfuABs7XlP//rKQWPs9prmjr3dI3wBsH3Im0uHYLoB+HXQfNo6AUi3xi4vqG5evB/aIuYBQFrdUlO9QhHEzWtBtAEc1XwA/nGUADBFCyWpbfBbay4CxfBa6MqiSm2tyK2B99+8bfTaq+Y2eiPvbaO4zUYaYKzkfch2f1rwaNuA8h/vY3lvQ482AOsosV0lkOZ9lOAN0PvDXLGzYBUidRgCwBRvQAmnhYzi+QrP/jcKybI0J1d49v+FWbnMWgMZnJRX8WYhNSzNyhmclFfx6aw8TAUQEhISivVafwEGOOB4bHiSLAAAAABJRU5ErkJggg=="/>
                        <div className="stat-info">
                            <span className="stat-value">{score}</span>
                        </div>
                    </div>
                    <div className="stat">
                        <img src="data:image/png;base64,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"/>
                        <div className="stat-info">
                            <span className="stat-value">{attempts}</span>
                        </div>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button onClick={onBackToHome} className="modal-button home-button">
                        🏠 Home
                    </button>
                    <button onClick={onPlayAgain} className="modal-button play-again-button">
                        🔄 Play Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEndGame;
