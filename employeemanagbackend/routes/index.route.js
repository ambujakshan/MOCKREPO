const express = require("express");
const router = express.Router();
let adminRouter=require('./employee.route')

let usersRoute=require('./users.route')
router.use('/employee',adminRouter);
router.use('/users',usersRoute);

module.exports = router;
