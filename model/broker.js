const mongoose = require('mongoose')

const brokerSchema = mongoose.Schema({

	 brokername: {
		type: String
	},
	userId: {
		type: String
	}
},{ timestamps: true})

module.exports = mongoose.model('broker', brokerSchema)
