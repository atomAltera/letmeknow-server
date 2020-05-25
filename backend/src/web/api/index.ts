import {Router} from "express";
import {loggedInUserHandler, loginHandler} from "./auth";
import {registrationHandler} from "./users";
import {eventCreateHandler, eventListHandler, eventRemoveHandler} from "./events";
import {h} from "../utils";
import {secretCreateHandler, secretListHandler, secretRemoveHandler,} from "./secrets";


const api = Router({strict: true});


// Authentication
api.post('/api/auth', h(loginHandler));
api.get('/api/auth', h(loggedInUserHandler));

// Users management
api.post('/api/users', h(registrationHandler))

// Events management
api.get('/api/events', h(eventListHandler))
api.post('/api/events', h(eventCreateHandler))
api.delete('/api/events/:eventId', h(eventRemoveHandler))

// Secrets management
api.get('/api/secrets', h(secretListHandler))
api.post('/api/secrets', h(secretCreateHandler))
api.delete('/api/secrets/:secretId', h(secretRemoveHandler))


export default api;


