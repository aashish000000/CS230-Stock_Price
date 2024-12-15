const API_KEY = 'EIOXG8H4DHVMLR5J';

export async function fetchStockQuote(symbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        const data = await response.json();
        console.log(data)
        return data['Global Quote'];
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        throw error;
    }
}

export async function fetchStockTimeSeries(symbol, timeframe) {
    const functions = {
        '1D': 'TIME_SERIES_INTRADAY',
        '1W': 'TIME_SERIES_DAILY',
        '1M': 'TIME_SERIES_DAILY',
        '1Y': 'TIME_SERIES_WEEKLY'
    };

    const intervals = {
        '1D': '5min',
        '1W': null,
        '1M': null,
        '1Y': null
    };

    try {
        let url = `https://www.alphavantage.co/query?function=${functions[timeframe]}&symbol=${symbol}`;
        
        if (intervals[timeframe]) {
            url += `&interval=${intervals[timeframe]}`;
        }
        
        url += `&apikey=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching time series:', error);
        throw error;
    }
}