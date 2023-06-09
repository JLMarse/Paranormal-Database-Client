import { useEffect, useState } from "react";
import eventsService from '../../services/events.services';
import { Card, Col, Container, Row } from 'react-bootstrap';

const EventsRandomPage = () => {
    const [event, setEvent] = useState({});

    useEffect(() => {
        loadEvent();
    }, []);

    const loadEvent = () => {
        eventsService
            .getRandomEvent()
            .then(({ data }) => {
                setEvent(data);
            })
            .catch(err => console.log(err));
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="col-8">
                    <h3>{event.title}</h3>
                    <hr />
                    <Card className="m-3 p-3">
                        {event.cover}

                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EventsRandomPage;

//no funciona aun arreglar
