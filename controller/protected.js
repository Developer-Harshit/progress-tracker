const renderIndex = (req,res)=>{
    if(!req.renderData.isLogged){
        res.redirect("signup");
    }
    res.render("index",req.renderData);
};
module.exports = {
    renderIndex
};