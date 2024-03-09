const { ObjectId } = require("mongodb");
const user = require("../models/user.model");
const bcrypt = require("bcrypt");

class userService{
    async create(payload) {
        payload.password = bcrypt.hashSync(payload.password, 10);
        const result = await user.findOneAndUpdate(
            payload,
            { $set: { isAdmin: payload.isAdmin === true } },
            { returnDocument: "after", upsert: true }
        );

        return result;
    }

    async login(payload){
        
        const result = await user.findOne(
            {email: payload?.email}
        )

        if(bcrypt.compareSync(payload.password, result.password)){
            return result;
        }
        return {
            status: 400,
            message: "Password incorrect!!!"
        }

    }

    async find(filter){
        const cursor = await user.find(filter);
        return await cursor;

    }

    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"}
        })
    }

    async findByEmail(email){
        return await user.findOne({
            email: email
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await user.findOneAndUpdate(
            filter,
            { $set: payload },
            { returnDocument: 'after' }
        )
        return result;
    }

    async delete(id){
        const result = await user.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll(){
        const result = await user.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = userService;