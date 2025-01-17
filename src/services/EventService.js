import axios from "axios";
import NProgress from 'nprogress'

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    NProgress.start()
    return config
})

apiClient.interceptors.response.use(response => {
    NProgress.done()
    return response
})

export default {
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent(id) {
        return apiClient.get(`/events/${id}`)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    },
    updateEvent(id, event) {
        return apiClient.put(`/events/${id}`, event)
    },
    deleteEvent(id) {
        return apiClient.delete(`/events/${id}`)
    }
}