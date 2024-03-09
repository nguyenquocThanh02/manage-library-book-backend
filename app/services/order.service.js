const { ObjectId } = require("mongodb");
const order = require("../models/order.model");
const book = require("../models/book.model");

class orderService{
    async create(payload) {
        const enough = await book.findOneAndUpdate(
            {
                _id: payload.orderBook.book,
                countInStock: {$gte: 1}
            },
            {$inc: {
                countInStock: - 1,
                amountBorrowed: + 1,
            }},
            {new: true}
        )
        if(enough !== null){
            const result = await order.create(
                payload
            );
            return result;
        }else{
            return {
                status: 'error',
                message: 'Sách không có sẵn.'
            }
        }
    }

    async findAll(){
        const cursor = await order.find();
        return await cursor;
    }

    async findAllOfUser(email){
        return await order.find({
            "orderUser.email": email
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await order.findOneAndUpdate(
            filter,
            { $set: payload },
            { returnDocument: 'after' }
        )
        return result;
    }

}

module.exports = orderService;