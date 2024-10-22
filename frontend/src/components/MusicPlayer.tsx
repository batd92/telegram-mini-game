import React, { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
    isSoundOn: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isSoundOn }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isSoundOn) {
                audio.play().catch((err: any) => {
                    console.error('Error playing audio:', err);
                });
            } else {
                audio.pause();
            }
        }
    }, [isSoundOn]);

    return (
        <audio
            ref={audioRef}
            src="/sounds/BASXHKZIR_-_BASXHKZIR_-_Only_Alone.mp3"
            loop
        />
    );
};

export default MusicPlayer;
