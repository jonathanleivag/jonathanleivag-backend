import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || 'prod'
export const PORT: number = process.env.PORT ? +process.env.PORT : 3000
export const MONGO_DB_PROD: string = process.env.MONGO_DB_PROD || ''
export const MONGO_DB_DEV: string = process.env.MONGO_DB_DEV || ''
export const MONGO_DB_TEST: string = process.env.MONGO_DB_TEST || ''
export const COUNT_PORTAFOLIO = process.env.COUNT_PORTAFOLIO
  ? +process.env.COUNT_PORTAFOLIO
  : 6
