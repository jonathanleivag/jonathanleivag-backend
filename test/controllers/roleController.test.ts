import { use } from 'chai'
import http from 'chai-http'
import { before } from 'mocha'

import database from '../../src/database'
import server from '../../src/server'

before(done => {
  server()
  database({ done })
})

use(http)
describe('roleController', () => {
  it('createRole', () => {
    console.log('pase')

    // request(server)
    //   .post('/role/create')
    //   .send({
    //     role: 'test'
    //   })
    //   .end((_, res) => {
    //     expect(res.status).to.equal(200)
    //   })
  })
})
