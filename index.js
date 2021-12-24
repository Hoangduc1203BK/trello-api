import express from "express";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT=process.env.PORT

app.use(express.json())

app.get('/',(req, res) =>{
    res.json('<h1>Hello world!</h1>')
})
app.listen(PORT,(err)=>{
    if(err) throw err
    console.log('Server listening on: ',PORT);
})