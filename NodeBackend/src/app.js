
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
const cors = require('cors');
const app = express();
const path = require('path');

// Serve the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(cookieParser(),cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))



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

