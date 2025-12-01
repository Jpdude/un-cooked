
var express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.set('views', path.join(__dirname, 'public'));
app.get("/login",(req,res)=>{
  console.log("resGet")
  res.status(200).json({"session":"yeahboi"});
})
app.post("/login",(req,res)=>{
  console.log("resPost")
  console.log(req.body);
  if (req.body.id == "johnpaulnjepu08@gmail.com" && req.body.password == "pass"){
    res.status(200);
    res.json({"session":"yeahboi"});
  }else{
    res.status(401);
  }
  
})
module.exports = app;
