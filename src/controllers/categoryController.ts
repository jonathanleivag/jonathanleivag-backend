import { Request, Response } from 'express'

import { IResp } from '../interfaces'
import { CategoryModel, ICategory } from '../models'
import { idValidUtil, validationUtil } from '../utils'
import { categoryCreateValidation } from '../validations'

export interface IResCategory extends IResp {
  category?: ICategory | ICategory[]
}

export const crearCategory = async (
  req: Request<{}, {}, ICategory>,
  res: Response<IResCategory>
) => {
  try {
    await validationUtil(categoryCreateValidation, req.body)

    const category = await CategoryModel.findOne({
      category: req.body.category
    })

    if (category) {
      throw new Error('La categoría ya existe')
    }

    const newCategory = new CategoryModel(req.body)
    const savaCategory = await newCategory.save()

    res.status(201).json({
      status: 'success',
      message: 'Categoría creada correctamente',
      category: savaCategory
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getCategoryAll = async (
  req: Request,
  res: Response<IResCategory>
) => {
  try {
    const categories = await CategoryModel.find()

    res.status(200).json({
      status: 'success',
      message: 'Categorías obtenidas correctamente',
      category: categories
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getCategoryById = async (
  req: Request<{ id: string }>,
  res: Response<IResCategory>
) => {
  try {
    idValidUtil(req.params.id)
    const category = await CategoryModel.findById(req.params.id)

    if (!category) {
      throw new Error('Categoría no encontrada')
    }

    res.status(200).json({
      status: 'success',
      message: 'Categoría obtenida correctamente',
      category
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const updateCategory = async (
  req: Request<{ id: string }, {}, ICategory>,
  res: Response<IResCategory>
) => {
  try {
    idValidUtil(req.params.id)

    const category = await CategoryModel.findById(req.params.id)

    if (!category) {
      throw new Error('Categoría no encontrada')
    }

    const category0 = await CategoryModel.findOne({
      category: req.body.category
    })

    if (category0 && category0.id !== req.params.id) {
      throw new Error('La categoría ya existe')
    }

    const newCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!newCategory) {
      throw new Error('Categoría no actuliazada')
    }

    res.status(200).json({
      status: 'success',
      message: 'Categoría actualizada correctamente',
      category: newCategory
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response<IResCategory>
) => {
  try {
    idValidUtil(req.params.id)

    const category = await CategoryModel.findById(req.params.id)

    if (!category) {
      throw new Error('Categoría no encontrada')
    }

    const deleteCategory = await CategoryModel.findByIdAndDelete(req.params.id)

    if (!deleteCategory) {
      throw new Error('Categoría no eliminada')
    }

    res.status(200).json({
      status: 'success',
      message: 'Categoría eliminada correctamente',
      category: deleteCategory
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}
