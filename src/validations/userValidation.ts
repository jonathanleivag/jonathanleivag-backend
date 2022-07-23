import * as yup from 'yup'

import { IUser } from '../models'

export const createUserValidation: yup.SchemaOf<IUser> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(255, 'El nombre debe tener como máximo 255 caracteres'),
  lastName: yup
    .string()
    .required('El apellido es requerido')
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(255, 'El apellido debe tener como máximo 255 caracteres'),
  image: yup
    .string()
    .url('La imagen tiene que ser un url')
    .required('La imagen es requerida'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('El email es requerido'),
  role: yup.string().required('El rol es requerido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired()
})
