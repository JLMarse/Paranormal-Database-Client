// En LoginPage
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const location = useLocation();
    const redirectPath = location.state?.from || '/';
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate(redirectPath); // Redirige al usuario a la ruta proporcionada
    };

    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1>Inicio de sesión</h1>
                    <hr />
                    <LoginForm onLoginSuccess={handleLoginSuccess} /> {/* Pasa la función onLoginSuccess */}
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
