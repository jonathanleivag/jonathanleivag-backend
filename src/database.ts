/* eslint-disable @typescript-eslint/indent */

import mongoose from 'mongoose'

import { IDoneMocha } from './interfaces'
import { MONGO_DB_DEV, MONGO_DB_PROD, MONGO_DB_TEST, NODE_ENV } from './utils'

const database = async ({ done }: IDoneMocha = { done: undefined }) => {
  try {
    const url =
      NODE_ENV === 'dev'
        ? MONGO_DB_DEV
        : NODE_ENV === 'test'
        ? MONGO_DB_TEST
        : MONGO_DB_PROD

    await mongoose.connect(url)
    // eslint-disable-next-line no-console
    console.log(`MongoDB connected 🌿 ${NODE_ENV}`)
    if (done !== undefined) {
      done()
    }
  } catch (error) {
    console.error('MongoDB not connected ❎', error)
  }
}

export default database
