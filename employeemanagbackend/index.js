const express = require('express')
const app = express()
let bodyparser=require('body-parser')
app.use(bodyparser.json())
const cors = require('cors');

app.use((req,res,next)=>{
  console.log(req.url+" "+new Date()+ req.headers['token']);
  next()
})
let indexrouter=require('./routes/index.route')
app.use(cors());

app.use('/',indexrouter)


app.listen(3000)
