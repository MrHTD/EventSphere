const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/eventsphere")

app.listen(3001, () => {
    console.log("Server is running port 3001....");
})