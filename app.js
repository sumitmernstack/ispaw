require("dotenv").config();
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require("body-parser")
const cors =require('cors')
const imageroute=require("./route/image")

// mongodb
mongoose.
connect(process.env.DATABASE, {
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex:true,
useUnifiedTopology:true
}).then(()=>{
    console.log("database connected")
});
// express
const app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

//Route

app.use("/api",imageroute);
port=3000;
app.listen(port,()=> console.log('running on port no', `${port}`));