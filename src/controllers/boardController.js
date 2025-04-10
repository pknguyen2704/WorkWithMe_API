import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {

  try {
    console.log('request body final', req.body)
    res.status(StatusCodes.CREATED).json({ message:'ControllerLayer: API create new board' })
  } catch (error) {1
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}