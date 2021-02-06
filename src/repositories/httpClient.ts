import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes'
})

export { httpClient }