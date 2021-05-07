const mongoose = require('mongoose')
const {ordersConnection} = require('../connections')

const orderSchema = new mongoose.Schema({
    site: {type: String, required: true},
    date: {type: Date, required: true},
    frozen: {type: Number, required: true, default: 0},
    whiteBag: {type: Number, required: true, default: 0},
    brownBag: {type: Number, required: true, default: 0}
})

const Orders = ordersConnection.model("orders", orderSchema)

module.exports = Orders
