import express from "express";
import {BoardValidation} from '../../validation/board.validation.js'
import {BoardColtroller} from '../../controllers/board.controller.js'
import { HttpStatusCode } from "../../ultilities/constance/const.js";
export function BoardApi(){
    const route=express.Router()
    route.post('/createBoard',BoardValidation.createBoard, async (req, res) => {
        const result = await BoardColtroller.createNewBoard(req.body)
        try {
            res.status(HttpStatusCode.OK).json(result)
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({
                error: new Error(error).message
            })
        }
    })
    route.get('/getBoard',async (req, res) => {
        const id=req.query.id
        try {
            const result=await BoardColtroller.getFullBoard(id)
            res.status(HttpStatusCode.OK).json(result)
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({
                error: new Error(error).message
            })
        }
    })
    route.put('/updateColumnOrder',BoardValidation.updateColumnOrder,async (req, res)=>{
        const id=req.query.id
        try {
            const result= await BoardColtroller.updateColumnOrder(req.body,id)
            res.status(HttpStatusCode.OK).json(result)
        } catch (error) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                error: new Error(error).message
            })
        }
    })
    return route
}
