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

    async cancelOrder(orderId) {
        try {
            const orderToCancel = await order.findById(orderId);
    
            if (!orderToCancel) {
                return {
                    status: 'error',
                    message: 'Không tìm thấy đơn đặt hàng.'
                };
            }
    
            await book.findByIdAndUpdate(orderToCancel.orderBook.book, {
                $inc: {
                    countInStock: +1,
                    amountBorrowed: -1,
                }},
                {new: true}
            );
    
            // Xóa đơn đặt hàng
            await order.findByIdAndDelete(orderId);
    
            return {
                status: 'success',
                message: 'Đã hủy đơn đặt hàng thành công.'
            };
        } catch (error) {
            return {
                status: 'error',
                message: 'Đã xảy ra lỗi khi hủy đơn đặt hàng.'
            };
        }
    }
    

    async findAll(){
        const cursor = await order.find();
        return await cursor;
    }

    async findByUser(payload){
        return await order.find({
            "orderUser.email": payload
        });
    }

    async findById(id){
        return await order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
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