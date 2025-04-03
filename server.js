const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// import schema
const notes = require('./model/noteschema')

// Post API
app.post('/create',async(req,res)=>{
    const postData = notes(req.body)
    const saveData = await postData.save()
    if (saveData){
        res.send("Data is added to the database")
    }
})

// Get API
app.get('/get',async(req,res)=>{
    const getData = await notes.find()
    res.send(getData)

})


// Delete API
app.delete('/delete/:id',async(req,res)=>{
    const deleteData = await notes.deleteOne({_id:req.params.id})
    if(deleteData){
        res.send("Data is deleted!")
    }

})







mongoose.connect('mongodb://localhost:27017/note').then(()=>{
    console.log("Database is succseesfully connected")
})




app.listen(5000,()=>{
    console.log("the server is working")
})

