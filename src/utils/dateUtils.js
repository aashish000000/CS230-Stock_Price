export function formatDate(dateString, timeframe) {
    const date = new Date(dateString);
    
    if (timeframe === '1D') {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export function getDateRange(timeframe) {
    const end = new Date();
    const start = new Date();

    switch (timeframe) {
        case '1D':
            start.setDate(start.getDate() - 1);
            break;
        case '1W':
            start.setDate(start.getDate() - 7);
            break;
        case '1M':
            start.setMonth(start.getMonth() - 1);
            break;
        case '1Y':
            start.setFullYear(start.getFullYear() - 1);
            break;
    }

    return { start, end };
}