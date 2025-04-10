import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {

  try {
    console.log('request body final', req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Loi vlin')
    res.status(StatusCodes.CREATED).json({ message:'ControllerLayer: API create new board' })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}