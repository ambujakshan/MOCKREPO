const express = require("express");
const router = express.Router();

 let employeetroller=require('../controllers/employee.controller')
 router.route('/getnames').get(employeetroller.getnames)

   
   router.route('/inserttnames').post(employeetroller.inserttnames );

 router.route('/deleteitem').delete(employeetroller.deleteitem)


 router.route('/updateitem').put(employeetroller.updateitem)


   module.exports=router;