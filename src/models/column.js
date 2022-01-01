import Joi from 'joi'
import { getDB } from '../config/mongodb.js'
import {ObjectID} from 'mongodb'
const collectionSchemaName = 'Column'
const columnSchema=Joi.object({
    title: Joi.string().min(3).max(30).required().trim(),
    boardId: Joi.string().min(3).max(30).required(),
    cardOrder:Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt:Joi.date().timestamp().default(null),
    destroy:Joi.boolean().default(false)
})
const validationSchema = async (data)=>{
    return await columnSchema.validateAsync(data,{ abortEarly:false })
}
 const createNew= async (data)=>{
    try {
        const validateValue=await validationSchema(data)
        const insertValue={
            ...validateValue,
            boardId: ObjectID(validateValue.boardId)
        }
        const result=await getDB().collection(collectionSchemaName).insertOne(insertValue)
        const response=await getDB().collection(collectionSchemaName).find({_id:ObjectID(result.insertedId.toString())}).toArray()
        return response[0]
    } catch (error) {
        throw new Error(error)
    }
}
const update=async (data,id)=>{
    try {
        const result=await getDB().collection(collectionSchemaName).findOneAndUpdate(
            {_id:ObjectID(id)},
            {$set:data},
            {returnOriginal:false}
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}
const pushNewCard=async (columnId,cardId)=>{
    await getDB().collection(collectionSchemaName).findOneAndUpdate(
        {_id:ObjectID(columnId)},
        {$push:{cardOrder:cardId}},
        {returnOriginal:false}
    )
}
export const columnModel={
    collectionSchemaName,
    createNew,
    update,
    pushNewCard
}

