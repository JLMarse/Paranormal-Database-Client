import EventEditForm from "../../components/EventEditForm/EventEditForm"
import { Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'


const EventEditPage = () => {

    const navigate = useNavigate()
    const { event_id } = useParams()


    const finalAction = () => navigate(`/paranormalevents/${event_id}`)

    return (
        <>

            {
                < Container >

                    <h1 className="mb-4 transparentBackground-edit ">Edit Event</h1>
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