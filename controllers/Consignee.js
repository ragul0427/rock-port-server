const Consignee=require("../model/consignee")

const getConsignee = async (req, res) => {
    
    try {
        const { search } = req.query
        const regexQuery = { $regex: search, $options: "i" };
        
        if (search !== "") {
            const result = await Consignee.find({
                $or: [
                    { drivername: regexQuery },
                    { vehicleno: !isNaN(search) ? Number(search) : null },
                    { driverphone: !isNaN(search) ? Number(search) : null },
                    { address: regexQuery },
                ],
            });
        }
    } catch (err) {
        return res.status(200).json({ message: "failed" })
    }
}


const createConsignee = async (req, res) => {
    console.log(req.body)
   
    try {
        const result = await Consignee.create({ ...req.body })
        return res.status(200).send({ message: result})
    } catch (err) {
        return res.status(404).send({ message: "failed" })
    }
}


const deleteConsignee=async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Consignee.findByIdAndDelete(id)
        return res.status(200).send({message:"successfully deleted"})
    } catch (err) {
        return res.status(404).json({error:"failed"})
   }
}

const updateConsignee = async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.params;
        const {name,address,place,phone,contactPerson,gstno,mail,transport}=req.body
        const result = await Consignee.findByIdAndUpdate(id, { ...req.body })
        return res.status(200).send({ message: result})
    } catch (err) {
        return res.status(404).json({error:"failed"})
        
    }
}




module.exports = {
    getConsignee,createConsignee,deleteConsignee,updateConsignee
}