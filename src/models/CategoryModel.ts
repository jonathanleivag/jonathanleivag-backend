import { model, Schema } from 'mongoose'

export interface ICategory {
  id?: string
  category: string
  description: string
  createdAt?: string
  updatedAt?: string
}

const CategorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)

CategorySchema.method('toJSON', function () {
  const { _id, ...rest } = this.toObject()

  return { id: _id, ...rest }
})

export default model<ICategory>('Category', CategorySchema)
