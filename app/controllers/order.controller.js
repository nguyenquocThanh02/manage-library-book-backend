const ApiError = require("../api-error");
const OrderService = require("../services/order.service");

// Create and Save a new Order
exports.create = async(req, res, next) => {
    try{
        const orderService = new OrderService();
        const document = await orderService.create(req.body);

        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the book")
        );
    }
};

// cancel order
exports.cancelOrder = async(req, res, next) => {
    try{
        const orderService = new OrderService();
        const document = await orderService.cancelOrder(req.params.orderId);

        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while cancelling the book")
        );
    }
};

// Retrieve all orders of a Order from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    
    try{
        const orderService = new OrderService();
        documents = await orderService.findAll();
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving books")
        );
    }

    return res.send(documents);
};

exports.findAllOfUser = async (req, res, next) => {
    try{
        const orderService = new OrderService();
        const document = await orderService.findByUser(req.params.email);
        if(!document){
            return next(new ApiError(404, "Order not found"));
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

exports.findById = async (req, res, next) => {
    try{
        const orderService = new OrderService();
        const document = await orderService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Order not found"));
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
        const orderService = new OrderService();
        const document = await orderService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Order not found"));
        }
        return res.send({message: "Order was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating Order with id=${req.params.id}`)
        );
    }
};




