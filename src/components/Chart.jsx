import React from 'react';
import Chart from 'react-c3-component';
import 'c3/c3.css';
import {Row, Col} from "react-bootstrap";
import styled from 'styled-components';

const ChartContainer = styled.section`
        border: 1px solid #555;
        border-radius: 5px;
        padding: 5px;
    `
function TimeSeriesChart(props) {

    return (
        <div className='chart-wrapper'>
            <h3> Covid-19 Evolve</h3>
            <ChartContainer>
                <Chart
                    config={{
                        data: {
                            x: 'x',
                            xFormat: '%m/%d/%y',
                            columns: props.columns
                        },
                        axis: {
                            x: {
                                type: 'timeseries',
                                tick: {
                                    format: '%m',
                                    count: 3
                                },
                                label: "Time(Month)"
                            },
                            y: {
                                label: "Number of cases"
                            }
                        },
                        legend: {
                            show: true
                        }
                    }}
                />
            </ChartContainer>
        </div>
    )
}

function DonutChart(props) {
    return (
        <div className='chart-wrapper'>
            <h3>Global Covid-19 Statistics</h3>
            <ChartContainer>
                <Row>
                    <Col xs={11}>
                        <Chart
                            config={{
                                data: {
                                    columns: props.columns,
                                    type: 'donut',
                                },
                                donut: {
                                    title: props.confirmedCases + " Confirmed Cases",
                                    label: {threshold: 0}
                                },
                                tooltip: {
                                    format: {
                                        name: function (d) {
                                            return d;
                                        },
                                        value: function (value, ratio, id, index) {
                                            return value + " cases";
                                        }
                                    }
                                }
                            }}
                        />
                    </Col>
                </Row>
            </ChartContainer>
        </div>
    )
}

export {DonutChart, TimeSeriesChart, ChartContainer};