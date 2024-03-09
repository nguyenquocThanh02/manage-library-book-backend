const ApiError = require("../api-error");
const UserService = require("../services/user.service");

// Create and Save a new user
exports.create = async(req, res, next) => {

    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty!"));
    }

    try{
        const userService = new UserService();
        const document = await userService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the book")
        );
    }
};

// Login with email and password
exports.login = async (req, res, next) => {
    try{
        const userService = new UserService();
        const document = await userService.login(req.body);
        if(!document){
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving book with id = ${req.params.id}`
            )
        );
    }
};

// Retrieve all books of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    
    try{
        const userService = new UserService();
        const { name } = req.query;
        if(name){
            documents = await userService.findByName(name);
        }else{
            documents = await userService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving books")
        );
    }

    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try{
        const userService = new UserService();
        const document = await userService.findByEmail(req.params.email);
        if(!document){
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving book with id = ${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const userService = new UserService();
        const document = await userService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "user not found"));
        }
        return res.send({message: "user was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};




