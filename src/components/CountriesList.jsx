import React, {useEffect, useState} from 'react'
import {Form, Table, Row, Spinner, Col, Pagination} from "react-bootstrap";

const TablePagination = (props) => {
    const {pageSize, numberOfEntries, currentPge} = props;
    const numberOfPages = numberOfEntries / pageSize;
    const handlePageButtonClicked = (page) => {
        props.handlePageButtonClicked(page);
    }
    let pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(<Pagination.Item key={`page-btn-${i}`} onClick={() => {
            handlePageButtonClicked(i)
        }} active={i === currentPge}>{i}</Pagination.Item>)
    }
    return (
        <Pagination>
            <Pagination.First disabled={currentPge === 1} onClick={() => {
                handlePageButtonClicked(1)
            }}/>
            <Pagination.Prev disabled={currentPge === 1} onClick={() => {
                handlePageButtonClicked(currentPge - 1)
            }}/>
            {pages}
            <Pagination.Next disabled={currentPge === numberOfPages} onClick={() => {
                handlePageButtonClicked(currentPge + 1)
            }}/>
            <Pagination.Last disabled={currentPge === numberOfPages} onClick={() => {
                handlePageButtonClicked(numberOfPages)
            }}/>
        </Pagination>
    )
}

const CountriesList = (props) => {
    const [countries, setCountries] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(
        () => {
            if (props.countries && props.countries.length > 0) {
                setCountries(props.countries)
            }
        }, [props.countries],
    );
    useEffect(
        () => {
        }, [props.date],
    );

    const handlePageSizeChange = (e) => {
        setPage(1);
        setPageSize(e.target.value);
    }

    const handleCountryFilterChange = (e) => {
        let tmpCountries = countries;
        tmpCountries = props.countries.filter((country) => {
            return e.target.value.length === 0 || country.Country.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
        });
        setCountries(tmpCountries)
    }

    const handlePageButtonClicked = (i) => {
        setPage(i)
    }

    const pageSizeOptions = [10, 20, 30];
    const numberOfPages = Math.ceil(countries.length / pageSize);

    const viewableCountries = countries.slice((page - 1) * pageSize, page * pageSize);

    let maxDeathsIndex = 0, maxConfirmedIndex = 0, maxRecoveredIndex = 0;
    viewableCountries.map((country, index) => {

        if (parseInt(country.NewConfirmed) > parseInt(viewableCountries[maxConfirmedIndex].NewConfirmed)) {
            maxConfirmedIndex = index;
        }

        if (country.NewRecovered > viewableCountries[maxRecoveredIndex].NewRecovered) {
            maxRecoveredIndex = index;
        }
        if (country.NewDeaths > viewableCountries[maxDeathsIndex].NewDeaths) {
            maxDeathsIndex = index;
        }
        return country
    })

    return (
        <div>
            <h1>Covid-19 statistics per country {props.date && (<span>on {props.date}</span>)}</h1>
            <div>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Label srOnly>
                                Name
                            </Form.Label>
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder="Search by country name"
                                onChange={(e) => handleCountryFilterChange(e)}
                            />
                        </Col>
                    </Form.Row>
                </Form>
            </div>
            {props.countries && props.countries.length > 0 ? (
                <Table responsive bordered hover>
                    <thead>
                    <tr>
                        <th>
                            Country
                        </th>
                        <th>
                            New Confirmed
                        </th>
                        <th>
                            New Recovered
                        </th>
                        <th>
                            New Deaths
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        viewableCountries && viewableCountries.length > 0 && viewableCountries.map((country, index) => (
                            <tr key={`countries-table-row-${index}`}>
                                <td key={`countries-table-td-country-${index}`}>{country.Country}</td>
                                <td key={`countries-table-td-conf-${index}`}
                                    className={(maxConfirmedIndex === index) ? 'max-confirmed-cell' : ''}>{country.NewConfirmed}</td>
                                <td key={`countries-table-td-rec-${index}`}
                                    className={(maxRecoveredIndex === index) ? 'max-recovered-cell' : ''}>{country.NewRecovered}</td>
                                <td key={`countries-table-td-death-${index}`}
                                    className={(maxDeathsIndex === index) ? 'max-deaths-cell' : ''}>{country.NewDeaths}</td>
                            </tr>
                        ))
                    }
                    {
                        countries && (countries.length === 0) && (<tr>
                            <td colSpan={5}>No countries to show</td>
                        </tr>)
                    }
                    </tbody>
                </Table>) : <Spinner/>}
            {numberOfPages > 0 && (
                <Row>
                    <Col md={9}>
                        <TablePagination currentPge={page} pageSize={pageSize} numberOfEntries={countries.length}
                                         handlePageButtonClicked={handlePageButtonClicked}/>
                    </Col>
                    <Col md={3}>
                        <Form.Control
                            as="select"
                            onChange={(e) => handlePageSizeChange(e)}
                            value={pageSize}>
                            {pageSizeOptions.map(size => (
                                <option key={`pagesize-opt-${size}`}>{size}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default CountriesList;