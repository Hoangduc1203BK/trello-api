import Joi from 'joi'
import { getDB } from '../config/mongodb.js'
const collectionSchemaName = 'Board'
const boardSchema=Joi.object({
    title: Joi.string().min(3).max(30).required(),
    columnOrder:Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt:Joi.date().timestamp().default(null),
    destroy:Joi.boolean().default(false)
})
const validationSchema = async (data)=>{
    return await boardSchema.validateAsync(data,{ abortEarly:false })
}
 const createNew= async (data)=>{
    try {
        const value=await validationSchema(data)
        const result= await getDB().collection(collectionSchemaName).insertOne(value)
        return result
    } catch (error) {
        throw new Error(error)
    }
}
export const boardModel={createNew}

