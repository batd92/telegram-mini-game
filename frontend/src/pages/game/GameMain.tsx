import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle } from '../../game/Circle';
import ControlPanel from './ControlPanel';
import ModalEnd from './ModalEnd';
import { Coin } from '../../game/Coin';
import { getClientCoordinates } from '../../utils';
import { useAuth } from '../../contexts/AuthContext';
import { addGameHistory } from '../../services/apiService';

const GAME_DURATION = 5;
const INITIAL_ATTEMPTS = 3;
const NUM_COINS = 5;

interface GameState {
    isSoundOn: boolean;
    timeLeft: number;
    score: number;
    attempts: number;
    isGameRunning: boolean;
    isModalOpen: boolean;
}

const GameMain: React.FC = () => {
    const { me, setMe } = useAuth();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const navigate = useNavigate();

    const [gameState, setGameState] = useState<GameState>({
        isSoundOn: true,
        timeLeft: me?.game_info.duration || GAME_DURATION,
        score: 0,
        attempts: me?.game_info.number_of_attempts || INITIAL_ATTEMPTS,
        isGameRunning: true,
        isModalOpen: false,
    });
    const [coins, setCoins] = useState<Coin[]>([]);
    const CircleRef = useRef<Circle | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const updateGameState = (newState: Partial<GameState>) => {
        setGameState((prev) => ({ ...prev, ...newState }));
    };

    const handleSoundToggle = (isSoundOn: boolean) => {
        updateGameState({ isSoundOn });
    };

    const setCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (CircleRef.current) {
            CircleRef.current.c.width = canvas.width;
            CircleRef.current.c.height = canvas.height;
            CircleRef.current.x = canvas.width / 2;
            CircleRef.current.y = canvas.height / 2;
        }
    }, []);

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
        
        if (CircleRef.current) {
            CircleRef.current.y = canvas.width / 2;
            CircleRef.current.x = canvas.width / 2;
        }
    }, []);

    const handlePlayAgain = useCallback(() => {
        if (gameState.attempts > 1) {
            updateGameState({ attempts: gameState.attempts - 1 });
            resetGame();
            updateGameState({ timeLeft: GAME_DURATION, isGameRunning: true, isModalOpen: false });
        } else {
            navigate('/');
        }
    }, [gameState.attempts, resetGame, navigate]);

    const handleBackToHome = useCallback(() => {
        if (!gameState.isGameRunning) {
            navigate('/');
        }
    }, [gameState.isGameRunning, navigate]);

    // Timeout
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (gameState.isGameRunning) {
            timer = setInterval(() => {
                setGameState((prev) => {
                    const newTimeLeft = prev.timeLeft - 1;
                    if (newTimeLeft <= 0) {
                        return { ...prev, isGameRunning: false, isModalOpen: true, timeLeft: 0 };
                    }
                    return { ...prev, timeLeft: newTimeLeft };
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameState.isGameRunning]);

    // End game
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
    }, [gameState.timeLeft]);
    
    
    useEffect(() => {
        setCanvasSize();
        const handleResize = () => setCanvasSize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [setCanvasSize]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        CircleRef.current = new Circle(canvas);
        let animationFrameId: number;

        const gameLoop = () => {
            if (!gameState.isGameRunning) return;

            _drawBackground(context, canvas.height);
            _drawCircle(context);

            const updatedCoins = _updateAndDrawCoins(coins, context);
            setCoins(updatedCoins);

            animationFrameId = window.requestAnimationFrame(gameLoop);
        };

        animationFrameId = window.requestAnimationFrame(gameLoop);

        const handleClick = (e: MouseEvent) => handleClickEvent(e);

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [gameState.isGameRunning, coins]);

    const _drawBackground = (context: CanvasRenderingContext2D, canvasHeight: number) => {
        const gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, 'rgba(135, 206, 250, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, canvasHeight);
    };

    const _drawCircle = (context: CanvasRenderingContext2D) => {
        if (CircleRef.current) {
            context.save();
            context.translate(CircleRef.current.x, CircleRef.current.y);
            context.scale(1, 1);
            context.translate(-CircleRef.current.x, -CircleRef.current.y);
            CircleRef.current.draw(context);
            context.restore();
        }
    };

    const _updateAndDrawCoins = (coins: Coin[], context: CanvasRenderingContext2D) => {
        return coins.filter((coin) => {
            coin.update();
            if (coin.isAlive()) {
                coin.draw(context);
                return true;
            }
            return false;
        });
    };

    const _isCircleClicked = (clientX: number, clientY: number): boolean => {
        if (!CircleRef.current) return false;
        const dx = clientX - CircleRef.current.x;
        const dy = clientY - CircleRef.current.y;
        return Math.sqrt(dx * dx + dy * dy) < CircleRef.current.r;
    };

    const _generateCoins = (numCoins: number): Coin[] => {
        const newCoins: Coin[] = [];
        if (!CircleRef.current) return newCoins;

        for (let i = 0; i < numCoins; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50;
            const coinX = CircleRef.current.x + Math.cos(angle) * distance;
            const coinY = CircleRef.current.y + Math.sin(angle) * distance;
            newCoins.push(new Coin(coinX, coinY));
        }

        return newCoins;
    };

    const handleClickEvent = (e: MouseEvent) => {
        if (!CircleRef.current) return;
        const { clientX, clientY } = getClientCoordinates(e);

        if (_isCircleClicked(clientX, clientY)) {
            CircleRef.current.addScore(1);
            updateGameState({ score: gameState.score + 1 });

            const coins = _generateCoins(NUM_COINS);
            setCoins((prevCoins) => [...prevCoins, ...coins]);

            if (gameState.isSoundOn && audioRef.current) {
                audioRef.current.play().catch((err) => {
                    console.error('Error playing click sound:', err);
                });
            }
        }
    };

    return (
        <div className="game-container">
            <canvas ref={canvasRef} tabIndex={-1} />
            <audio ref={audioRef} src="/sounds/coin-donation-2-180438.mp3" />
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

export default GameMain;
