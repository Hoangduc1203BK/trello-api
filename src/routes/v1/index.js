import express from 'express';
import {HttpStatusCode} from '../../ultilities/constance/const.js'
import {BoardApi} from './board_api.js'
 const route=express.Router();
route.use('/api',BoardApi())
export const apiv1=route