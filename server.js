// lib imports
const exp = require("express");
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser");

// middlewares
const renderDataMiddleware = require("./middleware/renderData");
//routes
const protectedRoutes = require("./routes/protected");
const authRoutes = require("./routes/auth");
// app
const app = exp();
// config
const {PORT} = require("./lib/config");
const { connectDB } = require("./lib/db");
// global middlewares
app.use(cors());
app.use(cookieParser());
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));
app.set("views",path.join(__dirname,"views"));
app.set('view engine',"ejs");
app.use(exp.static(path.join(__dirname,"public")));
app.use(renderDataMiddleware);
// routes 
app.use(protectedRoutes);
app.use(authRoutes);
connectDB();
// listening to port
app.listen(PORT,"localhost",()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})