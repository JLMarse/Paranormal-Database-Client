import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = () => {

    return (

        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1 className="text-white fw-bold mb-3 mt-5" >Signup</h1>

                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container >
    )
}

export default SignupPage