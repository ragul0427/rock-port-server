const Consignee = require("../model/consignee")


  const getConsignee = async (req, res) => {
	try {
	  const { search,userId } = req.query;
	  const regexQuery = new RegExp(search, "i");
  
	  const query = {
		$or: [{ name: regexQuery }, { place: regexQuery }],
	  };
	  if (userId) {
		query.userId = userId;
	  }
	  let result;
	  if (search !== ""&&userId!==undefined||null) {
		result = await Consignee.find(query);
	  } else if(userId!==undefined||null) {
		result = await Consignee.find({ userId:userId });
	  }
  
	  return res.status(200).json({ message: result });
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
