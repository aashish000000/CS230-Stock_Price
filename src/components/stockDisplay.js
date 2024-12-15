export function createStockDisplay(data) {
    if (!data) return '<div class="error">No data available</div>';

    return `
        <div class="stock-info">
            <h2>${data['01. symbol']}</h2>
            <div class="price-container">
                <span class="price">$${parseFloat(data['05. price']).toFixed(2)}</span>
                <span class="change ${parseFloat(data['09. change']) >= 0 ? 'positive' : 'negative'}">
                    ${parseFloat(data['09. change']).toFixed(2)} (${parseFloat(data['10. change percent']).toFixed(2)}%)
                </span>
            </div>
            <div class="details">
                <div>Open: $${parseFloat(data['02. open']).toFixed(2)}</div>
                <div>High: $${parseFloat(data['03. high']).toFixed(2)}</div>
                <div>Low: $${parseFloat(data['04. low']).toFixed(2)}</div>
                <div>Volume: ${parseInt(data['06. volume']).toLocaleString()}</div>
            </div>
        </div>
    `;
}