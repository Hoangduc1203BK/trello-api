import express from "express";
import dotenv from "dotenv";
import { connectDB,getDB } from "./src/config/mongodb.js";
import {boardModel} from './src/models/board.js'
import {cardModel} from './src/models/card.js'
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
  app.get("/", async (req, res) => {
    const fakedata={
        title: "hoangduc",
        columnId:'column-1',
        boardId:'board-1',
        image:'askasmmas'
    }
     await cardModel.createNew(fakedata)
    res.json('done')
  });
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server listening on: ", PORT);
  });
};
