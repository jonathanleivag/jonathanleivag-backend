import { Request, Response } from 'express'

import { IResp } from '../interfaces'
import { IRole, RoleModel } from '../models'
import { idValidUtil, validationUtil } from '../utils'
import { createRoleValidation } from '../validations'

export interface IResRole extends IResp {
  role?: IRole | IRole[]
}

export const createRole = async (
  req: Request<{}, {}, IRole>,
  res: Response<IResRole>
) => {
  try {
    await validationUtil(createRoleValidation, req.body)
    const roleExist = await RoleModel.findOne({
      role: req.body.role.toUpperCase()
    })

    if (roleExist) {
      throw new Error('El rol ya existe')
    }

    req.body.role = req.body.role.toUpperCase()
    const newRole = new RoleModel(req.body)
    const role = await newRole.save()
    res.status(201).json({
      status: 'success',
      role,
      message: 'Rol creado'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getRoles = async (req: Request, res: Response<IResRole>) => {
  try {
    const roles = await RoleModel.find()

    res.status(200).json({
      status: 'success',
      role: roles,
      message: roles.length ? 'Roles obtenidos' : 'No hay roles'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const getOneRole = async (
  req: Request<{ id: string }>,
  res: Response<IResRole>
) => {
  try {
    idValidUtil(req.params.id)
    const role = await RoleModel.findById(req.params.id)

    if (!role) {
      throw new Error('Rol no encontrado')
    }

    res.status(200).json({
      status: 'success',
      role,
      message: 'Rol obtenido'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const updateRole = async (
  req: Request<{ id: string }, {}, IRole>,
  res: Response<IResRole>
) => {
  try {
    idValidUtil(req.params.id)
    await validationUtil(createRoleValidation, req.body)

    req.body.role = req.body.role.toUpperCase()

    const roleExist = await RoleModel.findOne({
      role: req.body.role
    })

    if (roleExist && roleExist.id !== req.params.id) {
      throw new Error('El rol ya existe')
    }

    const roleUpdate = await RoleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )

    if (!roleUpdate) {
      throw new Error('Rol no encontrado')
    }

    res.status(200).json({
      status: 'success',
      role: roleUpdate,
      message: 'Rol actualizado'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export const deleteRole = async (
  req: Request<{ id: string }>,
  res: Response<IResRole>
) => {
  try {
    idValidUtil(req.params.id)

    const role = await RoleModel.findById(req.params.id)

    if (!role) {
      throw new Error('Rol no encontrado')
    }

    await RoleModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'success',
      message: 'Rol eliminado'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}
