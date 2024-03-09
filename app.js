const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/book.route");
const usersRouter = require("./app/routes/user.route");
const ordersRouter = require("./app/routes/order.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);



app.use((req,res,next)=>{
    return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next)=>{
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;