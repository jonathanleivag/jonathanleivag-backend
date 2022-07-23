import { model, Schema } from 'mongoose'

import { IRole } from './RoleModel'

export interface IUser {
  id?: string
  name: string
  lastName: string
  image: string
  email: string
  role: IRole | string
  password: string
  passwordConfirmation?: string
  createdAt?: string
  updatedAt?: string
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
      unique: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 255
    }
  },
  { timestamps: true, versionKey: false }
)

UserSchema.method('toJSON', function () {
  const { _id, password, passwordConfirmation, ...rest } = this.toObject()

  return { id: _id, ...rest }
})

export default model<IUser>('User', UserSchema)
