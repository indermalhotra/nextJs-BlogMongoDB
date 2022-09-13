import {MongoClient} from 'mongodb';

const connectDatabase = async () => {
    // CONNECTED TO DATABASE newsletter1
    const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');

    return client;
}

const getData = async (client) => {
    const db = client.db();

    // CREATEING COLLECTION IN newsletter1 i.e emails
    const comments = db.collection('events');

    let result =  await comments.find({isFeatured:"true"}).toArray();
    console.log(result)
    return await result;
}

const handler = async (req, res) => {
    if(req.method==="GET"){
        let client;
        try{
            client = await connectDatabase();
        }catch(err){
            res.status(500).json({message:"can not connect to database"});
        }

        try{
            const data = await getData(client);
            res.status(200).json({message:"success", events:data});
        }catch(err){
            res.status(500).json({message:"can not get data from database"});
        }
    }
    
}

export default handler;