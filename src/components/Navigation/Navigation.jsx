import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import LoginForm from '../LoginForm/LoginForm';

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleLoginSuccess = () => {
        toggleModal();
    };

    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                className="navigation-container"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <span className="logo">THE PARANORMAL SPOT</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/paranormalevents" className="navLinks">
                                Paranormal Database
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/paranormalevent/contribute"
                                className="navLinks"
                            >
                                Contribute
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {user ? (
                                <>
                                    <Nav.Link
                                        as="span"
                                        onClick={handleLogout}
                                        className="navLinks"
                                    >
                                        Cerrar sesión
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/myprofile"
                                        className="navLinks"
                                    >
                                        ¡Hola, {user.name}!
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/signup" className="navLinks">
                                        Signup
                                    </Nav.Link>
                                    <Nav.Link
                                        as="span"
                                        onClick={toggleModal}
                                        className="navLinks"
                                    >
                                        Login
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal
                show={showModal}
                onHide={toggleModal}
                centered
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm onLoginSuccess={handleLoginSuccess} toggleModal={toggleModal} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Navigation;



