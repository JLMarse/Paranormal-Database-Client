import React from 'react';
import { Col } from 'react-bootstrap';
import EventCard from '../../components/EventCard/EventCard';



const EventsList = ({ events }) => {

    return events.map((elm) => {

        return (


            <Col md={{ span: 4 }} key={elm._id}>
                <EventCard {...elm} />

            </Col>
        );
    });
};

export default EventsList;