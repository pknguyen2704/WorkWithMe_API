import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { corsOptions } from './config/cors'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cors from 'cors'

const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use('/v1', APIs_V1)

  //middleware xu ly loi
  app.use(errorHandlingMiddleware)
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`BE is running in Production Mode at port: ${process.env.PORT}/`)
    })
  }
  else {
    app.listen(env.LOCALDEV_APP_PORT, env.LOCALDEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running in Dev Mode at ${ env.LOCALDEV_APP_HOST }:${ env.LOCALDEV_APP_PORT }/`)
    })
  }
  exitHook(() => {
    CLOSE_DB()
  })
}

(async() => {
  try {
    console.log('Connected to MongoDB')
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()