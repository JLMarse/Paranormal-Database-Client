import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import eventsService from "../../services/events.services";
import userService from "../../services/users.services";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, ButtonGroup, Card } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { GiTerror } from 'react-icons/gi';
import useSound from 'use-sound'
import ping from './../../assets/sound/ping.mp3';

const EventDetailsPage = () => {
    const { event_id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [play] = useSound(ping);

    useEffect(() => {
        eventsService
            .getOneEvent(event_id)
            .then(({ data }) => setEvent(data))
            .catch((err) => console.log(err));
    }, [event_id]);

    useEffect(() => {
        if (user) {
            const favoriteEvents = user.favoriteEvents ? user.favoriteEvents.map((event) => event._id) : [];
            setIsFavorite(favoriteEvents.includes(event_id));
        }
    }, [user, event_id]);

    const handleDeleteEvent = () => {
        eventsService
            .deleteEvent(event_id)
            .then(() => navigate("/paranormalevents"))
            .catch((err) => console.log(err));
    };

    const handleAddFavorite = () => {
        if (user) {
            if (isFavorite) {
                // Si ya es favorito, llamar al método para eliminar evento favorito
                userService
                    .removeFavoriteEvent(user._id, event_id)
                    .then(() => {
                        setIsFavorite(false);
                        console.log("Evento eliminado de favoritos");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                // Si no es favorito, llamar al método para agregar evento favorito
                play()
                userService
                    .addFavoriteEvent(user._id, event_id)
                    .then(() => {
                        setIsFavorite(true);
                        console.log("Evento agregado a favoritos");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    return (

        <Container>
            {!event ? (
                <Loader />
            ) :
                (
                    <>
                        <hr />
                        <h1 className="transparentBackground-fit"> Report Type: {event.reportType}</h1>
                        <hr />

                        <Row >
                            <Col md={{ span: 6 }}>

                                <Card className="mb-4 transparentBackground">
                                    <Card.Body>
                                        <h3><u>{event.title}</u></h3>
                                        <Card.Title className="mt-3"> <u>Location</u>: {event.locationDetails}</Card.Title>
                                        <Card.Title> <u>Date/Time</u>: {event.date}</Card.Title>
                                        <Card.Text className="mt-5 mb-5">
                                            <h5>Further Comments: {event.furtherDetails}</h5>
                                        </Card.Text>
                                    </Card.Body>

                                    <Button
                                        variant="light" size="sm"
                                        onClick={handleAddFavorite}
                                        className={isFavorite ? "favorite-button active" : "favorite-button"}>
                                        Do I like it?
                                        <GiTerror />
                                    </Button>


                                    {user._id === event.owner && (
                                        <Link to={`/paranormalEvents/${event_id}/edit`}>
                                            <Button className="edit-button" variant="dark">Edit</Button>
                                        </Link>
                                    )}


                                    {user._id === event.owner && <Button className="delete-button" variant="secondary" onClick={handleDeleteEvent}>Delete</Button>}


                                </Card>
                                <hr />



                                <ButtonGroup>
                                    <Link to="/paranormalevents">
                                        <Button className="back-button" variant="light">Back</Button>
                                    </Link>

                                </ButtonGroup>

                                < br />

                            </Col>

                            <Col className="cardImg" md={{ span: 4 }}>
                                <Card>
                                    <Card.Img variant="top" src={event.cover} />
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
        </Container>
    );
};

export default EventDetailsPage;
