import {MongoClient} from 'mongodb'

let database=null
export const connectDB=async ()=>{
    const client = new MongoClient(process.env.DB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    await client.connect()
    database = await client.db(process.env.DB_NAME)
}
export const getDB= ()=>{
    if(!database) throw new Error('Must connect to DB first')
    return database
}
