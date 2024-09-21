const express = require("express");
const router = express.Router();

 let userstroller=require('../controllers/users.controller')
 router.route('/getusers').get(userstroller.getUsers)
 router.route('/insertUsers').get(userstroller.insertUsers)

 module.exports=router;