// lib imports
const exp = require("express");
const path = require("path")
const cors = require("cors")

// middlewares
const renderDataMiddlewarew = require("./middleware/renderData");
//routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
// app
const app = exp();
// config
const {PORT} = require("./utils/config");
const { connectDB } = require("./utils/db");
// global middlewares
app.use(cors());
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));
app.set("views",path.join(__dirname,"views"));
app.set('view engine',"ejs");
app.use(exp.static(path.join(__dirname,"public")));
app.use(renderDataMiddlewarew);
// routes 
app.use(indexRoutes);
app.use(authRoutes);
connectDB();
// listening to port
app.listen(PORT,"localhost",()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})