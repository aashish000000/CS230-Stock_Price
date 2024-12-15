import Chart from 'chart.js/auto';

let chart = null;

export function createStockChart(container, data, timeframe) {
    if (chart) {
        chart.destroy();
    }

    const ctx = container.getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Stock Price',
                data: data.prices,
                borderColor: '#646cff',
                backgroundColor: 'rgba(100, 108, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        callback: value => `$${value.toFixed(2)}`
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${timeframe} Price History`
                },
                tooltip: {
                    callbacks: {
                        label: context => `$${context.parsed.y.toFixed(2)}`
                    }
                }
            }
        }
    });

    return chart;
}