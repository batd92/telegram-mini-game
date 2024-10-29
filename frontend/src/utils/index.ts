
export const getClientCoordinates = (
    e: MouseEvent | TouchEvent
) => {
    let clientX = 0;
    let clientY = 0;

    if ('changedTouches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
    } else if ('clientX' in e && 'clientY' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    return { clientX, clientY };
};


export const formatDateTime = (dateTime: string) => {
    try {
        const date = new Date(dateTime);
        return date.toISOString().replace('T', ' ').slice(0, 19).replace(/-/g, '/');
    } catch {
        return '';
    }
}