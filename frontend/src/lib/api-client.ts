import axios from "axios";
import {User} from "./types";

/**
 * Run GET request to path with provided *query*
 * @param path
 * @param query
 */
async function get<T, D = any>(path: string, query?: D) {
    const resp = await axios.get<T>(path, {params: query});

    return resp.data;
}

/**
 * Run POST request to path with provided payload in *data*
 * @param path
 * @param data
 */
async function post<T, D = any>(path: string, data?: D) {
    const resp = await axios.post<T>(path, data);

    return resp.data;
}

/**
 * Runs DELETE query
 * @param path
 */
async function remove<T>(path: string) {
    const resp = await axios.delete<T>(path);

    return resp.data;
}


/**
 * Request current logged in user
 */
export function getCurrentUser() {
    return get<User>('/api/auth')
}


export function postLogin(email: string, password: string, remember: boolean) {
    return post<User>('/api/auth', {email, password, remember});
}
