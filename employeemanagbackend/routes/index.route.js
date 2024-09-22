const express = require("express");
const router = express.Router();
let adminRouter=require('./employee.route')

let usersRoute=require('./users.route')
let reviewRoute=require('./review.route')

router.use('/employee',adminRouter);
router.use('/users',usersRoute);
router.use('/review',reviewRoute);


module.exports = router;
