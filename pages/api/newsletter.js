
import {MongoClient} from 'mongodb'
const handler = async(req, res) => {
    if(req.method === 'POST'){
        const incomingData = JSON.parse(req.body);
        const emailID = incomingData.email;

        if(!emailID || !emailID.includes('@') || !emailID.includes('.')){
            res.status(422).json({message:"invalid data"})
            return;
        }

        // CONNECTED TO DATABASE newsletter1
        const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');
        const db = client.db();

        // CREATEING COLLECTION IN newsletter1 i.e emails
        const emailNewsletter = db.collection('emails');

        //INSERTING DATA TO newsletter1 database emails collection.
        await emailNewsletter.insertOne({emailId:emailID});

        client.close();

        res.status(200).json({message:"Subscibes Successfully...", ...incomingData});
    }

    if(req.method === "GET"){
         // CONNECTED TO DATABASE newsletter1
         const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');
         const db = client.db();
 
         // CREATEING COLLECTION IN newsletter1 i.e emails
         const emailNewsletter = db.collection('emails');

         // GET DATA from DATABASE
         const result = await emailNewsletter.find().toArray();

         client.close();

         res.status(201).json({message:"success", emailId:result});
    }
}
export default handler;