import Joi from 'joi'
import { getDB } from '../config/mongodb.js'
import {ObjectID} from 'mongodb'
import { columnModel } from './column.js'
import { cardModel } from './card.js'
const collectionSchemaName = 'Board'
const boardSchema=Joi.object({
    title: Joi.string().min(3).max(30).required().trim(),
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
        const response=await getDB().collection(collectionSchemaName).find({_id:ObjectID(result.insertedId.toString())}).toArray()
        return response[0]
    } catch (error) {
        throw new Error(error)
    }
}
const pushColumn=async (boardId,columnId)=>{
    try {
        await getDB().collection(collectionSchemaName).findOneAndUpdate(
            {_id:ObjectID(boardId)},
            { $push:{columnOrder:columnId}},
            {returnOriginal:false}
        )
    } catch (error) {
        throw new Error(error)
    }
}
const getFullBoard=async (id)=>{
    try {
        const result=await getDB().collection(collectionSchemaName).aggregate([
            {
                $match:{
                    _id:ObjectID(id),
                    destroy:false
                }
            },{
                $lookup:{
                    from:columnModel.collectionSchemaName,
                    localField:'_id',
                    foreignField:'boardId',
                    as: 'columns'
                }
            },{
                $lookup:{
                    from: cardModel.collectionSchemaName,
                    localField:'_id',
                    foreignField:'boardId',
                    as:'cards'
                }
            }
        ]).toArray()
        return result[0] || {}
    } catch (error) {
     throw new Error(error)   
    }
}
const updateColumnOrder=async (data,id)=>{
    try {
        const updateBoard={...data}
        await getDB().collection(collectionSchemaName).findOneAndUpdate(
            {_id:ObjectID(id)},
            {$set:updateBoard},
            {returnOriginal:false}
        )
        const response=await getDB().collection(collectionSchemaName).find({_id:ObjectID(id)}).toArray()
        return response[0]
    } catch (error) {
        throw new Error(error)
    }
}
export const boardModel={createNew, getFullBoard,pushColumn,updateColumnOrder}

