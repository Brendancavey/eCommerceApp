import getAuthorization from '../UtilityFunctions/getAuthorization'

export const STORAGE_KEY = 'token'; //for session storage of Authentication tokens

export const ADMIN_NAME = "Admin";

let AUTH_TOKEN = getAuthorization(); //AUTH_TOKEN must be refreshed after token is removed from storage/user logs out

const AUTH_HEADERS = {
    "Authorization": "Bearer " + AUTH_TOKEN
};

export function AuthRequestOptions(method, formData) {
    let requestOptions;
    if (formData != null) {
        requestOptions = {
            method: method,
            credentials: 'include',
            headers: AUTH_HEADERS,
            body: formData
        };
    }
    else {
        requestOptions = {
            method: method,
            credentials: 'include',
            headers: AUTH_HEADERS,
        }
    }
    return requestOptions;

}