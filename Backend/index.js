const express = require("express")
const app = express()
const path = require("path");
const cookieParser= require("cookie-parser")


if(process.env.NODE_ENV !== 'production') {   
    require("dotenv").config({path:"./backend/Config/imp.env"})
}

//using midleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// importing routes
 const route = require("./routes/route")

// //using routes
 app.use("/api/",route)


const { connectDatabase } = require("./config/database")

connectDatabase()



app.listen(process.env.PORT, ()=>{
console.log(`Server is running on port : ${process.env.PORT}` )
})


