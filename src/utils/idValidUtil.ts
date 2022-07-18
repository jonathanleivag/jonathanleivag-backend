import { Types } from 'mongoose'

export const idValidUtil = (id: string) => {
  if (Types.ObjectId.isValid(id)) {
    if (String(new Types.ObjectId(id)) !== id) {
      throw new Error('El id no es valido')
    }
  } else {
    throw new Error('El id no es valido')
  }
}
