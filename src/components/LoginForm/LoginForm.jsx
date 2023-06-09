import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import authService from '../../services/auth.services';
import { AuthContext } from '../../contexts/auth.context';
import useSound from 'use-sound'
import thunder from './../../assets/sound/thunder.mp3';



const LoginForm = ({ onLoginSuccess, toggleModal }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [play] = useSound(thunder);

    const { authenticateUser, storeToken } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken);
                authenticateUser();
                onLoginSuccess();
                toggleModal();
                play();
            })
            .catch((err) => console.log(err));
    };

    const { password, email } = loginData;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label className='transparentBackground'>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label className='transparentBackground'>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                    name="password"
                />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">
                    Enter
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
