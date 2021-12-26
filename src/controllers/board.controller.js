import express from "express"
import { boardModel } from "../models/board.js"
const createNewBoard= async (data)=>{
    const result = await boardModel.createNew(data)
    console.log(result);
}
export const BoardColtroller={createNewBoard}