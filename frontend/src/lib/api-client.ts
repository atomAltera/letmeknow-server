import axios from "axios";
import {Login_Form} from "./models/login";
import {User} from "./models/user";
import {Secret, Secret_Form} from "./models/secret";
import {Event, Event_Form} from "./models/event";
import {notifyError} from "./toaster";

function unknownErrorHandling(e: any): never {
    if (e.response.status == 500) {
        notifyError(e.message)
    }

    throw e;
}

// General
/**
 * Run GET request to path with provided *query*
 */
async function get<T, D = any>(path: string, query?: D) {
    const resp = await axios.get<T>(path, {params: query}).catch(unknownErrorHandling);

    return resp.data;
}

/**
 * Run POST request to path with provided payload in *data*
 */
async function post<T, D = any>(path: string, data?: D) {
    const resp = await axios.post<T>(path, data).catch(unknownErrorHandling);

    return resp.data;
}

/**
 * Run PUT request to path with provided payload in *data*
 */
async function put<T, D = any>(path: string, data?: D) {
    const resp = await axios.put<T>(path, data).catch(unknownErrorHandling);

    return resp.data;
}

/**
 * Runs DELETE query
 */
async function remove<T>(path: string) {
    const resp = await axios.delete<T>(path).catch(unknownErrorHandling);

    return resp.data;
}

// Auth
/**
 * Request current logged in user
 */
export function getCurrentUser() {
    return get<User | undefined>('/api/auth')
}

/**
 * Log in user with email and password
 */
export function login(form: Login_Form) {
    return post<User>('/api/auth', form);
}

// Events
/**
 * List events of current user
 */
export function listEvents() {
    return get<Event[]>('/api/events')
}

/**
 * Get event by id of current user
 */
export function getEvent(eventId: string) {
    return get<Event>(`/api/events/${eventId}`)
}

/**
 * Creates event and return it
 */
export function createEvent(form: Event_Form) {
    return post<Event>('/api/events', form)
}

/**
 * Update event by id
 */
export function updateEvent(eventId: string, form: Event_Form) {
    return put<Event>(`/api/events/${eventId}`, form)
}

/**
 * Delete event by id
 */
export function deleteEvent(eventId: string) {
    return remove<Event>(`/api/events/${eventId}`)
}

// Secrets
/**
 * List secrets of current user
 */
export function listSecrets() {
    return get<Secret[]>('/api/secrets')
}

/**
 * Get secret by id of current user
 */
export function getSecret(secretId: string) {
    return get<Secret>(`/api/secrets/${secretId}`)
}

/**
 * Creates secret and return it
 */
export function createSecret(form: Secret_Form) {
    return post<Secret>('/api/secrets', form)
}

/**
 * Update secret by id
 */
export function updateSecret(secretId: string, form: Secret_Form) {
    return put<Secret>(`/api/secrets/${secretId}`, form)
}

/**
 * Delete secret by id
 */
export function deleteSecret(secretId: string) {
    return remove<Secret>(`/api/secrets/${secretId}`)
}


