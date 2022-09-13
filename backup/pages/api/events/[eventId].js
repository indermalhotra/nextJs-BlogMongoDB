import { MongoClient } from "mongodb";

const connectDatabase = async () => {
    // CONNECTED TO DATABASE newsletter1
    const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');

    return client;
}

const postData = async (client, data) => {
    const db = client.db();
    // CREATEING COLLECTION IN newsletter1 i.e emails
    const comments = db.collection('comments');
    //INSERTING DATA TO newsletter1 database emails collection.
    await comments.insertOne(data);
}

const getData = async (client, id) => {
    const db = client.db();

    // CREATEING COLLECTION IN newsletter1 i.e emails
    const comments = db.collection('comments');

    let result =  await comments.find({id:id}).toArray();
    console.log(result)
    return await result;
}



const handler = async(req, res) => {
    let eventId = req.query.eventId;

    if (req.method === "POST") {
        
        const dataRecived = JSON.parse(req.body);

        const email = dataRecived.email;
        const name = dataRecived.name;
        const comment = dataRecived.text;

        if(!email || !email.includes('@') || !email.includes('.') || !name || name.trim() == '' || !comment || comment.trim() == ''){
            res.status(422).json({message:"invalid Input"});
            return;
        }

        let data = {
            id: eventId,
            email,
            name,
            comment,
        }

        let client;
        try{
            client = await connectDatabase();
        }catch(err){
            res.status(500).json({message:"database not connected."});
            return;
        }
      
        try{
            await postData(client, {...data});
            res.status(201).json({ message: "Comment Posted Successfully", data: data });
        }catch(err){
            res.status(500).json({message:"Can not send data."})
        }
       
        client.close();
    }

    if(req.method=== 'GET'){
       
       let client;
       
       try{
            client = await connectDatabase();
       }catch(err){
            res.status(500).json({message:"database can not connected"});
       }

       try{
           let result = await getData(client, eventId);
           console.log(result);
           res.status(200).json({comments:result});
       }catch(err){
           res.status(500).json({message:"database can not connected"});
       }
        
       client.close();
    }
}

export default handler;