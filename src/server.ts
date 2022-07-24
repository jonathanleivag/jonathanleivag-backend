import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { IDoneMocha } from './interfaces'
import { PORT } from './utils'

const optionCors: cors.CorsOptions = {
  origin: [],
  credentials: true
}

const server = ({ done }: IDoneMocha = { done: undefined }) => {
  const app = express()

  /* ------------------------ configuración de express ------------------------ */
  app.use(cors(optionCors))
  app.use(cookieParser())
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.disable('x-powered-by')

  /* ---------------------------------- rutas --------------------------------- */
  app.use('/api/portafolio', require('./routers/PortafolioRouter'))
  app.use('/api/role', require('./routers/RoleRouter'))
  app.use('/api/user', require('./routers/UserRouter'))
  app.use('/api/category', require('./routers/CategoryRouter'))

  /* --------------------------------- server --------------------------------- */
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`)
    if (done !== undefined) done()
  })
}

export default server
