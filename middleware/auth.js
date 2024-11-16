const {verify} = require("../lib/utils");
// must be used before any other auth middleware
function verifyMiddleware(req,res,next){
    const token = req.cookies["sus-token"];
    if (token){
        try{
            const data = verify(token)
            if(data.validUser && data.username){
                req.renderData.username = data.username;
                req.renderData.isLogged = true;
            }
        }catch(e){
            res.clearCookie("sus-token");
            console.log("JWT",e);
        }
    }
    next();
}
function isLoggedMiddleware(req,res,next){
    if(req.renderData.isLogged){
        res.redirect("/");
    }
    next();
}
function isLoggedOutMiddleware(req,res,next){
    if(!req.renderData.isLogged){
        res.redirect("/signup");
    }
    next();
}
module.exports = {
    verifyMiddleware,isLoggedMiddleware,isLoggedOutMiddleware
}