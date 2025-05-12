
const express = require('express');
const cookieParser = require('cookie-parser')
const {connectDB} =require('./config/db')
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const complaintRouter = require('./routes/complaint');
const stateRouter = require('./routes/state')
const districtRouter = require('./routes/district')
const citiesRouter = require('./routes/cities')
const wardsRouter = require('./routes/wards')
const app = express();


app.use(express.json());
app.use(cookieParser())


app.use("/",authRouter,userRouter,stateRouter,districtRouter,citiesRouter,wardsRouter)
app.use("/",complaintRouter);

// Directly call connectDB without promises
connectDB(); 

//For checking the node server status
app.get("/health",(req,res)=>{
    res.send("Node Server is Running");
});


// Start your server
app.listen(4000, () => {
    console.log("Server started on port 4000.");
});

