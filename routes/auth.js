const { renderSignup, signup, renderLogin, login, renderLogout, logout } = require("../controller/auth");
const {isLoggedMiddleware,isLoggedOutMiddleware, verifyMiddleware } = require("../middleware/auth");

const rt = require("express").Router();

rt.get("/signup",verifyMiddleware,isLoggedMiddleware,renderSignup);
rt.post("/signup",verifyMiddleware,isLoggedMiddleware,signup);

rt.get("/login",verifyMiddleware,isLoggedMiddleware,renderLogin);
rt.post("/login",verifyMiddleware,isLoggedMiddleware,login);

rt.get("/logout",verifyMiddleware,isLoggedOutMiddleware,renderLogout);
rt.post("/logout",verifyMiddleware,isLoggedOutMiddleware,logout);

module.exports = rt;
