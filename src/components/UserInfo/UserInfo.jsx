import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import userService from '../../services/users.services';
import './UserInfoStyle.css';
import { BsTrash } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
//funciona

const UserInfo = ({ name, lastName, avatar, email, _id }) => {
    const [favoriteEvents, setFavoriteEvents] = useState([]);

    useEffect(() => {
        userService.getUser(_id)
            .then(({ data }) => {
                setFavoriteEvents(data.favoriteEvents);
            })
            .catch((err) => console.log(err));
    }, [_id]);

    const handleRemoveFavorite = (eventId) => {
        userService.removeFavoriteEvent(_id, eventId)
            .then(({ data }) => {
                setFavoriteEvents(prevFavoriteEvents => prevFavoriteEvents.filter(event => event._id !== eventId));
            })
            .catch((err) => console.log(err));
    };

    return (
        <Row>
            <Col md={4} >
                <div className="Card transparentBackground">
                    <div className="upper-container">
                        <div className="image-container">
                            <img src={avatar} alt="" height="100px" width="100px" />
                        </div>
                    </div>
                    <div className="lower-container">
                        <h3>{name}</h3>
                        <h4>{lastName}</h4>
                        <p>{email}</p>
                        <Link to={`/profile/${_id}/edit`} className="btn btn-dark btn-sm mt-3">Edit profile</Link>
                    </div>
                </div>
            </Col>

            <Col md={7}>
                <div className="favs-container">
                    {favoriteEvents.length > 0 ? (
                        <ListGroup>
                            {favoriteEvents.map((event) => (
                                <ListGroup.Item key={event._id} className="favoriteCardd transparentBackground d-flex flex-column">
                                    <div>
                                        <strong>Report Type:</strong> {event.reportType}
                                    </div>
                                    <div>
                                        <strong>Case:</strong> {event.title}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button className="custom-button btn-sm mt-3" onClick={() => handleRemoveFavorite(event._id)}>
                                            <BsTrash />
                                        </Button>
                                        <Link to={`/paranormalevents/${event._id}`} className="custom-button btn-sm mt-3">
                                            <BsSearch />
                                        </Link>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="transparentBackground-fit">Add favorites Events</p>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default UserInfo;






/* <Card>
    <Card.Img variant="top" src={avatar} height="300px" />
                                        <Card.Body>
                                            <Card.Title>{name} {lastName}</Card.Title>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item><strong>Email:</strong> {email}</ListGroup.Item>
                                                <ListGroup.Item>
                                                    <strong>Eventos Favoritos:</strong>
                                                    {favoriteEvents.length > 0 ? (
                                                        <ul>
                                                            {favoriteEvents.map((event) => (
                                                                <li key={event._id}>
                                                                    <div>
                                                                        <strong>Tipo de reporte:</strong> {event.reportType}
                                                                    </div>
                                                                    {event.cover && (
                                                                        <div>
                                                                            <strong>Portada:</strong>
                                                                            <img src={event.cover} alt="Cover" />
                                                                        </div>
                                                                    )}
                                                                    <Button variant="danger" onClick={() => handleRemoveFavorite(event._id)}>
                                                                        Eliminar
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No tienes eventos favoritos.</p>
                                                    )}
                                                </ListGroup.Item>
                                            </ListGroup>
                                            <Link to={`/profile/${_id}/edit`} className="btn btn-dark btn-sm mt-3">Editar Perfil</Link>
                                        </Card.Body>
                                    </Card> */

