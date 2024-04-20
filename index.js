const express  = require("express") 
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require(./routes/user)
const authRoute = require(./routes/auth)

const  app  = express() 
dotenv.config()

mongoose.connect( process.env.MONGODB_URL)
     .then(()=>console.log("DB Connection Successful"))
     .catch((err)=>{
		console.log(err)
	})

app.get("api/test" , ()=>{

	console.log("Test is Successful")
})


//for postman 
app.use(express.json())
 //endpoint
app.use("/api/auth" , authRoute)
app.use("/api/user" , userRoute)

app.listen(process.env.PORT || 5000 , ()=>{
	console.log("Backend is running ")

})