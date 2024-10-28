import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import ControlPanel from './ControlPanel';
import ModalEnd from './ModalEnd';
import { useAuth } from '../../contexts/AuthContext';
import { addGameHistory } from '../../services/apiService';
import { Face } from '../../game/Face';

const GAME_DURATION = 5;
const INITIAL_ATTEMPTS = 3;

const GameTab: React.FC = () => {
    const { me, setMe } = useAuth();
    const navigate = useNavigate();

    const [gameState, setGameState] = useState({
        isSoundOn: true,
        timeLeft: me?.game_info.duration || GAME_DURATION,
        score: me?.analytics.game_score || 0,
        attempts: me?.game_info.number_of_attempts || INITIAL_ATTEMPTS,
        isGameRunning: true,
        isModalOpen: false,
    });

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            scene: {
                preload,
                create,
                update,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: false,
                },
            },
        };

        const game = new Phaser.Game(config);

        function preload(this: Phaser.Scene) {
            this.load.image('coin', 'images/coin.svg');
            this.load.image('shiba', 'images/shiba.svg');
            this.load.audio('clickSound', '/sounds/coin-donation-2-180438.mp3');
        }

        function create(this: Phaser.Scene) {
            this.cameras.main.setBackgroundColor('#2c2c2c');
            const face = new Face(this, window.innerWidth / 2, window.innerHeight / 2);
            const clickSound = this.sound.add('clickSound');

            face.on('pointerdown', () => {
                setGameState((prev) => ({ ...prev, score: prev.score + 1 }));

                if (gameState.isSoundOn) {
                    clickSound.play();
                }
            });

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (gameState.isGameRunning) {
                        setGameState((prev) => {
                            const newTimeLeft = prev.timeLeft - 1;
                            if (newTimeLeft <= 0) {
                                return { ...prev, isGameRunning: false, isModalOpen: true, timeLeft: 0 };
                            }
                            return { ...prev, timeLeft: newTimeLeft };
                        });
                    }
                },
                repeat: GAME_DURATION,
            });
        }

        function update(this: Phaser.Scene) {
            
        }

        return () => {
            game.destroy(true);
        };
    }, [gameState.isGameRunning, gameState.isSoundOn]);

    const handlePlayAgain = useCallback(() => {
        if (gameState.attempts >= 1) {
            setGameState((prev) => ({ ...prev, attempts: prev.attempts - 1, timeLeft: GAME_DURATION, score: gameState.score, isGameRunning: true, isModalOpen: false }));
        } else {
            navigate('/');
        }
    }, [gameState.attempts, navigate]);

    const handleBackToHome = useCallback(() => {
        if (!gameState.isGameRunning) {
            navigate('/');
        }
    }, [gameState.isGameRunning, navigate]);

    const handleSoundToggle = (isSoundOn: boolean) => {
        setGameState((prev) => ({ ...prev, isSoundOn }));
    };

    useEffect(() => {
        const loadData = async () => {
            if (!gameState.isGameRunning && me) {
                const response = await addGameHistory({
                    score: gameState.score,
                });

                if (response) {
                    const updatedMe = {
                        ...me,
                        analytics: {
                            ...me.analytics,
                            game_score: me.analytics.game_score + gameState.score,
                        },
                        game_info: {
                            ...me.game_info,
                            number_of_attempts: response.number_of_attempts,
                            remaining_play: response.remaining_play,
                        },
                    };
                    setMe(updatedMe);
                }
            }
        };
        loadData();
    }, [gameState.isGameRunning]);

    return (
        <div className="game-container">
            <ControlPanel
                handleBackToHome={handleBackToHome}
                initialSoundState={gameState.isSoundOn}
                onSoundToggle={handleSoundToggle}
                score={gameState.score}
                timeLeft={gameState.timeLeft}
            />
            <ModalEnd
                isOpen={gameState.isModalOpen}
                onPlayAgain={handlePlayAgain}
                onBackToHome={handleBackToHome}
                attempts={gameState.attempts}
            />
        </div>
    );
};

export default GameTab;
