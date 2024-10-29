import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import ControlPanel from './ControlPanel';
import ModalEnd from './ModalEnd';
import { useAuth } from '../../contexts/AuthContext';
import { addGameHistory } from '../../services/apiService';
import { Face } from '../../game/Face';
import Footer from './Footer';

const GameTab: React.FC = () => {
    const { me, setMe } = useAuth();
    const navigate = useNavigate();

    const [game_state, setGameState] = useState({
        isSoundOn: true,
        timeLeft: me?.game_info.duration || 0,
        score: me?.analytics.game_score || 0,
        remaining_play: me?.game_info.remaining_play || 0,
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

                if (game_state.isSoundOn && game_state.isGameRunning) {
                    clickSound.play();
                }
            });

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (game_state.isGameRunning) {
                        setGameState((prev) => {
                            const newTimeLeft = prev.timeLeft - 1;
                            if (newTimeLeft <= 0) {
                                return { ...prev, isGameRunning: false, isModalOpen: true, timeLeft: 0 };
                            }
                            return { ...prev, timeLeft: newTimeLeft };
                        });
                    }
                },
                repeat: me?.game_info.duration || 0,
            });
        }

        function update(this: Phaser.Scene) {
            
        }

        return () => {
            game.destroy(true);
        };
    }, [game_state.isGameRunning, game_state.isSoundOn]);

    const handlePlayAgain = useCallback(() => {
        if (game_state.remaining_play >= 1) {
            setGameState((prev) => ({ ...prev, attempts: prev.remaining_play - 1, timeLeft: (me?.game_info.duration || 0), score: game_state.score, isGameRunning: true, isModalOpen: false }));
        } else {
            navigate('/');
        }
    }, [game_state.remaining_play, navigate]);

    const handleBackToHome = useCallback(() => {
        if (!game_state.isGameRunning) {
            navigate('/');
        }
    }, [game_state.isGameRunning, navigate]);

    const handleSoundToggle = (isSoundOn: boolean) => {
        setGameState((prev) => ({ ...prev, isSoundOn }));
    };

    useEffect(() => {
        const loadData = async () => {
            if (!game_state.isGameRunning && me) {
                const response = await addGameHistory({
                    score: (game_state.score - me?.analytics.game_score),
                });

                if (response) {
                    const updatedMe = {
                        ...me,
                        analytics: {
                            ...me.analytics,
                            game_score: me.analytics.game_score + game_state.score,
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
    }, [game_state.isGameRunning]);

    return (
        <div className="game-container">
            <ControlPanel
                handleBackToHome={handleBackToHome}
                initialSoundState={game_state.isSoundOn}
                onSoundToggle={handleSoundToggle}
                score={game_state.score}
                timeLeft={game_state.timeLeft}
            />
            <ModalEnd
                isOpen={game_state.isModalOpen}
                onPlayAgain={handlePlayAgain}
                onBackToHome={handleBackToHome}
                remaining_play={game_state.remaining_play - 1}
            />
            <Footer></Footer>
        </div>
    );
};

export default GameTab;
