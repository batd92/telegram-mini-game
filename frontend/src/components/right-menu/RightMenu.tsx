import React from 'react';
import './RightMenu.css';

interface RightMenuProps {
    handleBackToHome: () => void;
    disabled: boolean;
    toggleSound: () => void;
    isSoundOn: boolean;
}

const RightMenu: React.FC<RightMenuProps> = ({
    handleBackToHome,
    toggleSound,
    isSoundOn,
}) => {
    return (
        <div className="right-menu">
            <div className="menu-item">
                <p>
                    <button className="sound-toggle" onClick={toggleSound}>
                        <strong>{isSoundOn ? '🔊' : '🔇'}</strong>
                    </button>
                </p>
            </div>
            <div className="menu-item">
                <p>
                    <button className="home" onClick={handleBackToHome}>
                        <strong>🏠</strong>
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RightMenu;
