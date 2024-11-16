const { userSchema } = require("../lib/config");
const { executeValueQuery, executeQuery } = require("../lib/db");
const { hash, sign, compareHash, verify } = require("../lib/utils");
const renderSignup = (req,res)=>{
    res.render("signup",req.renderData);
}
const signup = async (req,res)=>{
    const {username,password} = req.body;
    req.renderData.username = username;
    req.renderData.password = password;
    
    let result;
    //creating table
    try{
        await executeQuery(userSchema);
    }
    catch(e){
        console.log("USERNAME PASSWORD",username,password,e);
        res.status(503);
        req.renderData.errorMsg = "Something went wrong"
        res.render("signup",req.renderData);
        return;
    }
    let query = "SELECT * FROM USERS WHERE username = ?"
    try{
        result = await executeValueQuery(query,[username]);
    }catch(e){
        res.status(501);
        req.renderData.errorMsg = "Something went wrong"
        res.render("signup",req.renderData);
        return;
    }
    console.log("RES_>",result);
    if (result.length){
        res.status(401);
        req.renderData.errorMsg = "User already exist."
        res.render("signup",req.renderData);
        return;
    }    
    if (password.trim().length < 8){
        res.status(400);
        req.renderData.errorMsg = "Password must be more than 8 characters"
        res.render("signup",req.renderData);
        return;
    }
    const hashed = hash(password);
    query = "INSERT INTO USERS (username , password) VALUES (? , ?)";
    try{
        await executeValueQuery(query,[username,hashed]);
    }catch(e){
        res.status(502);
        req.renderData.errorMsg = "Something went wrong"
        res.render("signup",req.renderData);
        return;
    }
    const token = sign({username,validUser:true});
    res.cookie("sus-token",token);
    res.status(200);
    res.redirect("/");
}

const renderLogin = (req,res)=>{
    res.render("login",req.renderData);
}
const login = async (req,res)=>{
    const {username,password} = req.body;
    req.renderData.username = username;
    req.renderData.password = password;
    let result;
    //creating table
    try{
        await executeQuery(userSchema);
    }
    catch{
        res.status(500);
        req.renderData.errorMsg = "Something went wrong"
        res.render("login",req.renderData);
        return;
    }
    let query = "SELECT * FROM USERS WHERE username = ?"
    try{
        result = await executeValueQuery(query,[username]);
    }catch(e){
        res.status(500);
        req.renderData.errorMsg = "Something went wrong"
        res.render("login",req.renderData);
        return;
    }
    
    if (!result.length){
        res.status(404);
        req.renderData.errorMsg = "User does not exist."
        res.render("login",req.renderData);
        return;
    }
    console.log("COMPARE _>",compareHash(password,result[0].password));
    if( !compareHash(password,result[0].password)){
        res.status(400);
        req.renderData.errorMsg = "Password does not match."
        console.log(req.renderData);
        res.render("login",req.renderData);
        return;
    }
    const token = sign({username,validUser:true});
    res.cookie("sus-token",token);
    res.status(200);
    res.redirect("/");
}

const renderLogout = (req,res)=>{
    res.render("logout",req.renderData);
}
const logout = (req,res)=>{
    if(!req.renderData.isLogged){
        res.redirect("/signup");
        return;
    }
    res.clearCookie("sus-token");
    res.status(200);
    res.redirect("/signup");
}

module.exports = {
    renderSignup,renderLogin,renderLogout,
    signup      ,login      , logout
};
