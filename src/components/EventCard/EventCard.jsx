import { Card, Button } from "react-bootstrap"
import "./EventCard.css"
import { Link } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"

//funciona
const EventCard = ({ reportType, title, cover, locationDetails, _id, owner }) => {

    return (
        <Link to={`/paranormalevents/${_id}`} className="text-reset linkTarjeta cutomBoton">
            <Card className="mb-3 EventCard fondoTransparente">
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title className="tituloTarjeta">{reportType}</Card.Title>
                    <Card.Text>{title}</Card.Text>
                    <Card.Text>{locationDetails}</Card.Text>


                </Card.Body>

            </Card>
        </Link>
    )


}
export default EventCard