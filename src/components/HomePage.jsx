import React from 'react';
import {Chart as GChart} from "react-google-charts";
import 'c3/c3.css';
import {Row, Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import {TimeSeriesChart, DonutChart, ChartContainer} from "./Chart";

function HomePage(props) {

    return (
        <Container fluid>
            <Row>
                <Col>{props.date !== "" && (
                    <h1>Visualization of Covid-19 virus outbreak data on {props.date}</h1>)}</Col>
            </Row>
            <Row>
                <Col>
                   {props.columns && props.columns.length > 0 ? <TimeSeriesChart columns={props.columns} /> : <Spinner />}
                </Col>
                <Col>{props.pieChartColumns && props.pieChartColumns.length > 0 ? <DonutChart columns={props.pieChartColumns} confirmedCases={props.confirmedCases}/>: <Spinner />}</Col>
            </Row>
            <Row>
                <Col>
                    <div className="chart-wrapper">
                        <h3>World Map (<a href='/countries-list'>Show by country</a>)</h3>
                        <ChartContainer>
                            {
                                (props.countries && props.countries.length > 0) ? (<GChart width='98%'
                                                                                           chartType="GeoChart"
                                                                                           data={props.countries}
                                                                                           legend={'none'}
                                />) : <Spinner />}
                        </ChartContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;
