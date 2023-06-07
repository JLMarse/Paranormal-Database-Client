import eventsService from "../../services/events.services"
import { useParams } from 'react-router-dom'
import uploadServices from '../../services/upload.services'
import { useEffect, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"

const EventEditForm = ({ finalAction }) => {
    const { event_id } = useParams()

    const [event, setEvent] = useState({
        title: '',
        reportType: '',
        locationDetails: '',
        date: '',
        furtherDetails: '',
        cover: ''
    })

    const [errors, setErrors] = useState([])

    useEffect(() => {
        editEvent()
    }, [])

    const editEvent = () => {
        eventsService
            .getOneEvent(event_id)
            .then(({ data }) => {
                const {
                    title,
                    reportType,
                    locationDetails,
                    date,
                    furtherDetails,
                    cover
                } = data

                setEvent({
                    title,
                    reportType,
                    locationDetails,
                    date,
                    furtherDetails,
                    cover
                })
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setEvent({ ...event, [name]: value })
    }

    const handleFileUpload = e => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('imageData', e.target.files[0]);

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                const { cloudinary_url: cover } = data
                setEvent(prevEvent => ({ ...prevEvent, cover }))
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleSubmit = e => {
        e.preventDefault();

        eventsService
            .editEvent(event_id, event)
            .then(() => {
                alert('done');
                finalAction();
            })
            .catch(err => console.log(err));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="reportType">
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                    value={event.reportType}
                    onChange={handleInputChange}
                    name="reportType"
                >
                    <option value="">Select report type</option>
                    <option value="Big Cat">Big Cat</option>
                    <option value="Ghost / Poltergeist">Ghost / Poltergeist</option>
                    <option value="Cryptozoology (other than big cat)">
                        Cryptozoology (other than big cat)
                    </option>
                    <option value="Fairy">Fairy</option>
                    <option value="Folklore / Legend">Folklore / Legend</option>
                    <option value="Demonic Dog">Demonic Dog</option>
                    <option value="UFO">UFO</option>
                    <option value="Other">Other</option>
                </Form.Select>
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={event.title} onChange={handleInputChange} name="title" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="locationDetails">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" value={event.locationDetails} onChange={handleInputChange} name="locationDetails" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" value={event.date} onChange={handleInputChange} name="date" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="furtherDetails">
                <Form.Label>Further Details -if apply- </Form.Label>
                <Form.Control type="text" value={event.furtherDetails} onChange={handleInputChange} name="furtherDetails" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Enviar</Button>
            </div>
        </Form>
    )
}

export default EventEditForm
