const { ObjectId } = require("mongodb");
const book = require("../models/book.model");

class bookService{
    async create(payload) {
        const result = await book.findOneAndUpdate(
            payload,
            { $set: { favorite: payload.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    // async create(payload) {
    //     const result = await book.create(
    //         payload
    //     );
    //     return result;
    // }

    async find(filter){
        const cursor = await book.find(filter);
        console.log(cursor)
        return await cursor;

    }

    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"}
        })
    }

    async findById(id){
        return await book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await book.findOneAndUpdate(
            filter,
            { $set: payload },
            { returnDocument: 'after' }
        )
        return result;
    }

    async delete(id){
        const result = await book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll(){
        const result = await book.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = bookService;