import axios from "axios";
import {Login_CreateForm} from "./models/login";
import {User} from "./models/user";
import {Secret, Secret_CreateForm} from "./models/secret";
import {Event} from "./models/event";

/**
 * Run GET request to path with provided *query*
 */
async function get<T, D = any>(path: string, query?: D) {
    const resp = await axios.get<T>(path, {params: query});

    return resp.data;
}

/**
 * Run POST request to path with provided payload in *data*
 */
async function post<T, D = any>(path: string, data?: D) {
    const resp = await axios.post<T>(path, data);

    return resp.data;
}

/**
 * Runs DELETE query
 */
async function remove<T>(path: string) {
    const resp = await axios.delete<T>(path);

    return resp.data;
}

/**
 * Request current logged in user
 */
export function getCurrentUser() {
    return get<User | undefined>('/api/auth')
}

/**
 * Log in user with email and password
 */
export function login(form: Login_CreateForm) {
    return post<User>('/api/auth', form);
}

/**
 * List events of current user
 */
export function listEvents() {
    return get<Event[]>('/api/events')
}

/**
 * List secrets of current user
 */
export function listSecrets() {
    return get<Secret[]>('/api/secrets')
}

/**
 * Creates secret and return it
 */
export function createSecret(form: Secret_CreateForm) {
    return post<Secret>('/api/secrets')
}
