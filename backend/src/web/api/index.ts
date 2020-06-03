import {Router} from "express";
import {loggedInUserHandler, loginHandler} from "./auth";
import {registrationHandler} from "./users";
import {eventCreateHandler, eventGetHandler, eventListHandler, eventRemoveHandler, eventUpdateHandler} from "./events";
import {h} from "../utils";
import {
    secretCreateHandler,
    secretGetHandler,
    secretListHandler,
    secretRemoveHandler,
    secretUpdateHandler,
} from "./secrets";


const api = Router({strict: true});


// Authentication
api.post('/api/auth', h(loginHandler));
api.get('/api/auth', h(loggedInUserHandler));

// Users management
// api.post('/api/users', h(registrationHandler)) // Disable registration

// Events management
api.get('/api/events', h(eventListHandler))
api.get('/api/events/:eventId', h(eventGetHandler))
api.post('/api/events', h(eventCreateHandler))
api.put('/api/events/:eventId', h(eventUpdateHandler))
api.delete('/api/events/:eventId', h(eventRemoveHandler))

// Secrets management
api.get('/api/secrets', h(secretListHandler))
api.get('/api/secrets/:secretId', h(secretGetHandler))
api.post('/api/secrets', h(secretCreateHandler))
api.put('/api/secrets/:secretId', h(secretUpdateHandler))
api.delete('/api/secrets/:secretId', h(secretRemoveHandler))


export default api;


