import profilePic from "../../assets/img/jl.jpeg"



import { Container, Row, Col } from "react-bootstrap";

const AboutAuthor = () => {
    return (
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <div className="about-text transparentBackground">
                        <h2>About</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            vitae tincidunt tellus. Morbi ut diam sit amet mi consectetur
                            feugiat. Sed id scelerisque ligula. Proin sollicitudin varius
                            mauris, non viverra justo feugiat vitae.
                        </p>
                        <p>
                            Fusce non consectetur libero. Suspendisse eu metus vitae orci
                            pellentesque finibus. Sed venenatis congue lacus vel elementum.
                            Phasellus dignissim a nunc sed consectetur.
                        </p>
                    </div>
                </Col>
                <Col sm={12} md={6}>

                    <div className="author-photo">
                        <img src={profilePic} alt="Foto del autor" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutAuthor;
