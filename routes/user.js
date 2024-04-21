const router = require("express").Router()
const User = require("../models/User");
const { verifyToken , verifyTokenAndAuthorization, VerifyTokenAndAdmin} = require("./verifyToken")



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


//DELETE 
router.delete("/:id" , verifyTokenAndAuthorization, async (req , res )=>{
   try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("user has been Deleted ")
   } catch(err){
      res.status(500).json(err)
    }
})



//GET USER 
router.get("/find/:id" , VerifyTokenAndAdmin, async (req , res )=>{
   try {
      const user = await User.findById(req.params.id)
      const {password, ...others} = user._docs 
	   res.status(200).json(...others)
   } catch(err){
      res.status(500).json(err)
    }
})


//GET ALL USER 
router.get("/find/:id" , VerifyTokenAndAdmin, async (req , res )=>{
   const query = req.query.new
   try {
      const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
      const {password, ...others} = users._docs 
	   res.status(200).json(...others)
   } catch(err){
      res.status(500).json(err)
    }
})


// GET USER STATS
router.get("/stats" , VerifyTokenAndAdmin , async (req , res )=>{

   const date = new Date()
   const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

   try {
      
      const data = await User.aggregate([
         {$match: {createdAt: {$gte:lastYear}}},
         {
            $project:{
               $month: { $month:$createdAt},
            },
         },

         {
            $group:{
               _id:"$month",
               total:{ $sum:1},
            }
         }
      ])


   } catch(err){
      res.status(500).json(err)
    }


})


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

