import { expect } from 'chai'

import { idValidUtil } from '../../src/utils'

describe('idValidUtil', () => {
  it('Tiene que retornar el mensaje "El id no es valid"', () => {
    try {
      idValidUtil('12345678901')
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).equal('El id no es valido')
      }
    }
  })

  it('No tiene que retornar nada', () => {
    idValidUtil('62ca94bedb3aa2d4da5baccd')
  })
})
