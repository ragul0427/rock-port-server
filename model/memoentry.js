const mongoose = require('mongoose')

const memoSchema = mongoose.Schema({
	internalno: {
		type: String
	},
	gcno: {
		type: String
	},
	drivername: {
		type: String
	},
	date: {
		type: String
	},
	vehicleno: {
		type: String
	},
	
	driverphone: {
		type: String
	},
	whatsappno: {
		type: String
	},
	userId: {
		type:String
	},
	
},{ timestamps: true})

module.exports = mongoose.model('memo', memoSchema)
