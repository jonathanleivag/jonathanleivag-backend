import { before } from 'mocha'

import database from '../src/database'
import server from '../src/server'

before(done => {
  server()
  database({ done })
})
