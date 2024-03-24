const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({

	fromdate: {
		type: String
	},
    todate: {
       type: String 
    },
    vehicleno : {
       type: String
    },
    panno : {
       type: String
    },
    rcname: {
       type : String
    },
    locationfrom : {
         type: String
    },
    locationto : {
        type: String
    },
    consignor: {
        type: String
    },
    consignee : {
        type: String
    },
    brokername : {
         type: String
    },
    lrno: {
        type: String
    },
    lramount : {
        type : Number
    },
    userId: {
        type:String
    }
},{ timestamps: true})

module.exports = mongoose.model('report', reportSchema)
