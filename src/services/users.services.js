import axios from 'axios'



class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getUser(id) {
        return this.api.get(`/${id}`)
    }

    editUser(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deleteUser(id) {
        return this.api.delete(`/${id}/delete`)
    }

    addFavoriteEvent(userId, eventId) { // Nuevo método para agregar evento favorito
        return this.api.put(`/${userId}/favoriteEvents/add`, { eventId })
    }


    removeFavoriteEvent(userId, eventId) { // Nuevo método para eliminar evento favorito
        return this.api.put(`/${userId}/favoriteEvents/remove`, { eventId })
    }

}



const userService = new UserService()

export default userService
