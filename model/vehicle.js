const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({

	docentry: {
		type: String
	},
	vehicleno: {
		type: String
	},
	drivername: {
		type: String
	},
	driverphone: {
		type: String
	},
	whatsappno: {
		type: String
	},
	pan: {
		type: String
	},
	rcname: {
		type: String
	},
	accno: {
		type: String
	},
    ifsccode: {
        type: String
	},
	userId: {
		type:String
	}
},{timestamps:true})

module.exports = mongoose.model('vehicle', vehicleSchema)
