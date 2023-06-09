import userService from '../../services/users.services'
//import uploadService from '../../services/upload.services'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"



const UserEdit = () => {

    const { user } = useContext(AuthContext)


    const [currentUser, setCurrentUser] = useState({
        name: '',
        lastName: '',
        email: ''
        //avatar: ''
    })


    const navigate = useNavigate();



    useEffect(() => {
        getUser()
    }, [user?._id])


    const getUser = () => {

        userService
            .getUser(user?._id)
            .then(({ data }) => setCurrentUser(data))
            .catch(err => console.log(err))
    }


    const handleInputChange = e => {

        const { value, name } = e.target
        setCurrentUser({ ...currentUser, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        userService
            .editUser(user._id, currentUser)
            .then((response) => {
                console.log(response)
                navigate("/myprofile");

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleClick = (e) => {
        e.preventDefault();
        userService
            .deleteUser(user._id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    /* 
        const handleFileUpload = e => {
            e.preventDefault()
    
            const formData = new FormData();
            formData.append('imageUrl', e.target.imageUrl.files[0]);
    
            uploadService
                .uploadImage(formData)
                .then(({ data }) => {
    
                    const { cloudinary_url } = data
                    return userService.editUser(id, { ...currentUser, avatar: cloudinary_url })
    
                })
    
                .catch(err => console.log(err))
        } */




    if (!user || !currentUser) {
        <h1> Loading... </h1>
    }

    const { name, lastName, email } = currentUser
    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className=" mb-3" controlId="name">
                <Form.Label className='transparentBackground'>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label className='transparentBackground'>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={handleInputChange} name="lastName" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group> */}


            <Form.Group className="mb-3" controlId="email">
                <Form.Label className='transparentBackground'>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit">Update</Button>
            </div>
            <div className="d-grid">
                <Button variant="secondary" onClick={handleClick}>Delete</Button>
            </div>

        </Form >
    )
}
export default UserEdit












