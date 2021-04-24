const mongoose = require('mongoose')
const {ordersConnection} = require('../connections')

const orderSchema = new mongoose.Schema({
   site: {type: String, required: true},
   startDate: {type: Date, required: true},
   orders: {
        M:{
            frozen: {type: Number, required: true, default: 0},
            regular: {type: Number, required: true, default: 0} },
        T:{
            frozen: {type: Number, required: true, default: 0},
            regular: {type: Number, required: true, default: 0} },
        W:{
            frozen: {type: Number, required: true, default: 0},
            regular: {type: Number, required: true, default: 0} },
        Th:{
            frozen: {type: Number, required: true, default: 0},
            regular: {type: Number, required: true, default: 0} },
        F:{
            frozen: {type: Number, required: true, default: 0},
            regular: {type: Number, required: true, default: 0} },
        },
})

const Orders = ordersConnection.model("orders", orderSchema)

module.exports = Orders
