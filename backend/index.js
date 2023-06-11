const express=require("express");
const app=express();

const cors = require('cors')
//Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const empRouter=require('./routes/emproutes');


//================================================//








app.use('/api',empRouter);

app.listen(3111,()=>{
    console.log("Running on 3111");
})