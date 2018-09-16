window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var CATEGORIES = ['Social Networking', 'Shopping', 'News', 'Education', 'Technology', 'Sports', 'Finance', 'Other'];
var SENTIMENTS = ['Extremely Happy', 'Very Happy', 'Happy', 'Moderately Happy', 'A Little Happy', 'Neutral', 'A Little Sad', 'Moderately Sad', 'Sad', 'Very Sad', 'Extremely Sad'];
var color = Chart.helpers.color;
var data = [-40, 50, 60, 20, -50, -80, 90, 10];
var backgroundRed = color(window.chartColors.red).alpha(0.5).rgbString();
var backgroundBlue = color(window.chartColors.blue).alpha(0.5).rgbString();
var borderRed = window.chartColors.red;
var borderBlue = window.chartColors.blue;
var barChartData = {
    labels: ['Social Networking', 'Shopping', 'News', 'Education', 'Technology', 'Sports', 'Finance', 'Other'],
    datasets: [{
        label: 'Sentiment',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        data
    }]
};

for (value in data) {
    console.log(data[value])
    var backgroundColor = data[value] > 0 ? backgroundBlue : backgroundRed
    var borderColor = data[value] > 0 ? borderBlue : borderRed
    barChartData.datasets[0].backgroundColor.push(backgroundColor)
    barChartData.datasets[0].borderColor.push(borderColor)
}


window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sentiment Bar Chart'
            }
        }
    });

};

document.getElementById('randomizeData').addEventListener('click', function() {
    var zero = Math.random() < 0.2 ? true : false;
    var scalingFactor = randomScalingFactor()
    barChartData.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return zero ? 0.0 : scalingFactor;
        });
    });

    barChartData.datasets.forEach(function(dataset) {
        dataset.backgroundColor = dataset.backgroundColor.map(function() {
            return color ? color(window.chartColors.blue).alpha(0.5).rgbString() : color(window.chartColors.red).alpha(0.5).rgbString();
        });
    });
    window.myBar.update();
});
