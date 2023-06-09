import { Card, Button } from "react-bootstrap"
import "./EventCard.css"
import { Link } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"


const EventCard = ({ reportType, title, cover, locationDetails, _id, owner }) => {

    return (
        <Link to={`/paranormalevents/${_id}`} className="text-reset cardLink cutomBoton">
            <Card className="mb-3 EventCard transparentBackground">

                <Card.Img variant="top" src={cover} />

                <Card.Body>
                    <Card.Title className="titleCard cardContentText">{reportType}</Card.Title>
                    <Card.Text className="mt-3 cardContentText"> <u>Case</u>: {title}</Card.Text>
                    <Card.Text className="cardContentText" >  <u>Location</u>:{locationDetails}</Card.Text>
                </Card.Body>

            </Card>
        </Link>
    )


}
export default EventCard