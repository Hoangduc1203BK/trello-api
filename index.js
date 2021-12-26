import express from "express";
import dotenv from "dotenv";
import { connectDB,getDB } from "./src/config/mongodb.js";
import {boardModel} from './src/models/board.js'
import {cardModel} from './src/models/card.js'
import {apiv1} from './src/routes/v1/index.js'
dotenv.config();

connectDB()
.then(()=>console.log("Connect successful"))
.then(()=>Main())
.catch(err=>{
    console.error(err)
    process.exit(1)
})

const Main = async () => {
  const app = express();
  const PORT = process.env.PORT;
  app.use(express.json());
  let db=await getDB()
  app.use('/v1',apiv1)
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server listening on: ", PORT);
  });
};
