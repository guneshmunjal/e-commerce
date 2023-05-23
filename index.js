const express =  require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan('dev'));

// load the config file

require("dotenv").config();

// finding out the port

const PORT = process.env.PORT;

// use the middleware

app.use(express.json());

// start the server

app.listen(PORT,()=>{
    console.log(`the app is connected succesfully to the ${PORT}`);
})


// connect to the database

const dbconnect = require("./config/database");
dbconnect();

// import the routes

const routing = require("./routes/router");
app.use("/app/v1",routing);

// default routes 

app.get("/",()=>{
    console.log("hi this is running successfully");
});