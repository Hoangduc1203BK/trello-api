import express from "express"
import { cardModel } from "../models/card.js"
import {columnModel} from "../models/column.js"
const createNewCard= async (data)=>{
    try {
        const result = await cardModel.createNew(data)
         await columnModel.pushNewCard(result.columnId.toString(), result._id.toString())
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const updateCard = async (data,id)=>{
    try {
     const filter={
         ...data,
         updateAt:Date.now(),
     }
  
     if(filter._id) delete filter._id
     const result = await cardModel.updateCard(filter,id)
     return result;
    } catch (error) {
        throw new Error(error)
    }
  }
export const CardColtroller={createNewCard,updateCard}