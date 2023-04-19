import sendRequest from "./send-request";


const BASE_URL = '/api/favorites'

export function getFav() {
    return sendRequest(BASE_URL)
}

export function saveFav(locationId) {
    return sendRequest(`${BASE_URL}/${locationId}`, 'POST')
}