import axios from 'axios'

class EventService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/events`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }


    getEvents() {
        return this.api.get('/paranormalEvents')
    }


    getOneEvent(event_id) {
        return this.api.get(`/paranormalevents/${event_id}`)
    }

    saveEvent(eventData) {
        return this.api.post('/paranormalEvents/saveEvent', eventData)
    }

    editEvent(event_id, data) {
        return this.api.put(`/paranormalEvents/${event_id}/edit`, data)
    }


    deleteEvent(event_id) {
        return this.api.delete(`/paranormalEvents/${event_id}/delete`)
    }

    searchEvents(query) {
        return this.api.get(`/paranormalevents/search?q=${query}`);
    }

    addFavoriteEvent(userId, eventId) {
        return this.api.put(`/users/${userId}/favoriteEvents/add`, { eventId });
    }
    /* 
        getRandomEvent() {
            return this.api.get('/paranormalevents/random');
        }
     */




}



const eventsService = new EventService()

export default eventsService