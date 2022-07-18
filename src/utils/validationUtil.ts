import * as yup from 'yup'

export const validationUtil = async (
  schema: yup.ObjectSchema<any>,
  input: object
) => {
  const isValid = await schema.isValid(input)
  if (!isValid) await schema.validate(input)
}
