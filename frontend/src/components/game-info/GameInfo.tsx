import React from 'react';
import './GameInfo.css';

interface GameInfoProps {
    timeLeft: number;
    score: number;
    attempts: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ timeLeft, score, attempts }) => {
    return (
        <div className="game-info">
            <div className="info-item">
                <p>
                    ⏳ <strong>{timeLeft}s</strong>
                </p>
            </div>
            <div className="info-item">
                <p>
                    🏆 <strong>{score}</strong>
                </p>
            </div>
            <div className="info-item">
                <p>
                    🎯 <strong>{attempts}</strong>
                </p>
            </div>
        </div>
    );
};

export default GameInfo;
