
const express = require('express');
const {connectDB} =require('./config/db')
const authRouter = require('./routes/auth');
const app = express();


app.use(express.json());


app.use("/",authRouter)


// Directly call connectDB without promises
connectDB(); 

// Start your server
app.listen(4000, () => {
    console.log("Server started on port 4000.");
});

