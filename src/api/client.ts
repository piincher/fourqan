import axios from 'axios'
export const client = axios.create({
    baseURL: 'https://podify-3444ef74d960.herokuapp.com',
})
