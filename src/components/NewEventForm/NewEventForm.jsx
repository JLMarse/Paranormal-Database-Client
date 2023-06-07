import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import uploadServices from "../../services/upload.services"
import eventsService from "../../services/events.services"
import FormError from "../FormError/FormError"





const NewEventForm = () => {


    const [eventData, setEventData] = useState({
        title: '',
        reportType: '',
        locationDetails: '',
        date: '',
        furtherDetails: '',
        cover: '',

    })

    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target

        setEventData({ ...eventData, [name]: value })

    }

    const handleSubmit = event => {
        event.preventDefault()

        eventsService
            .saveEvent(eventData)
            .then(() => alert('done'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const handleFileUpload = e => {


        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setEventData({ ...eventData, cover: data.cloudinary_url })
            })
            .catch(err => console.log(err))

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="reportType">
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                    value={eventData.reportType}
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
                        <Form.Control type="text" value={eventData.title} onChange={handleInputChange} name="title" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="locationDetails">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" value={eventData.locationDetails} onChange={handleInputChange} name="locationDetails" />
                    </Form.Group>
                </Col>

                <Col>

                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" value={eventData.date} onChange={handleInputChange} name="date" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="furtherDetails">
                <Form.Label>Further Details -if apply- </Form.Label>
                <Form.Control type="text" value={eventData.furtherDetails} onChange={handleInputChange} name="furtherDetails" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            {errors.length > 0 && (<FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>)}

            <div className="d-grid mt-3"> {/* el mt no me hace caso ver porque */}
                <Button variant="dark" type="submit"> Enviar </Button>
            </div>

        </Form >
    )
}

export default NewEventForm