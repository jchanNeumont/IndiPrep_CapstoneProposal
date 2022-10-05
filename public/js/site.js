const ctx = document.getElementById('myChart1').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');

const url = "http://localhost:4000/api/getGameChartData";

fetch("http://localhost:3000/api/getGameChartData")
    .then(r => r.json())
    .then(data => {
        console.log(data);
        setupChart(data.labels, data.data);
    });

fetch("http://localhost:3000/api/getGameChartData2")
    .then(r => r.json())
    .then(data => {
        console.log(data);
        setupChart2(data.labels, data.data);
    });

fetch("http://localhost:3000/api/getGameChartData3")
    .then(r => r.json())
    .then(data => {
        console.log(data);
        setupChart3(data.labels, data.data);
    });

function setupChart(labels, data){
    console.log(data);
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: [data["Q1A1Count"], data["Q1A2Count"], data["Q1A3Count"]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: false
        }
    });
}

function setupChart2(labels, data){
    console.log(data);
    const myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: [data["Q2A1Count"], data["Q2A2Count"], data["Q2A3Count"]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: false
        }
    });
}

function setupChart3(labels, data){
    console.log(data);
    const myChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: [data["Q3A1Count"], data["Q3A2Count"], data["Q3A3Count"]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: false
        }
    });
}