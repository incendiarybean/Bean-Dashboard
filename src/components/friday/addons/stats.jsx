import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

function Component(props){

    useEffect(() => {
        if(props.Friday.Loaded){
            const Render = () => {
                var ctx = document.getElementById('statistics');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels:props.Friday.Dates,
                        datasets: [{
                            label:'Wins',
                            backgroundColor:'#48BB78',
                            borderColor:'#68D391',
                            data:props.Friday.Wins,
                            fill:false
                        },{
                            label:'Losses',
                            backgroundColor:'#F56565',
                            borderColor:'#FC8181',
                            data:props.Friday.Losses,
                            fill:false
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: '#63B3ED',
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: '#63B3ED',
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            };
            Render();
        }
    }, [props.Friday.Loaded, props.Friday.Wins, props.Friday.Losses, props.Friday.Today.Wins, props.Friday.Today.Losses]);

    return (
        <div className='shadow-inner bg-other'>
            <div className='h-1/2'>
                <div className='p-4'>
                    <canvas id='statistics' width='800' height='600'></canvas>
                </div>
            </div>
        </div>
    );
}

export default Component;
