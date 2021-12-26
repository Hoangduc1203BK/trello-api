import express from "express";
import {BoardValidation} from '../../validation/validation.js'
import {BoardColtroller} from '../../controllers/board.controller.js'
import { HttpStatusCode } from "../../ultilities/constance/const.js";
export function BoardApi(){
    const route=express.Router()
    route.post('/createBoard',BoardValidation.createCol, async (req, res) => {
        const result = await BoardColtroller.createNewBoard(req.body)
        try {
            res.status(HttpStatusCode.OK).json('ok')
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({
                error: new Error(error).message
            })
        }
    })
    return route
}
