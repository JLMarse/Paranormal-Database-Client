import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/img/space_ship.jpeg";
import Carousel from 'react-bootstrap/Carousel';


const HomePage = () => {
    return (
        <Carousel>
            <Carousel.Item className="home-container">
                <img
                    className="d-block w-100 h-100"
                    src="https://cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EZYFUQ4WGFA2REVM4RRX5TC6DE.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center">

                    <h2 className="text-dark bg-light homeText mt-3">
                        Examining folkloric, paranormal &amp; cryptozoological locations in the world and beyond
                    </h2>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="home-container">
                <img
                    className="d-block w-100 h-100"
                    src="https://wallpapercave.com/wp/wp4339302.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-dark bg-light homeText mt-3">Second slide label</h3>
                    <p className="text-dark bg-light homeText mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomePage;


