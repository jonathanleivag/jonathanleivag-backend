import { AxiosError } from 'axios'
import { expect } from 'chai'

import { IResRole, IResUser } from '../../src/controllers'
import { IUser, UserModel } from '../../src/models'
import RoleModel, { IRole } from '../../src/models/RoleModel'
import axiosUrl from '../axiosConfig'

const user: IUser = {
  name: 'Jonathan',
  lastName: 'Leiva G',
  image: 'http://localhost.cl',
  email: 'email@email.cl',
  role: '62cb988c57c4088cb9770574',
  password: 'Jhnlisto19066.',
  passwordConfirmation: 'Jhnlisto19066.'
}

let roleId: string = ''

describe('userController', () => {
  /* -------------------------------------------------------------------------- */
  /*                                crear usuario                               */
  /* -------------------------------------------------------------------------- */
  it('error del nombre de usuario', async () => {
    const userError = { ...user, name: 'jo' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El nombre debe tener al menos 3 caracteres')
      }
    }
  })

  it('error usuario vacio', async () => {
    const userError = { ...user, name: '' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El nombre es requerido')
      }
    }
  })

  it('error del apellido de usuario', async () => {
    const userError = { ...user, lastName: 'le' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal(
          'El apellido debe tener al menos 3 caracteres'
        )
      }
    }
  })

  it('error apellido vacio', async () => {
    const userError = { ...user, lastName: '' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El apellido es requerido')
      }
    }
  })

  it('error de la imagen de usuario', async () => {
    const userError = { ...user, image: 'imagen' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('La imagen tiene que ser un url')
      }
    }
  })

  it('imagen de usuario vacia', async () => {
    const userError = { ...user, image: '' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('La imagen es requerida')
      }
    }
  })

  it('email de usuario vacio', async () => {
    const userError = { ...user, email: '' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El email es requerido')
      }
    }
  })

  it('email de usuario invalido', async () => {
    const userError = { ...user, email: 'email' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El email no es válido')
      }
    }
  })

  it('role de usuario vacio', async () => {
    const userError = { ...user, role: '' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El rol es requerido')
      }
    }
  })

  it('password de usuario vacio', async () => {
    const userError = { ...user, password: '', passwordConfirmation: '' }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('La contraseña es requerida')
      }
    }
  })

  it('password minimo de caracteres', async () => {
    const userError = {
      ...user,
      password: '123',
      passwordConfirmation: '123'
    }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal(
          'La contraseña debe tener al menos 8 caracteres'
        )
      }
    }
  })

  it('password de usuario no coinciden', async () => {
    const userError = {
      ...user,
      password: '123456',
      passwordConfirmation: '1234567'
    }
    try {
      await axiosUrl.post('/user/create', userError)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Las contraseñas deben coincidir')
      }
    }
  })

  it('crear usuario', async () => {
    const data = await axiosUrl.post<IResRole>('/role/create', {
      role: 'test'
    })

    const role = data.data.role as IRole
    user.role = role.id!
    roleId = role.id!

    const data0 = await axiosUrl.post<IResUser>('/user/create', user)
    expect(data0.data.status).equal('success')
    expect(data0.data.message).equal('Usuario creado')
  })

  it('error crear usuario ya existe', async () => {
    try {
      user.role = roleId
      await axiosUrl.post<IResUser>('/user/create', user)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResUser

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El usuario ya existe')
      }
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                             eliminar los datos                             */
  /* -------------------------------------------------------------------------- */
  it('Eliminar todo los datos', async () => {
    await RoleModel.deleteMany({})
    await UserModel.deleteMany({})
  })
})
