const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();


router.route("/")
    .get(orders.findAll)
    .post(orders.create);

// router.route("/login")
//     .post(orders.login);
    
router.route("/:email")
    .get(orders.findAllOfUser);

router.route("/cancel/:orderId")
    .delete(orders.cancelOrder);

router.route("/detail/:id")
    .get(orders.findById);

module.exports = router;