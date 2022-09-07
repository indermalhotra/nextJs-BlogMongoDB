const handler = (req, res) => {
    if(req.method === 'POST'){
        const incomingData = JSON.parse(req.body);
        const emailID = incomingData.email;

        if(!emailID || !emailID.includes('@') || !emailID.includes('.')){
            res.status(422).json({message:"invalid data"})
            return;
        }

        res.status(200).json({message:"success", ...incomingData});
    }
}
export default handler;