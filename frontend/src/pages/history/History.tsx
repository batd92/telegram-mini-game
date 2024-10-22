import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History: React.FC = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            setTimeout(() => {
                const fakeData = {
                    userName: 'John Doe',
                };
                setUserName(fakeData.userName);
            }, 1000);
        };

        fetchUserData();
    }, []);

    const handleGameClick = () => {
        navigate('/game');
    };

    const handleInviteClick = () => {
        console.log("Invite friends clicked");
    };

    const handleCopyClick = () => {
        const urlToCopy = "https://example.com/invite"; // Replace with your desired URL
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    const handleSocialMediaClick = () => {
        navigate('/social-media');
    };

    const handleLeaderboardClick = () => {
        navigate('/leaderboard');
    };

    const handleFriendsClick = () => {
        navigate('/friends');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    return (
        <div className="home-container">
            <div className="avatar-container">
                <img
                    src="/images/bg.png"
                    alt="User Avatar"
                    className="user-avatar"
                />
            </div>
            <div className="header">
                <h1 className="game-title">APT-92</h1>
            </div>
            <div className="action-buttons">
                <button className="primary-button" onClick={handleGameClick}>🎮 Play Game</button>
                <div className="invite-container">
                    <button className="secondary-button" onClick={handleInviteClick} disabled>
                        👫 Invite Friend
                    </button>
                    <button className="secondary-button copy-button" onClick={handleCopyClick}>
                        <img className="copy-svg" src="/images/copy.svg"/>
                    </button>
                </div>
            </div>
            <div className="footer">
                <div className="footer-box">
                    <button className="footer-button" onClick={handleLeaderboardClick}>Leaderboard</button>
                    <button className="footer-button" onClick={handleSocialMediaClick}>Tasks</button>
                    <button className="footer-button" onClick={handleFriendsClick}>Friends</button>
                </div>
            </div>
        </div>
    );
};

export default History;
