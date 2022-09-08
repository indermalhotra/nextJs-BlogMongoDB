import { MongoClient } from "mongodb";

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

       // CONNECTED TO DATABASE newsletter1
       const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');
       const db = client.db();

       // CREATEING COLLECTION IN newsletter1 i.e emails
       const comments = db.collection('comments');

       //INSERTING DATA TO newsletter1 database emails collection.
       await comments.insertOne({...data});

       client.close();

        res.status(201).json({ message: "Success", data: data });
    }

    if(req.method=== 'GET'){
        // CONNECTED TO DATABASE newsletter1
       const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');
       const db = client.db();

       // CREATEING COLLECTION IN newsletter1 i.e emails
       const comments = db.collection('comments');

        const result = await comments.find().toArray();
        console.log(result);

        const resultFiltered = result.filter(data=> data.id === eventId);

        res.status(200).json({comments:resultFiltered});
    }
}

export default handler;