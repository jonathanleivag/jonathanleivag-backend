import { Request, Response } from 'express'

import { IOrder, IResp } from '../interfaces'
import { IPortafolio, PortafolioModel, TType } from '../models'
import { COUNT_PORTAFOLIO, idValidUtil, validationUtil } from '../utils'
import {
  portafolioCreateValidation,
  portafolioLimitValidation,
  portafolioMostrarValidation
} from '../validations'

interface IResPortafolio extends IResp {
  portafolio?: IPortafolio | IPortafolio[]
}

export interface IPortafolioLimit extends IOrder {
  limit: number
  type?: TType
}

export interface IReqPortafolio extends IOrder {
  type?: TType
}

export const crearPortafolio = async (
  req: Request<{}, {}, IPortafolio>,
  res: Response<IResPortafolio>
) => {
  try {
    req.body.type = req.body.type || 'portafolio'
    await validationUtil(portafolioCreateValidation, req.body)

    const portafolioExist = await PortafolioModel.findOne({
      name: req.body.name,
      type: req.body.type
    })

    if (portafolioExist) {
      throw new Error('El portafolio ya existe')
    }

    const portafolioCount = await PortafolioModel.count({
      type: req.body.type
    })

    if (portafolioCount >= COUNT_PORTAFOLIO) {
      throw new Error('Tienes el máximo de portafolios')
    }

    const newPortafolio = new PortafolioModel(req.body)
    const portafolio = await newPortafolio.save()

    res.status(201).json({
      status: 'success',
      portafolio,
      message: 'Portafolio creado'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getAllPortafolios = async (
  req: Request<{}, {}, {}, IReqPortafolio>,
  res: Response<IResPortafolio>
) => {
  try {
    req.query.order = req.query.order || 'asc'
    req.query.type = req.query.type || 'portafolio'
    await validationUtil(portafolioMostrarValidation, {
      order: req.query.order,
      type: req.query.type
    })

    const portafolios = await PortafolioModel.find({
      type: req.query.type
    }).sort({
      _id: req.query.order
    })

    res.status(200).json({
      status: 'success',
      portafolio: portafolios,
      message:
        portafolios.length > 0 ? 'Portafolios obtenidos' : 'No hay portafolios'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getLimitPortafolios = async (
  req: Request<{}, {}, {}, IPortafolioLimit>,
  res: Response<IResPortafolio>
) => {
  try {
    req.query.order = req.query.order || 'asc'
    req.query.type = req.query.type || 'portafolio'
    await validationUtil(portafolioLimitValidation, {
      limit: +req.query.limit,
      order: req.query.order,
      type: req.query.type
    })
    const portafolios = await PortafolioModel.find({
      type: req.query.type
    })
      .sort({
        _id: req.query.order
      })
      .limit(+req.query.limit)

    res.status(200).json({
      status: 'success',
      portafolio: portafolios,
      message: 'Portafolios obtenidos'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getPortafolioById = async (
  req: Request<{ id: string }>,
  res: Response<IResPortafolio>
) => {
  try {
    idValidUtil(req.params.id)

    const portafolio = await PortafolioModel.findById(req.params.id)

    if (!portafolio) {
      throw new Error('Portafolio no encontrado')
    }

    res.status(200).json({
      status: 'success',
      portafolio,
      message: 'Portafolio obtenido'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const deletePortafolio = async (
  req: Request<{ id: string }>,
  res: Response<IResPortafolio>
) => {
  try {
    idValidUtil(req.params.id)

    const portafolio = await PortafolioModel.findById(req.params.id)

    if (!portafolio) {
      throw new Error('Portafolio no encontrado')
    }
    await PortafolioModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'success',
      message: 'Portafolio eliminado'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const updatePortafolio = async (
  req: Request<{ id: string }, {}, IPortafolio>,
  res: Response<IResPortafolio>
) => {
  try {
    idValidUtil(req.params.id)

    const portafolio = await PortafolioModel.findById(req.params.id)

    if (!portafolio) {
      throw new Error('Portafolio no encontrado')
    }

    const portafolio0 = await PortafolioModel.findOne({ name: req.body.name })

    if (portafolio0 && portafolio0.id !== req.params.id) {
      throw new Error('El portafolio ya existe')
    }

    const update = await PortafolioModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json({
      status: 'success',
      message: 'Portafolio actualizado',
      portafolio: update as IPortafolio
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}
