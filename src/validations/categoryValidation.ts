import * as yup from 'yup'

import { ICategory } from '../models'

export const categoryCreateValidation: yup.SchemaOf<ICategory> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    category: yup
      .string()
      .required('El nombre de la categoría es requerido')
      .min(3, 'El nombre de la categoría debe tener al menos 3 caracteres'),
    description: yup
      .string()
      .required('La descripción de la categoría es requerida'),
    createdAt: yup.string().notRequired(),
    updatedAt: yup.string().notRequired()
  })
