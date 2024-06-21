document.addEventListener('DOMContentLoaded', (event) => {
    // Menu Chart
    const menuCtx = document.getElementById('menuChart').getContext('2d');
    const menuChart = new Chart(menuCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [325, 75],
                backgroundColor: ['#FF6384', '#EEEEEE'],
                borderWidth: 1
            }]
        },
        options: {
            cutoutPercentage: 80,
            rotation: -Math.PI / 2,
            tooltips: { enabled: false },
            hover: { mode: null },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [425, 75],
                backgroundColor: ['#36A2EB', '#EEEEEE'],
                borderWidth: 1
            }]
        },
        options: {
            cutoutPercentage: 80,
            rotation: -Math.PI / 2,
            tooltips: { enabled: false },
            hover: { mode: null },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });

    // Orders Chart
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    const ordersChart = new Chart(ordersCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [415, 85],
                backgroundColor: ['#FFCE56', '#EEEEEE'],
                borderWidth: 1
            }]
        },
        options: {
            cutoutPercentage: 80,
            rotation: -Math.PI / 2,
            tooltips: { enabled: false },
            hover: { mode: null },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });

    // Customers Chart
    const customersCtx = document.getElementById('customersChart').getContext('2d');
    const customersChart = new Chart(customersCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [985, 15],
                backgroundColor: ['#4BC0C0', '#EEEEEE'],
                borderWidth: 1
            }]
        },
        options: {
            cutoutPercentage: 80,
            rotation: -Math.PI / 2,
            tooltips: { enabled: false },
            hover: { mode: null },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });

    // Daily Revenue Chart
    const dailyRevenueCtx = document.getElementById('dailyRevenueChart').getContext('2d');
    const dailyRevenueChart = new Chart(dailyRevenueCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Daily Revenue',
                data: [120, 150, 180, 200, 170, 190, 220],
                fill: true,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#36A2EB',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#36A2EB'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return '$' + tooltipItem.yLabel + 'K';
                    }
                }
            }
        }
    });
});
