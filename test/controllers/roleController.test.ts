import { AxiosError } from 'axios'
import { expect } from 'chai'
import { before } from 'mocha'

import { IResRole } from '../../src/controllers'
import database from '../../src/database'
import { IRole, RoleModel } from '../../src/models'
import server from '../../src/server'
import axiosUrl from '../axiosConfig'

before(done => {
  server()
  database({ done })
})

describe('roleController', () => {
  let id: string = ''

  it('Eliminar todo los datos', async () => {
    await RoleModel.deleteMany({})
  })

  it('createRole', async () => {
    const data = await axiosUrl.post<IResRole>('/role/create', {
      role: 'test'
    })
    expect(data.status).equal(201)
    expect(data.data.status).equal('success')
    const role = data.data.role as IRole
    expect(role.role).equal('test'.toLocaleUpperCase())
    id = role.id!
  })

  it('Tiene que retornar un error', async () => {
    try {
      await axiosUrl.post<IResRole>('/role/create', {
        role: 'test'
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResRole
        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El rol ya existe')
      }
    }
  })

  it('getRoles', async () => {
    const data = await axiosUrl.get<IResRole>('/role')
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const roles = data.data.role as IRole[]
    expect(roles.length).equal(1)
  })

  it('getOneRole', async () => {
    const data = await axiosUrl.get<IResRole>(`/role/${id}`)
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const role = data.data.role as IRole
    expect(role.id).equal(id)
  })

  it('updateRole', async () => {
    const data = await axiosUrl.put<IResRole>(`/role/${id}`, {
      role: 'test2'
    })
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const role = data.data.role as IRole
    expect(role.role).equal('test2'.toLocaleUpperCase())
  })

  it('deleteRole', async () => {
    const data = await axiosUrl.delete<IResRole>(`/role/${id}`)
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    expect(data.data.message).equal('Rol eliminado')
  })

  it('Eliminar todo los datos', async () => {
    await RoleModel.deleteMany({})
  })
})
