const router = require("express").Router()
const { verifyToken , verifyTokenAndAuthorization} = require("./verifyToken")





//update
router.put("/:id",verifyTokenAndAuthorization ,async  (req , res)=>{
    if(req.body.password){
       req.body.password = CryptoJS.AES.encrypt(req.body.password ,process.env.PASS_SEC ).toString()
	
    }

    try{
     const updatedUser = await User.findByIdAndUpdate(req.params.id , {
        $set : req.body
     }, 
     
     { new:true }
     
     );
     res.status(200).json(updatedUser)
    }catch(err){
	res.status(500).json(err)
 }
});


module.exprt  = router 













//  TESTING--
// router.get("/usertest"  , (req,res)=>{
// 	res.send("user test is successful ")
// })


// lh:5000/api/user
// router.post("useerposttest" , (req,res)=>{

//     const username = req.body.username
//     console.log(username)
   

// })

