import axios from 'axios'

import { PORT } from '../src/utils'

const url: string = `http://localhost:${PORT}/api`

const axiosUrl = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosUrl
