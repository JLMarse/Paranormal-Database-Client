import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import eventsService from "../../services/events.services";
import EventsList from "../../components/EventsList/EventsList";
import Loader from "../../components/Loader/Loader";


//parece que con esta implementacion de la paginacion funciona todo perfecto

const EventsPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("");
    const [searchResultsEmpty, setSearchResultsEmpty] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const fetchEvents = (query) => {
        eventsService
            .searchEvents(query)
            .then(({ data }) => {
                setEvents(data);
                setSearchResultsEmpty(data.length === 0);
            })
            .catch((err) => console.log(err));
    };

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchEvents(searchQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setFilterType("");
        setEvents(allEvents);
        setSearchResultsEmpty(allEvents.length === 0);
    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    useEffect(() => {
        eventsService
            .getEvents()
            .then(({ data }) => {
                setAllEvents(data);
                setEvents(data);
                setSearchResultsEmpty(data.length === 0);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const filteredEvents = allEvents.filter((event) => {
            if (filterType === "") {
                return true;
            } else {
                return event.reportType === filterType;
            }
        });
        setEvents(filteredEvents);
        setSearchResultsEmpty(filteredEvents.length === 0);
    }, [filterType, allEvents]);

    useEffect(() => {
        if (searchQuery === "") {
            handleClearSearch();
        } else {
            fetchEvents(searchQuery);
        }
    }, [searchQuery]);

    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <Container id="eventsPage__container">
            <h1 className="homeTextLight">Paranormal Database Events</h1>

            <Row>
                <Col>
                    <Form onSubmit={handleSearchSubmit} className="mb-3">
                        <InputGroup>
                            <FormControl
                                className="borderOff"
                                type="text"
                                placeholder="Search events"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <Button variant="secondary" type="submit">
                                Search
                            </Button>
                            {(searchQuery !== "" || filterType !== "") && (
                                <Button variant="secondary" onClick={handleClearSearch}>
                                    Clear
                                </Button>
                            )}
                        </InputGroup>
                    </Form>
                </Col>
            </Row>

            <Row className="align-items-center">
                <Col className="bloqueTarjeta justify-content-center">
                    <Form>
                        <Form.Group controlId="filterType">
                            <Form.Label>Filter by Type</Form.Label>
                            <Form.Control
                                className="borderOff"
                                as="select"
                                value={filterType}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Types</option>
                                <option value="Big Cat">Big Cat</option>
                                <option value="Ghost / Poltergeist">Ghost / Poltergeist</option>
                                <option value="Cryptozoology (other than big cat)">
                                    Cryptozoology (other than big cat)
                                </option>
                                <option value="Fairy">Fairy</option>
                                <option value="Folklore / Legend">Folklore / Legend</option>
                                <option value="Demonic Dog">Demonic Dog</option>
                                <option value="UFO">UFO</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            {searchResultsEmpty ? (
                <p className="transparentBackground-edit">No results found.</p>
            ) : (
                <div>
                    <Row className="cardClass">
                        {!events ? <Loader /> : <EventsList events={currentEvents} />}
                    </Row>

                    <div className="pagination">
                        <Button
                            variant="secondary"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span>{currentPage}</span>
                        <Button
                            variant="secondary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default EventsPage;


/* import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import eventsService from "../../services/events.services";
import EventsList from "../../components/EventsList/EventsList";
import Loader from "../../components/Loader/Loader";
 
 
const EventsPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [searchResultsEmpty, setSearchResultsEmpty] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
 
    const fetchEvents = (query) => {
        eventsService
            .searchEvents(query)
            .then(({ data }) => {
                setAllEvents(data);
                setSearchResultsEmpty(data.length === 0);
                setCurrentPage(1); // Reset to first page when performing a new search
            })
            .catch(err => console.log(err));
    };
 
    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };
 
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchEvents(searchQuery);
    };
 
    const handleClearSearch = () => {
        setSearchQuery('');
        setFilterType('');
        setEvents(allEvents);
        setSearchResultsEmpty(allEvents.length === 0);
        setCurrentPage(1); // Reset to first page when clearing the search
    };
 
 
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };
 
    useEffect(() => {
        eventsService
            .getEvents()
            .then(({ data }) => {
                setAllEvents(data);
                setEvents(data);
                setSearchResultsEmpty(data.length === 0);
            })
            .catch(err => console.log(err));
    }, []);
 
    useEffect(() => {
        const filteredEvents = allEvents.filter(event => {
            if (filterType === '') {
                return true;
            } else {
                return event.reportType === filterType;
            }
        });
        setEvents(filteredEvents);
        setSearchResultsEmpty(filteredEvents.length === 0);
    }, [filterType, allEvents]);
 
    useEffect(() => {
        if (searchQuery === '') {
            handleClearSearch();
        } else {
            fetchEvents(searchQuery);
        }
    }, [searchQuery]);
 
    // Get current events based on pagination
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
 
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
    return (
        <Container>
            <h1 className="title-container">Paranormal Database Events</h1>
 
            <Row>
                <Col>
                    <Form onSubmit={handleSearchSubmit} className="mb-3">
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search events"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <Button variant="primary" type="submit">Search</Button>
                            {(searchQuery !== '' || filterType !== '') && (
                                <Button variant="secondary" onClick={handleClearSearch}>Clear Search</Button>
                            )}
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
 
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="filterType">
                            <Form.Label>Filter by Type</Form.Label>
                            <Form.Control as="select" value={filterType} onChange={handleFilterChange}>
                                <option value="">All Types</option>
                                <option value="Big Cat">Big Cat</option>
                                <option value="Ghost / Poltergeist">Ghost / Poltergeist</option>
                                <option value="Cryptozoology (other than big cat)">Cryptozoology (other than big cat)</option>
                                <option value="Fairy">Fairy</option>
                                <option value="Folklore / Legend">Folklore / Legend</option>
                                <option value="Demonic Dog">Demonic Dog</option>
                                <option value="UFO">UFO</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
 
            {searchResultsEmpty ? (
                <p>No results found.</p>
            ) : (
                <>
                    <Row>
                        {!events ? (
                            <Loader />
                        ) : (
                            <EventsList events={currentEvents} />
                        )}
                    </Row>
                    <Pagination
                        eventsPerPage={eventsPerPage}
                        totalEvents={events.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </>
            )}
        </Container>
    );
};
 
const Pagination = ({ eventsPerPage, totalEvents, paginate, currentPage }) => {
    const pageNumbers = [];
 
    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pageNumbers.push(i);
    }
 
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <Button onClick={() => paginate(number)} variant="link" className="page-link">
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
 
export default EventsPage;
 
 
 
 
 
 
 
 
 
 */





