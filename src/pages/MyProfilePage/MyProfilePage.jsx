import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../contexts/auth.context'
import { Container } from 'react-bootstrap'
import UserInfo from '../../components/UserInfo/UserInfo'
import EditUserPage from "../EditUserPage/EditUserPage"
import userService from '../../services/users.services'

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState(user)

    useEffect(() => {
        if (user) {
            userService
                .getUser(user._id)
                .then(({ data }) => {
                    setUserData(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user])

    return (
        <Container>
            <h1 className="fondoTransparente-profile">¡Hola, {userData.name}!</h1>
            <hr />

            <UserInfo {...userData} />

        </Container>
    )
}

export default ProfilePage
