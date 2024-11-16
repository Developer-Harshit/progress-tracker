module.exports = (req,res,next) => {
    req.renderData = {
        status:200,
        errorMsg:false,
        isLogged:false,
        username:false,
    }
    next();
}