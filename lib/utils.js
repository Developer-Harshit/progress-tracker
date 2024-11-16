const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {SALT_ROUNDS,JWT_SECRET} = require("./config");

function hash(password){
    console.log("SALT->",SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(+SALT_ROUNDS);
    return bcrypt.hashSync(password,salt);
}
function compareHash(password,hashedPassword){
    return bcrypt.compareSync(password,hashedPassword);
}
function sign(payload){
    return jwt.sign(payload,JWT_SECRET);
}
function verify(token){
    return jwt.verify(token,JWT_SECRET);
}
module.exports = {
    hash,compareHash,sign,verify
};