import express from "express"
import { columnModel } from "../models/column.js"
import { boardModel } from "../models/board.js"
import {cardModel } from "../models/card.js"
const createNewColumn= async (data)=>{
    try{
        const newColumn = await columnModel.createNew(data)
        newColumn.cards=[]
        await boardModel.pushColumn(newColumn.boardId.toString(), newColumn._id.toString())
        return newColumn
    }catch(err){
        throw new Error(err)
    }
}
const updateColumn = async (data,id)=>{
   try {
    const filter={
        ...data,
        updateAt:Date.now(),
    }

    if(filter._id) delete filter._id
    if(filter.cards) delete filter.cards

    const result = await columnModel.update(filter,id)
    if(result.destroy==true){
        cardModel.deleteCard(result._id)
    }
    return result;
   } catch (error) {
       throw new Error(error)
   }
}
export const ColumnColtroller={createNewColumn,updateColumn}