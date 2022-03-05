import React from 'react';
import {Bar} from 'react-chartjs-2'


function VerticalBarChart(props) {
    const data = {
        labels: [1, 2, 3, 4, 5],
        datasets: [
            {
                data: props.xAxisData,
                backgroundColor: [
                    'rgba(148, 105, 75, 0.6)'
                ],
                borderColor: [
                    '#CCBA9C',
                ],
                borderWidth: 1,
            },
        ],
    };

    var options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#888888',
                    fontWeight: 'bold',
                    fontFamily: "Roboto",
                    precision: 0,
                },
            },
            y: {
                grid: {
                    color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                    color: '#888888',
                    fontWeight: 'bold',
                    precision: 0,
                    fontFamily: "Roboto"
                }
            }
        }
    };

    return (
        <React.Fragment>
            <Bar data={data} options={options}/>
        </React.Fragment>
    )
}

export default VerticalBarChart
