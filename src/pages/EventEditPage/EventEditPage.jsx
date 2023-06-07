import EventEditForm from "../../components/EventEditForm/EventEditForm"
import { Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
//import { useContext } from "react"
//import { AuthContext } from "../../contexts/auth.context"

const EventEditPage = () => {

    const navigate = useNavigate()
    const { event_id } = useParams()
    //  const { user } = useContext(AuthContext)

    const finalAction = () => navigate(`/paranormalevents/${event_id}`)

    return (
        <>

            {
                < Container >

                    <h1 className="mb-4">Edit Event</h1>
                    <hr />

                    <Row>

                        <Col md={{ span: 8, offset: 2 }}>

                            <EventEditForm finalAction={finalAction} />

                        </Col >

                    </Row>

                </Container >

            }
        </>
    )
}

export default EventEditPage