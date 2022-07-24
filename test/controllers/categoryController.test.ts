import { AxiosError } from 'axios'
import { expect } from 'chai'

import { IResCategory } from '../../src/controllers'
import { CategoryModel, ICategory } from '../../src/models'
import axiosUrl from '../axiosConfig'

const category: ICategory = {
  category: 'Categoria 1',
  description: 'Descripción de la categoria 1'
}

let id: string = ''

describe('categoryController', () => {
  /* -------------------------------------------------------------------------- */
  /*                               crear categoría                              */
  /* -------------------------------------------------------------------------- */

  it('error de categoria vacia', async () => {
    const category0 = { ...category, category: '' }
    try {
      await axiosUrl.post<IResCategory>('/category', category0)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory
        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('El nombre de la categoría es requerido')
      }
    }
  })

  it('error de categoria min', async () => {
    const category0 = { ...category, category: 'ca' }
    try {
      await axiosUrl.post<IResCategory>('/category', category0)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory
        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal(
          'El nombre de la categoría debe tener al menos 3 caracteres'
        )
      }
    }
  })

  it('error de descripción vacia', async () => {
    const category0 = { ...category, description: '' }
    try {
      await axiosUrl.post<IResCategory>('/category', category0)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory
        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal(
          'La descripción de la categoría es requerida'
        )
      }
    }
  })

  it('crear categoría', async () => {
    const data = await axiosUrl.post<IResCategory>('/category', category)

    const categoryData = data.data.category as ICategory
    id = categoryData.id!

    expect(data.status).equal(201)
    expect(data.data.status).equal('success')
    expect(data.data.message).equal('Categoría creada correctamente')
  })

  it('error de categoría ya existente', async () => {
    try {
      await axiosUrl.post<IResCategory>('/category', category)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory
        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('La categoría ya existe')
      }
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                        Mostrar todas las categorías                        */
  /* -------------------------------------------------------------------------- */

  it('Mostrar todas las categorias', async () => {
    const data = await axiosUrl.get<IResCategory>('/category/')
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const categories = data.data.category as ICategory[]
    expect(categories.length).equal(1)
    expect(categories[0].category).equal('Categoria 1')
    expect(categories[0].description).equal('Descripción de la categoria 1')
  })

  /* -------------------------------------------------------------------------- */
  /*                           mostrar una cartegoria                           */
  /* -------------------------------------------------------------------------- */

  it('Mostrar una categoría', async () => {
    const data = await axiosUrl.get<IResCategory>(`/category/${id}`)
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const category = data.data.category as ICategory
    expect(category.category).equal('Categoria 1')
    expect(category.description).equal('Descripción de la categoria 1')
  })

  /* -------------------------------------------------------------------------- */
  /*                               update category                              */
  /* -------------------------------------------------------------------------- */

  it('Actualizar una categoría', async () => {
    const category0 = { ...category, category: 'Categoria 2' }
    const data = await axiosUrl.put<IResCategory>(`/category/${id}`, category0)
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    expect(data.data.message).equal('Categoría actualizada correctamente')
  })

  it('error en actualizar una categoría', async () => {
    const category0 = { ...category, category: 'Categoria 3' }
    await axiosUrl.post<IResCategory>('/category', category0)
    try {
      await axiosUrl.put<IResCategory>(`/category/${id}`, category0)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('La categoría ya existe')
      }
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                               delete category                              */
  /* -------------------------------------------------------------------------- */

  it('Eliminar una categoría', async () => {
    const data = await axiosUrl.delete<IResCategory>(`/category/${id}`)
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    expect(data.data.message).equal('Categoría eliminada correctamente')
  })

  it('error en eliminar una categoría', async () => {
    try {
      await axiosUrl.delete<IResCategory>(`/category/${id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory
        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Categoría no encontrada')
      }
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                          Eliminar todos los datos                          */
  /* -------------------------------------------------------------------------- */

  it('eliminar datos cateogría', async () => {
    await CategoryModel.deleteMany({})
  })

  it('error de categoría no existente', async () => {
    try {
      await axiosUrl.get<IResCategory>(`/category/${id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Categoría no encontrada')
      }
    }
  })

  it('error al actualizar categoría no existente', async () => {
    try {
      await axiosUrl.put<IResCategory>(`/category/${id}`, category)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response!.data as IResCategory

        expect(error.response!.status).equal(400)
        expect(data.status).equal('error')
        expect(data.message).equal('Categoría no encontrada')
      }
    }
  })

  it('Mostrar 0 categorias', async () => {
    const data = await axiosUrl.get<IResCategory>('/category/')
    expect(data.status).equal(200)
    expect(data.data.status).equal('success')
    const categories = data.data.category as ICategory[]
    expect(categories.length).equal(0)
  })
})
