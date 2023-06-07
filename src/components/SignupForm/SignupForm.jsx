import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from '../../services/auth.services'
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.services"



const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        avatar: '',
        email: '',
        password: '',

    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => navigate('/'))  //aqui ver donde redirijo
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {


        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
            })
            .catch(err => console.log(err))

    }


    const { name, lastName, avatar, email, password } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={handleInputChange} name="lastName" />
            </Form.Group>




            <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Avatar (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit">Register</Button>
            </div>

        </Form>
    )
}

export default SignupForm







/* import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from '../../services/auth.services'
import { useNavigate } from "react-router-dom"



const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        avatar: '',
        email: '',
        password: '',

    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => navigate('/'))  //aqui ver donde redirijo
            .catch(err => console.log(err))
    }


    const { name, lastName, avatar, email, password } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={handleInputChange} name="lastName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="text" value={avatar} onChange={handleInputChange} name="avatar" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit">Register</Button>
            </div>

        </Form>
    )
}

export default SignupForm
 */



