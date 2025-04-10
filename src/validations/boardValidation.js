import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = ((req, res, next) => { 

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    res.status(StatusCodes.CREATED).json({message:'Note: API create new board'})
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY)
  }
})

export const boardValidation = {
    createNew
}