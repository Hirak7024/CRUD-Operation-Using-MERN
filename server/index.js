const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors())
app.use(express.json()) //to send and receive data in the form of json

const PORT = process.env.PORT || 8080;

//Schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
},{
    timestamps:true
})

const userModel = mongoose.model("user",schemaData) // this will create a collection named 'users' under DB crud. although we wrote 'user', but an 's' will be automatically added.

//get method is used to read
app.get('/', async(req,res)=>{
    const data = await userModel.find({})
    res.json({success:true , data:data})
})

//post method is used to create or save data
app.post('/create', async(req,res)=>{  //generally a function returns the value the moment it is called. But when we use async before a function it tells the function to return a promise and not to return value immediately
    console.log(req.body)
    const data = new userModel(req.body)  //to save the datasend from backend in database
    await data.save()  // .save method returns a promise thats why we use await. And await works only inside of an async function
    res.send({success:true,message:"data saved successfully", data:data})
})

//put method is used to update data in the DB
app.put('/update', async(req,res)=>{
    console.log(req.body);
    const {_id, ...rest} = req.body;  //to take the id and the field to be updated as an object from the body of the request
    const data = await userModel.updateOne({_id : _id}, rest)  //targeting that id and passing the field to be updated
    res.send({success:true , message:"Data updated successfully", data:data})
})

//delete data from DB
app.delete('/delete/:id', async(req,res)=>{  //acceptng the id at the request
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id : id})
    res.send({success:true , message:"Data deleted successfully", data:data});
})

mongoose.connect("mongodb://127.0.0.1:27017/crud")
.then(()=>{
    console.log("Mongoose Connected");
    app.listen(PORT, ()=> console.log("Server Connected"))
})
.catch((err)=>console.log(err))