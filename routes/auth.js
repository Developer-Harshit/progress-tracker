const rt = require("express").Router();

rt.get("/signup",(req,res)=>{
    const data = {
        username:"",
        password:"",
        errorMsg:false,
    };
    res.render("signup",data);
})

rt.get("/login",(req,res)=>{
    const data = {
        username:"",
        password:"",
        errorMsg:false,
    };
    res.render("login",data)
})
module.exports = rt;
