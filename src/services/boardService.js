import { StatusCodes } from "http-status-codes"
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatter"
import { boardModel } from "~/models/boardModel"
import { cloneDeep } from 'lodash'
import { columnModel } from "~/models/columnModel"
import { cardModel } from "~/models/cardModel"
const createNew = async(reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async(boardID) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetails(boardID)
    if (!board) {throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')}
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}
const update = async(boardId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) {
    throw error
  }
}
const moveCardToDifferentColumn = async(reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    await columnModel.update(reqBody.nextColumnId, {
      nextOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })
    return { updateResult: 'successfully!' }
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}