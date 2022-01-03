import Joi from "joi"
import {HttpStatusCode} from '../ultilities/constance/const.js'
const createCard=async (req,res,next) =>{
    const validationMiddleware =Joi.object({
        boardId:Joi.string().required(),
        columnId:Joi.string().required(),
        title:Joi.string().min(3).max(30).required().trim()
    })
    try {
        await validationMiddleware.validateAsync(req.body,{abortEarly:false} )
        next()
    } catch (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}
const updateCard=async (req,res,next) =>{
    const validationMiddleware =Joi.object({
        title:Joi.string().min(3).max(30).trim(),
        boardId:Joi.string(),
        columnId:Joi.string(),
    })
    try {
        await validationMiddleware.validateAsync(req.body,{abortEarly:false,allowUnknown:true} )
        next()
    } catch (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}
export const CardValidation={createCard,updateCard}