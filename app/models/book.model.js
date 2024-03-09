const mongoose= require('mongoose');

const bookSchema= new mongoose.Schema(
    {
        name: {type: String, required: true},
        image: {type: String, required: false},
        type: {type: String, required: true},
        price: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        amountBorrowed: {type: Number, default: 0},
        author: {type: String, required: true},
        datePublish: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const Book= mongoose.model('Book', bookSchema);
module.exports= Book;