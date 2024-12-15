import { fetchStockQuote, fetchStockTimeSeries } from './api/stockApi.js';
import { createStockDisplay } from './components/stockDisplay.js';
import { createStockChart } from './components/stockChart.js';
import { createTimeframeSelector } from './components/timeframeSelector.js';
import { formatDate, getDateRange } from './utils/dateUtils.js';

const stockSymbolInput = document.getElementById('stockSymbol');
const searchButton = document.getElementById('searchButton');
const stockDataContainer = document.getElementById('stockData');
const timeframeContainer = document.getElementById('timeframeContainer');
const chartCanvas = document.getElementById('stockChart');

let currentSymbol = 'IBM';
let currentTimeframe = '1D';

async function processTimeSeriesData(data, timeframe) {
    const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));
    if (!timeSeriesKey || !data[timeSeriesKey]) {
        throw new Error('Invalid time series data');
    }

    const timeSeriesData = data[timeSeriesKey];
    const entries = Object.entries(timeSeriesData);
    const { start, end } = getDateRange(timeframe);

    const filteredData = entries.filter(([date]) => {
        const timestamp = new Date(date).getTime();
        return timestamp >= start.getTime() && timestamp <= end.getTime();
    });

    const labels = filteredData.map(([date]) => formatDate(date, timeframe));
    const prices = filteredData.map(([, values]) => parseFloat(values['4. close']));

    return { labels: labels.reverse(), prices: prices.reverse() };
}

async function updateChartData() {
    try {
        const data = await fetchStockTimeSeries(currentSymbol, currentTimeframe);
        const processedData = await processTimeSeriesData(data, currentTimeframe);
        createStockChart(chartCanvas, processedData, currentTimeframe);
    } catch (error) {
        console.error('Error updating chart:', error);
    }
}

async function updateStockData() {
    currentSymbol = stockSymbolInput.value.toUpperCase();
    
    try {
        stockDataContainer.innerHTML = 'Loading...';
        const quoteData = await fetchStockQuote(currentSymbol);
        
        if (quoteData) {
            stockDataContainer.innerHTML = createStockDisplay(quoteData);
            await updateChartData();
        } else {
            stockDataContainer.innerHTML = '<div class="error">No data found for the specified symbol</div>';
        }
    } catch (error) {
        stockDataContainer.innerHTML = '<div class="error">Error fetching stock data</div>';
    }
}

function initializeTimeframeSelector() {
    timeframeContainer.innerHTML = createTimeframeSelector();
    
    timeframeContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('timeframe-btn')) {
            const buttons = timeframeContainer.querySelectorAll('.timeframe-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            currentTimeframe = e.target.dataset.timeframe;
            await updateChartData();
        }
    });
}

searchButton.addEventListener('click', updateStockData);
stockSymbolInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateStockData();
    }
});

// Initialize the application
initializeTimeframeSelector();
updateStockData();