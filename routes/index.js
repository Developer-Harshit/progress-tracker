const rt = require("express").Router();

rt.get("/",(req,res)=>{
    const data = {
        username:req.username,
        errorMsg:false,
    };
    res.render("index",data)
})
module.exports = rt;
