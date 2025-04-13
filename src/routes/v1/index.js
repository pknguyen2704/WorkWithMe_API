import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'
import { columnRoutes } from './columnRoutes'
import { cardRoutes } from './cardRoutes'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message: 'APIs V1 are ready to use'})
})

Router.use('/boards', boardRoutes)
Router.use('/columns', columnRoutes)
Router.use('/cards', cardRoutes)
export const APIs_V1 = Router