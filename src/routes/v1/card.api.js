import express from 'express';
import { HttpStatusCode } from '../../ultilities/constance/const.js';
import {CardValidation} from '../../validation/card.validation.js'
import {CardColtroller} from '../../controllers/card.controller.js'
export const CardApi=()=>{
    const route=express.Router()
    route.post('/createCard',CardValidation.createCard,async (req, res)=>{
        try {
            const result= await CardColtroller.createNewCard(req.body)
            res.status(HttpStatusCode.OK).json(result)
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({
                error:new Error(error).message
            })
        }
    })
    return route
}