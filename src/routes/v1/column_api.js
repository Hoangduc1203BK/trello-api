import express from "express";
import {ColumnValidation} from '../../validation/column.validation.js'
import {ColumnColtroller} from '../../controllers/column.controller.js'
import { HttpStatusCode } from "../../ultilities/constance/const.js";
export function ColumnApi(){
    const route=express.Router()
    route.post('/createColumn',ColumnValidation.createColumn, async (req, res) => {
        try {
            const result = await ColumnColtroller.createNewColumn(req.body)
            res.status(HttpStatusCode.OK).json(result)
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({
                error: new Error(error).message
            })
        }
    })
    route.put('/update',ColumnValidation.update,async (req, res) => {
        const id=req.query.id
        try {
            const result= await ColumnColtroller.updateColumn(req.body,id)
            res.status(HttpStatusCode.OK).json(result)
        } catch (error) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                error: new Error(error).message
            })
        }
    })
    // route.get('/getFullColumn',async (req, res) =>{
    //     const id=req.query.id
    //     const result =await ColumnColtroller.getFullColumn(id)
    //     try {
    //         res.status(HttpStatusCode.OK).json(result)
    //     } catch (error) {
    //         res.statusCode(HttpStatusCode.INTERNAL_SERVER).json({
    //             error: new Error(error).message
    //         })
    //     }
    // })
    return route
}
