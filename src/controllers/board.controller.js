import express from "express";
import { boardModel } from "../models/board.js";
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
    result.columns.forEach(column =>{
      const arrCard=result.cards.filter(card =>card.columnId.toString()==column._id.toString())
      column.cards=arrCard
    })
    const {cards,...rest}=result
    return rest
  } catch (error) {
    throw new Error(error);
  }
};
export const BoardColtroller = { createNewBoard, getFullBoard };
