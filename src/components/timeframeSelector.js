export function createTimeframeSelector() {
    return `
        <div class="timeframe-selector">
            <button class="timeframe-btn active" data-timeframe="1D">1D</button>
            <button class="timeframe-btn" data-timeframe="1W">1W</button>
            <button class="timeframe-btn" data-timeframe="1M">1M</button>
            <button class="timeframe-btn" data-timeframe="1Y">1Y</button>
        </div>
    `;
}