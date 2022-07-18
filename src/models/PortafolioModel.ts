import { model, Schema } from 'mongoose'

export type TType = 'portafolio' | 'frontend_mentor'

export interface IPortafolio {
  id?: string
  name: string
  description: string
  image: string
  url: string
  urlGithub?: string
  type?: TType
  createdAt?: string
  updatedAt?: string
}

const PortafolioSchema = new Schema<IPortafolio>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    urlGithub: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'portafolio'
    }
  },
  { timestamps: true, versionKey: false }
)

PortafolioSchema.method('toJSON', function () {
  const { _id, ...rest } = this.toObject()

  return { id: _id, ...rest }
})

export default model<IPortafolio>('Portafolio', PortafolioSchema)
