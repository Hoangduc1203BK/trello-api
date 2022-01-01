import express from "express"
import { columnModel } from "../models/column.js"
import { boardModel } from "../models/board.js"
const createNewColumn= async (data)=>{
    try{
        const newColumn = await columnModel.createNew(data)
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
    const result = await columnModel.update(filter,id)
    return result;
   } catch (error) {
       throw new Error(error)
   }
}
export const ColumnColtroller={createNewColumn,updateColumn}