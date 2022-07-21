import { AxiosError } from 'axios'
import { expect } from 'chai'

import { IResPortafolio } from '../../src/controllers'
import { PortafolioModel } from '../../src/models'
import { IPortafolio } from '../../src/models/PortafolioModel'
import { COUNT_PORTAFOLIO } from '../../src/utils'
import axiosUrl from '../axiosConfig'

const dataPortafolio = {
  name: 'jonathanleivag 1',
  description: 'description jonathanleivag',
  image: 'https://github.com/jquense/yup/issues/211',
  url: 'https://github.com/jquense/yup/issues/211',
  urlGithub: 'https://github.com/jquense/yup/issues/211'
}

let id: string = ''

describe('portafolioController', () => {
  it('crear portafolio, que por defecto el tipo sea portafolio', async () => {
    const data = await axiosUrl.post<IResPortafolio>(
      '/portafolio/create',
      dataPortafolio
    )
    expect(data.status).equal(201)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio
    id = portafolio.id!
    expect(portafolio.type).equal('portafolio')
    expect(portafolio).to.include(dataPortafolio)
  })

  it('crear portafolio, que el tipo sea frontend_mentor', async () => {
    const newPortafolio = { ...dataPortafolio, type: 'frontend_mentor' }

    const data = await axiosUrl.post<IResPortafolio>(
      '/portafolio/create',
      newPortafolio
    )

    expect(data.status).equal(201)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio
    expect(portafolio.type).equal('frontend_mentor')
    expect(portafolio).to.include(newPortafolio)
  })

  it('error al crear portafolio de tipo frontend_mentor por nombre existente', async () => {
    const newPortafolio = { ...dataPortafolio, type: 'frontend_mentor' }

    try {
      await axiosUrl.post<IResPortafolio>('/portafolio/create', newPortafolio)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El portafolio ya existe')
      }
    }
  })

  it('error al crear portafolio de tipo portafolio por nombre existente', async () => {
    try {
      await axiosUrl.post<IResPortafolio>('/portafolio/create', dataPortafolio)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El portafolio ya existe')
      }
    }
  })

  it('Mostrar error cuando se supera el maximo de portafolio con tipo portafolio', async () => {
    const count = COUNT_PORTAFOLIO - 1

    try {
      for (let i = 0; i < count; i++) {
        const data = { ...dataPortafolio, name: `jonathanleivag ${i + 2}` }
        await axiosUrl.post<IResPortafolio>('/portafolio/create', data)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Tienes el máximo de portafolios')
      }
    }
  })

  it('Mostrar error cuando se supera el maximo de portafolio con tipo frontend_mentor', async () => {
    const count = COUNT_PORTAFOLIO - 1

    try {
      for (let i = 0; i < count; i++) {
        const data = {
          ...dataPortafolio,
          name: `jonathanleivag ${i + 2}`,
          type: 'frontend_mentor'
        }

        await axiosUrl.post<IResPortafolio>('/portafolio/create', data)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Tienes el máximo de portafolios')
      }
    }
  })

  it('mostrar todos los portafolio de tipo portafolio', async () => {
    const data = await axiosUrl.get<IResPortafolio>('/portafolio/all')

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio[]
    expect(portafolio.length).equal(COUNT_PORTAFOLIO)
    expect(data.data.message).equal('Portafolios obtenidos')
    expect(portafolio[0].type).equal('portafolio')
  })

  it('mostrar un limite de portafolio de tipo frontend_mentor', async () => {
    const data = await axiosUrl.get<IResPortafolio>(
      '/portafolio?limit=3&type=frontend_mentor'
    )

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio[]
    expect(portafolio.length).equal(3)
    expect(portafolio[0].type).equal('frontend_mentor')
  })

  it('mostrar un portafolio por id', async () => {
    const data = await axiosUrl.get<IResPortafolio>(`/portafolio/${id}`)

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio
    expect(portafolio.type).equal('portafolio')
    expect(portafolio).to.include(dataPortafolio)
  })

  it('actualizar un portafolio', async () => {
    const data = await axiosUrl.put<IResPortafolio>(`/portafolio/${id}`, {
      ...dataPortafolio,
      name: 'jonathanleivag'
    })

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio
    expect(portafolio.type).equal('portafolio')
    expect(portafolio.name).equal('jonathanleivag')
    expect(portafolio).to.include({ ...dataPortafolio, name: 'jonathanleivag' })
  })

  it('eliminar un portafolio', async () => {
    const data = await axiosUrl.delete<IResPortafolio>(`/portafolio/${id}`)

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    expect(data.data.message).equal('Portafolio eliminado')
  })

  it('mostrar error cuando se intenta eliminar un portafolio que no existe', async () => {
    try {
      await axiosUrl.delete<IResPortafolio>(`/portafolio/${id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Portafolio no encontrado')
      }
    }
  })

  it('mostrar error cuando se intenta actualizar un portafolio que no existe', async () => {
    try {
      await axiosUrl.put<IResPortafolio>(`/portafolio/${id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Portafolio no encontrado')
      }
    }
  })

  it('mostrar error cuando se intenta mostrar un portafolio que no existe', async () => {
    try {
      await axiosUrl.get<IResPortafolio>(`/portafolio/${id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResPortafolio

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Portafolio no encontrado')
      }
    }
  })

  it('eliminar todos los portafolio', async () => {
    await PortafolioModel.deleteMany({})
  })

  it('mostrar un mensaje cuando no existen los portafolio de tipo portafolio', async () => {
    const data = await axiosUrl.get<IResPortafolio>('/portafolio/all')

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio[]
    expect(portafolio.length).equal(0)
    expect(data.data.message).equal('No hay portafolios')
  })

  it('mostrar un mensaje cuando no existen los portafolio de tipo frontend_mentor', async () => {
    const data = await axiosUrl.get<IResPortafolio>(
      '/portafolio/all?type=frontend_mentor'
    )

    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const portafolio = data.data.portafolio as IPortafolio[]
    expect(portafolio.length).equal(0)
    expect(data.data.message).equal('No hay portafolios')
  })
})
