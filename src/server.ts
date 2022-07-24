import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { auth, claimIncludes } from 'express-oauth2-jwt-bearer'
import morgan from 'morgan'

import { IDoneMocha } from './interfaces'
import { PORT } from './utils'

const optionCors: cors.CorsOptions = {
  origin: [],
  credentials: true
}

const checkJwt = auth({
  audience: 'http://localhost:3999/',
  issuerBaseURL: 'https://jonathanleivag.us.auth0.com/',
  secret:
    'Consequat duis Lorem eiusmod do ipsum ipsum. Qui aute dolore sit do laboris consectetur incididunt magna nisi ex ex ad. Tempor velit reprehenderit non aliquip reprehenderit adipisicing nulla velit culpa. Ad ex pariatur incididunt ipsum ut incididunt. Irure ex irure non qui.',
  tokenSigningAlg: 'HS256'
})

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

  app.get('/', checkJwt, claimIncludes('superuser'), (req, res) => {
    res.send('Hello World!')
  })

  app.use('/api/portafolio', require('./routers/PortafolioRouter'))
  app.use('/api/role', require('./routers/RoleRouter'))
  app.use('/api/user', require('./routers/UserRouter'))

  /* --------------------------------- server --------------------------------- */
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`)
    if (done !== undefined) done()
  })
}

export default server
