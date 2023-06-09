// En LoginPage
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const location = useLocation();
    const redirectPath = location.state?.from || '/';
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate(redirectPath);
    };

    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1 className='transparentBackground-fit mt-5 welcome'>Welcome back</h1>
                    <hr />
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
