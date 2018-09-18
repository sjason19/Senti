window.onload = function() {
window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

chrome.storage.sync.get({categories: []}, function (result1) {
    console.log(result1.categories)


chrome.storage.sync.get({sentiments: []}, function (result2) {
    console.log(result2.sentiments)

    var categoryAndSentiment = [{'Social Networking': 0, 'Shopping': 0, 'News': 0, 'Education': 0, 'Technology': 0, 'Sports': 0, 'Finance': 0, 'Other': 0}];
    categories = result1.categories;
    sentiments = result2.sentiments;

    for (category in categories) {
        var test = categories[category];
        var val = sentiments[category];

        if (sentiments[category] != null) {
            if (categories[category]['category'] == 'Social Networking') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Social Networking'] = categoryAndSentiment[categorySentiment]['Social Networking'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Social Networking'] = categoryAndSentiment[categorySentiment]['Social Networking'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'Shopping') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Shopping'] = categoryAndSentiment[categorySentiment]['Shopping'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Shopping'] = categoryAndSentiment[categorySentiment]['Shopping'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'News') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['News'] = categoryAndSentiment[categorySentiment]['News'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['News'] = categoryAndSentiment[categorySentiment]['News'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'Education') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Education'] = categoryAndSentiment[categorySentiment]['Education'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Education'] = categoryAndSentiment[categorySentiment]['Education'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'Technology') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Technology'] = categoryAndSentiment[categorySentiment]['Technology'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Technology'] = categoryAndSentiment[categorySentiment]['Technology'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'Sports') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Sports'] = categoryAndSentiment[categorySentiment]['Sports'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Sports'] = categoryAndSentiment[categorySentiment]['Sports'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'Finance') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Finance'] = categoryAndSentiment[categorySentiment]['Finance'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Finance'] = categoryAndSentiment[categorySentiment]['Finance'] - 10;
                    }                
                }
            }

            if (categories[category]['category'] == 'Other') {
                if (sentiments[category]['result'] == 'PositiveSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Other'] = categoryAndSentiment[categorySentiment]['Other'] + 10;
                    }
                } else if (sentiments[category]['result'] == 'NegativeSentiment') {
                    for (categorySentiment in categoryAndSentiment) {
                        categoryAndSentiment[categorySentiment]['Other'] = categoryAndSentiment[categorySentiment]['Other'] - 10;
                    }                
                }
            }
        }
    }


var CATEGORIES = ['Social Networking', 'Shopping', 'News', 'Education', 'Technology', 'Sports', 'Finance', 'Other'];
var SENTIMENTS = ['Extremely Happy', 'Very Happy', 'Happy', 'Moderately Happy', 'A Little Happy', 'Neutral', 'A Little Sad', 'Moderately Sad', 'Sad', 'Very Sad', 'Extremely Sad'];
var color = Chart.helpers.color;
for (categorySentiment in categoryAndSentiment) {
    var data = [categoryAndSentiment[categorySentiment]['Social Networking'], categoryAndSentiment[categorySentiment]['Shopping'], categoryAndSentiment[categorySentiment]['News'], categoryAndSentiment[categorySentiment]['Education'], categoryAndSentiment[categorySentiment]['Technology'], categoryAndSentiment[categorySentiment]['Sports'], categoryAndSentiment[categorySentiment]['Finance'], categoryAndSentiment[categorySentiment]['Other']];
}   
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

// document.getElementById('randomizeData').addEventListener('click', function() {
//     var zero = Math.random() < 0.2 ? true : false;
//     var scalingFactor = randomScalingFactor()
//     barChartData.datasets.forEach(function(dataset) {
//         dataset.data = dataset.data.map(function() {
//             return zero ? 0.0 : scalingFactor;
//         });
//     });

//     barChartData.datasets.forEach(function(dataset) {
//         dataset.backgroundColor = dataset.backgroundColor.map(function() {
//             return color ? color(window.chartColors.blue).alpha(0.5).rgbString() : color(window.chartColors.red).alpha(0.5).rgbString();
//         });
//     });
//     window.myBar.update();
// });
});
});

};