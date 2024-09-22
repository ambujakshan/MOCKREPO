const express = require("express");
const router = express.Router();

 let reviewtroller=require('../controllers/review.controller')
 router.post('/assignrevewer', reviewtroller.assignrevewer);

 router.put('/submitreview/:id', reviewtroller.submitReview);
 
 router.get('/reviews/:username', reviewtroller.getEmployeeReviews);
 
 module.exports=router;