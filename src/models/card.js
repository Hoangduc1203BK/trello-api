import Joi from 'joi'
import { getDB } from '../config/mongodb.js'
import {ObjectID} from 'mongodb'
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
        const validateValue=await validationSchema(data)
        const insertValue={
            ...validateValue,
            boardId:ObjectID(validateValue.boardId),
            columnId:ObjectID(validateValue.columnId)
        }
        const result=await getDB().collection(collectionSchemaName).insertOne(insertValue)
        const response = await getDB().collection(collectionSchemaName).find({_id:ObjectID(result.insertedId.toString())}).toArray()
        return response[0]
    } catch (error) {
        throw new Error(error)
    }
}
export const cardModel={createNew,collectionSchemaName }

