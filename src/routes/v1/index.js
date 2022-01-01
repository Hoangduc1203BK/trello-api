import express from 'express';
import {BoardApi} from './board_api.js'
import {ColumnApi} from './column_api.js'
import {CardApi} from './card.api.js'
 const route=express.Router();
route.use('/boards',BoardApi())
route.use('/columns',ColumnApi())
route.use('/cards',CardApi())
export const apiv1=route