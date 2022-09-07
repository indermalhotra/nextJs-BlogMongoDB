const handler = (req, res) => {
    if (req.method === "POST") {
        let eventId = req.query.eventId;
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

        res.status(201).json({ message: "Success", data: data });
    }

    if(req.method=== 'GET'){
        const dummyData = [
            {id:'e1', name:'Inder', text:'comment 1'},
            {id:'e2', name:'Ekum', text:'comment 2'},
            {id:'e3', name:'Preeti', text:'comment 3'}
        ]

        res.status(200).json({comments:dummyData});
    }
}

export default handler;