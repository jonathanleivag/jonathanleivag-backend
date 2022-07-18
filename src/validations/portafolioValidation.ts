import * as yup from 'yup'

import { IPortafolioLimit, IReqPortafolio } from '../controllers'
import { TOrder } from '../interfaces'
import { IPortafolio, TType } from '../models'

export const portafolioCreateValidation: yup.SchemaOf<IPortafolio> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().required('El nombre es requerido'),
    description: yup.string().required('La descripción es requerida'),
    image: yup
      .string()
      .required('La imagen es requerida')
      .url('La imagen debe ser una URL'),
    url: yup
      .string()
      .required('La url de la web es requerida')
      .url('La url de la web debe ser válida'),
    urlGithub: yup
      .string()
      .notRequired()
      .url('La url de github debe ser válida'),
    type: new yup.StringSchema<TType>()
      .oneOf<TType>(
      ['frontend_mentor', 'portafolio'],
      'El tipo debe ser uno de los siguientes: frontend_mentor, portafolio'
    )
      .notRequired()
      .default('portafolio'),
    createdAt: yup.string().notRequired(),
    updatedAt: yup.string().notRequired()
  })

export const portafolioMostrarValidation: yup.SchemaOf<IReqPortafolio> = yup
  .object()
  .shape({
    order: new yup.StringSchema<TOrder>()
      .oneOf<TOrder>(['asc', 'desc'], 'El orden debe ser uno de los siguientes: asc, desc')
      .required(),
    type: new yup.StringSchema<TType>()
      .oneOf<TType>(
      ['frontend_mentor', 'portafolio'],
      'El tipo debe ser uno de los siguientes: frontend_mentor, portafolio'
    )
      .notRequired()
      .default('portafolio')
  })

export const portafolioLimitValidation: yup.SchemaOf<IPortafolioLimit> = yup
  .object()
  .shape({
    limit: yup.number().required('El límite es requerido'),
    order: new yup.StringSchema<TOrder>()
      .oneOf<TOrder>(['asc', 'desc'])
      .required(),
    type: new yup.StringSchema<TType>()
      .oneOf<TType>(
      ['frontend_mentor', 'portafolio'],
      'El tipo debe ser uno de los siguientes: frontend_mentor, portafolio'
    )
      .notRequired()
      .default('portafolio')
  })
