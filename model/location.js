const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({

	 locationname : {
		type: String
	},
	userId: {
		type: String
	}
},{ timestamps: true})

module.exports = mongoose.model('location', locationSchema)
