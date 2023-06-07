import { useContext } from "react"
import { AuthContext } from "./../contexts/auth.context"
import { Navigate, Outlet } from 'react-router-dom'
import Loader from "../components/Loader/Loader"

//funciona

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoute