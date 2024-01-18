import axios from "axios"


export const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const readData = (filter) => dispatch => request.get('phonebook', { params: filter }).then(({ data }) => {
    dispatch({ type: 'LOAD_CONTACT_SUCCESS', contacts: data, sort: filter })
}).catch(() => {
    dispatch({ type: 'LOAD_CONTACT_FAILED' })
});