import sendRequest from "./send-request";


const BASE_URL = '/api/favorites'

export function getFav() {
    return sendRequest(BASE_URL)
}

export function saveFav(cityName) {
    return sendRequest(`${BASE_URL}/${cityName}`, 'POST')
}