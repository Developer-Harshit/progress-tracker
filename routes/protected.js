const rt = require("express").Router();
const { renderIndex } = require("../controller/protected");
const { isLoggedOutMiddleware, verifyMiddleware } = require("../middleware/auth");

rt.get("/",verifyMiddleware,isLoggedOutMiddleware,renderIndex);
module.exports = rt;
