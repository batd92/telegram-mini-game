import React from 'react';

const Footer: React.FC = () => {
    const phrases = ["Binance", "OKX", "MXC", "Bybit"];
    const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#1D84B5"];

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                zIndex: 10,
                padding: '10px 0',
                borderRadius: '12px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    animation: 'scroll 20s linear infinite',
                    paddingLeft: '100%',
                }}
            >
                {phrases.map((phrase, index) => (
                    <span
                        key={index}
                        style={{
                            display: 'inline-block',
                            margin: '0 20px',
                            padding: '8px 16px',
                            backgroundColor: colors[index % colors.length],
                            borderRadius: '8px',
                            fontSize: '16px',
                            color: '#333333',
                            fontWeight: '500',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        {phrase}
                    </span>
                ))}
            </div>

            <style>
                {`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-100%); }
                    }
                `}
            </style>
        </div>
    );
};

export default Footer;
