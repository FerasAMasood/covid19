import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import CountriesList from "./components/CountriesList";
import axios from "axios";

function App() {

    const [columns, setColumns] = useState([]);
    const [summaryData, setSummaryData] = useState({});

    async function getSummaryStatsData() {

        const result = await axios(
            'https://api.covid19api.com/summary\n',
        );
        let countries = [["Country", "Total Confirmed", "Total Recovered"]];
        result.data.Countries.map((country) => {
            const {CountryCode, TotalConfirmed, TotalRecovered} = country;
            countries.push([CountryCode, TotalConfirmed, TotalRecovered])
            return country;
        })
        const fullCountries = result.data.Countries;
        const dataDate = result.data.Date;
        const date = new Date(dataDate);
        const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        const {TotalConfirmed, TotalDeaths, TotalRecovered} = result.data.Global;
        let summary = [['Total Deaths', TotalDeaths], ['Total Recovered', TotalRecovered]];
        setSummaryData({summary, formattedDate, countries, TotalConfirmed, fullCountries})
    }

    useEffect(() => {
        getSummaryStatsData()
    }, []);

    async function getDetailedStatsData() {
        const result = await axios(
            'https://disease.sh/v3/covid-19/historical/all?lastdays=90',
        );
        const xData = ['x', ...Object.keys(result.data.cases)];
        const casesData = ['cases', ...Object.values(result.data.cases)];
        const deathsData = ['deaths', ...Object.values(result.data.deaths)];
        const recoveredData = ['recovered', ...Object.values(result.data.recovered)];
        setColumns([xData, casesData, recoveredData, deathsData]);
    }

    useEffect(() => {
        getDetailedStatsData()
    }, []);

    return (
        <div className="App">
            <Container fluid>
                <NavBar/>
                <Router>
                    <Route exact
                           path="/"
                           component={() => <HomePage
                               pieChartColumns={summaryData.summary}
                               confirmedCases={summaryData.TotalConfirmed}
                               countries={summaryData.countries}
                               date={summaryData.formattedDate}
                               columns={columns}
                           />}
                    />
                    <Route exact
                           path="/countries-list"
                           component={() => <CountriesList
                               countries={summaryData.fullCountries}
                               date={summaryData.formattedDate}
                           />}
                    />

                </Router>
            </Container>
        </div>
    );
}

export default App;
