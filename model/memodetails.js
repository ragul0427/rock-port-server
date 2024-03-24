const mongoose = require('mongoose')

const memodetailsSchema = mongoose.Schema({

	locationfrom: {
		type: String
	},
    locationto: {
        type: String
	},
	consignor: {
		type:String
	},
    consignee: {
		type: String
	},
	lotno: {
		type: String
	},
	prnoform:{
		type: String
	},
	Prnoto: {
		type: String
	},
	quantity: {
		type: String
	},
	lramount: {
		type: String
	},
	brokername: {
		type: String
	},
    brokercommission: {
        type:String
    },
    memomethod: {
        type:String
    },
    lorryfreight: {
        type:String
    },
    remarks: {
        type: String
    },
    accountpaid: {
        type: String
    },
    invoiceno: {
        type: String
    },
    valueofgoods: {
        type: String
    },
    quality: {
        type: String
    },
    pressmark: {
        type:String
    },
    userId: {
        type:String
    },
    memoId: {
        type:String,
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
	drivername : {
		type : String
	},
	driverphone: {
		type: String
	},
	driverwhatsappno: {
		type: String
	},
    pan: {
		type: String
	},
	rcname: {
		type: String
	},
},{ timestamps: true})

module.exports = mongoose.model('memodetails', memodetailsSchema)