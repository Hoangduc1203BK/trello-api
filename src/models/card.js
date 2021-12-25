import Joi from 'joi'
import { getDB } from '../config/mongodb.js'
const collectionSchemaName = 'Card'
const cardSchema=Joi.object({
    title: Joi.string().min(3).max(30).required(),
    columnId:Joi.string().min(3).max(30).required(),
    boardId: Joi.string().min(3).max(30).required(),
    image: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt:Joi.date().timestamp().default(null),
    destroy:Joi.boolean().default(false)
})
const validationSchema = async (data)=>{
    return await cardSchema.validateAsync(data,{ abortEarly:false })
}
 const createNew= async (data)=>{
    try {
        const value=await validationSchema(data)
        const result=getDB().collection(collectionSchemaName).insertOne(value)
        console.log(result);
    } catch (error) {
        console.error(error)
    }
}
export const cardModel={createNew}

