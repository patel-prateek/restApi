const express = require("express")
const app = express();
require("dotenv").config()
const mongoose = require("mongoose")


async function main() {
  try{
    await mongoose.connect(process.env.DBurl);
    console.log("connected")
  }catch(e){
    console.log(e);
  }
}
main()


app.use(express.json())

const usersRouter = require("./users") 
app.use('/users', usersRouter)

app.listen(80,()=>{console.log("server started")})