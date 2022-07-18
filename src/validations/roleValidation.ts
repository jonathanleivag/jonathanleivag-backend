import * as yup from 'yup'

import { IRole } from '../models'

export const createRoleValidation: yup.SchemaOf<IRole> = yup.object().shape({
  id: yup.string().notRequired(),
  role: yup.string().required('El rol es requerido'),
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired()
})
