
const express = require('express');
const {connectDB} =require('./config/db')

const app = express();


connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log("Server started on port 4000.");
    })
}).catch((err)=>{
    console.error('❌ Failed to start server due to DB connection failure');
    process.exit(1); // optional: stop the process
})


