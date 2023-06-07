import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import eventsService from "../../services/events.services";
import userService from "../../services/users.services";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, ButtonGroup, Card } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";

const EventDetailsPage = () => {
    const { event_id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);

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
        <Container className="tarjeta">
            {!event ? (
                <Loader />
            ) :
                (
                    <>
                        <hr />
                        <h1 className="fondoTransparente"> Tipo de evento: {event.reportType}</h1>
                        <hr />

                        <Row >
                            <Col md={{ span: 6 }}>

                                <Card className="mb-4 fondoTransparente">
                                    <Card.Body>
                                        <h3>Especificaciones</h3>
                                        <Card.Title>{event.title}</Card.Title>
                                        <Card.Text>
                                            <ul>
                                                <li>Location: {event.locationDetails}</li>
                                                <li>Further Details: {event.furtherDetails}</li>
                                            </ul>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <hr />

                                <ButtonGroup>
                                    <Link to="/paranormalevents">
                                        <Button variant="dark">Eventos</Button>
                                    </Link>


                                    {user._id === event.owner && (
                                        <Link to={`/paranormalEvents/${event_id}/edit`}>
                                            <Button variant="dark">Edit</Button>
                                        </Link>
                                    )}

                                    {user._id === event.owner && <Button variant="danger" onClick={handleDeleteEvent}>Delete</Button>}


                                    <Button
                                        variant="primary"
                                        onClick={handleAddFavorite}
                                        className={isFavorite ? "favorite-button active" : "favorite-button"}>
                                        Favorito
                                    </Button>
                                </ButtonGroup>
                            </Col>

                            <Col md={{ span: 4 }}>
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
