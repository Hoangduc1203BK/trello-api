import Joi from "joi"
import {HttpStatusCode} from '../ultilities/constance/const.js'
const createCol=async (req,res,next) =>{
    const validationMiddleware =Joi.object({
        title:Joi.string().min(3).max(30).required()
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
export const BoardValidation={createCol}