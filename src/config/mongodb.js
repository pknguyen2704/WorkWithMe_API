import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'
let workWithMeDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  workWithMeDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)

}
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!workWithMeDatabaseInstance) throw new Error('Must connect database first!')
  return workWithMeDatabaseInstance
}
