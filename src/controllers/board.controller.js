import express from "express";
import { boardModel } from "../models/board.js";
import lodash from "lodash";
const createNewBoard = async (data) => {
  try {
    const result = await boardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getFullBoard = async (id) => {
  try {
    const result = await boardModel.getFullBoard(id);
    if(!result || !result.columns) {
      throw new Error(`Board not found!`)
    }
    const cloneResult=lodash.cloneDeep(result)
    cloneResult.columns = cloneResult.columns.filter(column => column.destroy==false)
    cloneResult.columns.forEach(column =>{
      const arrCard=cloneResult.cards.filter(card =>card.columnId.toString()==column._id.toString())
      column.cards=arrCard
    })
    const {cards,...rest}=cloneResult
    return rest
  } catch (error) {
    throw new Error(error);
  }
};
const updateColumnOrder = async (data,id)=>{
  try {
   const filter={
       ...data,
       updateAt:Date.now(),
   }

   if(filter._id) delete filter._id
   if(filter.columns) delete filter.columns

   const result = await boardModel.updateColumnOrder(filter,id)
   return result;
  } catch (error) {
      throw new Error(error)
  }
}
export const BoardColtroller = { 
  createNewBoard,
  getFullBoard,
  updateColumnOrder };
