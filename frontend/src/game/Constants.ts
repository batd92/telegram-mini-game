// Constants.ts

export const COLORS = {
    LINE_COLOR: (Math.random() * 130).toFixed(0) + ', ' + (Math.random() * 80).toFixed(0) + ', ' + (Math.random() * 256).toFixed(0),
    BALL_COLOR: (Math.random() * 130).toFixed(0) + ', ' + (Math.random() * 80).toFixed(0) + ', ' + (Math.random() * 256).toFixed(0),
    BACKGROUND_COLOR: 'hsla(252, 95%, 85%, 1)',
    TEXT_COLOR: 'hsla(213, 95%, 15%, 1)',
    SHADOW_COLOR: 'hsla(0,0%,0%,.3)',
};

export const LINE_SETTINGS = {
    MIN_LENGTH: 50,
    LINE_WIDTH: 10,
    SHADOW_BLUR: 55,
    SHADOW_OFFSET_X: 10,
    SHADOW_OFFSET_Y: 10,
};

export const BALL_SETTINGS = {
    GRAVITY: 980,
    FPS: 30,
};

export const PLANK_SETTINGS = {
    MAX_PLANKS: 10,
};

export const BALLS_SETTINGS = {
    MAX_BALLS: 100,
    NEXT_BALL_INTERVAL: 7,
};

export const CANVAS_SETTINGS = {
    FONT_SIZE_LARGE: "5em Poiret One",
    FONT_SIZE_MEDIUM: "2em Poiret One",
    TEXT: {
        TITLE: "Binance",
        SUBTITLE: "Drag To Draw Through Trail",
    },
};

export const GAME = {
    TIME_END: 20
};
