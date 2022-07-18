import { model, Schema } from 'mongoose'

export interface IRole {
  id?: string
  role: string
  createdAt?: string
  updatedAt?: string
}

const RoleSchema = new Schema<IRole>(
  {
    role: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true, versionKey: false }
)

RoleSchema.method('toJSON', function () {
  const { _id, ...rest } = this.toObject()

  return { id: _id, ...rest }
})

export default model<IRole>('Role', RoleSchema)
