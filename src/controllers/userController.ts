import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { IResp } from '../interfaces'
import { IUser, RoleModel, UserModel } from '../models'
import { idValidUtil, validationUtil } from '../utils'
import { createUserValidation } from '../validations'

export interface IResUser extends IResp {
  user?: IUser | IUser[]
}

export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response<IResUser>
) => {
  try {
    await validationUtil(createUserValidation, req.body)

    idValidUtil(req.body.role as string)
    const role = await RoleModel.findById(req.body.role)

    if (!role) {
      throw new Error('El rol no existe')
    }

    req.body.role = role

    if (req.body.password !== req.body.passwordConfirmation) {
      throw new Error('Las contraseñas no coinciden')
    }

    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    )

    const user = await UserModel.findOne({ email: req.body.email })

    if (user) {
      throw new Error('El usuario ya existe')
    }

    const newUser = new UserModel(req.body)
    const userCreated = await newUser.save()

    res.status(201).json({
      status: 'success',
      user: userCreated,
      message: 'Usuario creado'
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}
