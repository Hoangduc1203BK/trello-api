import {MongoClient} from 'mongodb'

let db=null
export const connectDB=async ()=>{
    const client = new MongoClient(process.env.DB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    await client.connect()
    db=await client.db(process.env.DB_NAME)
}
export const getDB= ()=>{
    if(!db) throw new Error('Must connect to DB first')
    return db
}
