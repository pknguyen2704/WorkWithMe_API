import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {

  try {
    const createBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
const getDetails = async (req, res, next) => {
  try {
    const boardID = req.params.id
    const board = await boardService.getDetails(boardID)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew,
  getDetails
}