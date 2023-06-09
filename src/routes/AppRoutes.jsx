import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import EventsPage from "../pages/EventsPage/EventsPage"
import EventDetailsPage from "../pages/EventsDetailsPage/EventsDetailsPage"
import NewEventPage from "../pages/NewEventPage/NewEventPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage"
import PrivateRoute from './PrivateRoute'
import EventEditPage from "../pages/EventEditPage/EventEditPage"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import AboutAuthorPage from "../pages/AboutAuthorPage/AboutAuthorPage"
//import EventsRandomPage from "../pages/EventsRandomPage/EventsRandomPage";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/paranormalevents" element={<EventsPage />} />

            <Route path="/paranormalevents/:event_id" element={<PrivateRoute />}>
                <Route path="" element={<EventDetailsPage />} />
            </Route>
            <Route path="/paranormalEvents/:event_id/edit" element={<EventEditPage />} />
            <Route path="/paranormalevent/contribute" element={<PrivateRoute />}>
                <Route path="" element={<NewEventPage />} />
            </Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/myprofile" element={<PrivateRoute />}>
                <Route path="" element={<MyProfilePage />} />
            </Route>
            <Route path="/profile/:id/edit" element={<EditUserPage />} />
            <Route path="/about" element={<AboutAuthorPage />} />
            <Route path="*" element={<h1>404</h1>} />
            {/* <Route path="/random-event" element={<EventsRandomPage />} />      */}


        </Routes>
    )
}

export default AppRoutes