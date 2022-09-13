
import {MongoClient} from 'mongodb'

const connectDatabase = async () => {
    // CONNECTED TO DATABASE newsletter1
    const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');

    return client;
}

const postData = async (client, document) =>{
    const db = client.db();

    // CREATEING COLLECTION IN newsletter1 i.e emails
    const emailNewsletter = db.collection('emails');

    //INSERTING DATA TO newsletter1 database emails collection.
    await emailNewsletter.insertOne(document);
}

const getData = async (client) => {
    const db = client.db();

    // CREATEING COLLECTION IN newsletter1 i.e emails
    const emailNewsletter = db.collection('emails');

    // GET DATA from DATABASE
    const result = await emailNewsletter.find().toArray();

    return result;
}

const handler = async(req, res) => {
    if(req.method === 'POST'){
        const incomingData = JSON.parse(req.body);
        const emailID = incomingData.email;

        if(!emailID || !emailID.includes('@') || !emailID.includes('.')){
            res.status(422).json({message:"invalid data"})
            return;
        }

        let client;
        try{
            client = await connectDatabase();
        }catch(err){
            res.status(500).json({message:"database connection fail"});
            client.close();
            return;
        }

        try{
            await postData(client, {emailId:emailID});
        }catch(err){
            res.status(500).json({message:"failed to insert data"});
            client.close();
            return;
        }
        
        
        res.status(200).json({message:"Subscibes Successfully...", ...incomingData});
        client.close();
    }

    if(req.method === "GET"){

        let client;
        try{
            client = await connectDatabase();
        }catch(err){
            res.status(500).json({message:"database connection fail"});
            client.close();
            return;
        }

        let result;
        try{
            result = await getData(client);
        }catch(err){
            res.status(500).json({message:"Can not retrive data"});
            client.close();
            return;
        }
 
        res.status(201).json({message:"success", emailId:result});
        client.close();

         
    }
}
export default handler;