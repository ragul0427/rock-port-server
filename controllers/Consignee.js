const Consignee = require("../model/consignee")

const getConsignee = async (req, res) => {
    try {
        // authMiddleware(req, res)
        // console.log(req)
        const { search } = req.query
        // const regexQuery = { $regex: search, $options: "i" };
		const regexQuery = new RegExp(search, "i");
        
      
       
        if (search !== ""){
            const result = await Consignee.find({
                $or: [
                  { name: regexQuery },
                  { place: regexQuery },
                 
                ],
            });
            return res.status(200).json({ message: result });
        } else {
            const result = await Consignee.find(); 
            return res.status(200).json({ message: result });
        }
        
    
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  };

const createConsignee = async (req, res) => {
	

	try {
		const result = await Consignee.create({
			...req.body
		})
		return res.status(200).send({
			message: result
		})
	} catch (err) {
		return res.status(404).send({
			message: "failed"
		})
	}
}


const deleteConsignee = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const result = await Consignee.findByIdAndDelete(id)
		return res.status(200).send({
			message: "successfully deleted"
		})
	} catch (err) {
		return res.status(404).json({
			error: "failed"
		})
	}
}

const updateConsignee = async (req, res) => {
	
	try {
		const {
			id
		} = req.params;
		const {
			name,
			address,
			place,
			phone,
			contactPerson,
			gstno,
			mail,
			transport
		} = req.body
		const result = await Consignee.findByIdAndUpdate(id, {
			...req.body
		})
		return res.status(200).send({
			message: result
		})
	} catch (err) {
		return res.status(404).json({
			error: "failed"
		})

	}
}


module.exports = {
	getConsignee,
	createConsignee,
	deleteConsignee,
	updateConsignee
}
