let express =require ("express");
const router = express.Router();
let Listing =require("../module/listing.js")
let Review= require("../module/review.js")
const AsynExceHand= require("../utils/AsynExcepHandler.js");
let {islogin,isuserhaveaccesto_Id,isreviewowner} = require("../middleware.js")
let {home,userview,newpostform,newpostdata,editpost,editpostdata,deletepost,addreview,deletereview}=require("../controler/allthing.js");

//rout related to post

router.get("/", AsynExceHand(home));
 
router.get("/listing/:id",AsynExceHand(userview));

router.get("/new",islogin,newpostform);
  
router.post("/new",islogin,AsynExceHand(newpostdata));
 
router.get("/listing/:id/edit",islogin, AsynExceHand(editpost));
 
router.post("/listing/:id/edit",isuserhaveaccesto_Id, AsynExceHand(editpostdata));

router.delete("/listing/:id", islogin,isuserhaveaccesto_Id,AsynExceHand(deletepost))



//post related to review related to post


router.post("/review/:id",islogin,AsynExceHand( addreview))
  

router.delete("/listing/:postid/review/:reviewid",islogin,isreviewowner, AsynExceHand(deletereview)) 


  
  module.exports=router;