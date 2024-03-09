
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderBook: 
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        author: { type: String, required: true },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
    },
    orderUser: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    isReceived: {type: Boolean, default: false},
    isCompleted: { type: Boolean, default: false },
    dateOrdered: { type: String },
    dateReturned: { type: String },
},
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;