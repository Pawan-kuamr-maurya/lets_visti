let Listing =require("../module/listing.js")
let Review= require("../module/review.js")

module.exports.home=async(req,res)=>{
    let data= await Listing.find({});
    res.render("allthing/home.ejs",{data})
  }

  module.exports.userview=async (req,res)=>{
    if(req.params.id.length!=24){req.flash("error",`you serch place not in database`); res.redirect("/allthing"); return ;}
   try{  
     let data= await Listing.findOne({_id:req.params.id}).populate({path:"reviews",populate:{path:"reviewby"}}).populate("owner");
   if(!data){
     req.flash("error",`you serch place not in database`); res.redirect("/allthing"); 
   }else{res.render("allthing/userview.ejs",{data});}
   }catch(e){ 
     req.flash("error",`you serch place not in database`); res.redirect("/allthing");}
     console.log(req.params.id.length);
   
     };

  module.exports.newpostform=async (req,res)=>{
        console.log(req.user);
        
                    res.render("allthing/new.ejs");
             }
   
             
  module.exports.newpostdata=async (req,res,next)=>{
        
                let newdata= new Listing(req.body.listing);
                console.log(newdata);
                newdata.owner=req.user._id;   // this will add the ownen who is currently login along with post
                console.log(newdata);
                
                await newdata.save();
                req.flash("message","new item added sussfully");
                res.redirect("/allthing/");                                          
        }

  module.exports.editpost=async (req,res,next)=>{
    let data= await Listing.findOne({_id:req.params.id});
    res.render("allthing/edit.ejs" ,{data})
  }      


  module.exports.editpostdata=async (req,res,next)=>{
    await Listing.findOneAndUpdate({_id:req.params.id},req.body.listing).then(()=>{console.log("sussufukly update");})
    let data= await Listing.findOne({_id:req.params.id});
    req.flash("success_msg",` tourest place ${data.title} update sussfully`);
    res.redirect(`/allthing/listing/${req.params.id}`);
  }



  module.exports.deletepost=async (req,res,next)=>{
    let id= req.params.id;
    let deleteitem=await Listing.findByIdAndDelete(id);
    await Review.deleteMany({_id:{$in:deleteitem.reviews}})  //delete hone ke bad bbhi data data store tha jo hamne deleteitem me rakh liya
    req.flash("message",` tourest place  delete sussfully`);
    res.redirect("/allthing/");   //to many work if post delete then relateed review delete
  }








///************** related to review ******************** */





  module.exports.addreview=async (req,res)=>{
    console.log(req.user);
     
    let  listing = await Listing.findById(req.params.id)   //pahali bat ye ki , koi  bhi relation  //
    let revew= new Review(req.body.review);                // me koi relation store karne ke liye pahale relation ke modal la instance banatae hai
    revew.reviewby=res.locals.currentuser._id;
    listing.reviews.push(revew) ;                                       // tab store karte hai 
    revew.save();    // revew ko store kar diya 
    listing.save();    /// listing ko store kar diya
    req.flash("success_msg","rew subbmit sussfully");
    res.redirect(`/allthing/listing/${req.params.id}`);
  }

  module.exports.deletereview=async (req,res,next)=>{
       let pid= req.params.postid;
       let rid= req.params.reviewid;
       let newdata= await Listing.findByIdAndUpdate(pid,{$pull:{reviews:rid}});
       await  Review.deleteOne({_id:rid}).then(()=>{ console.log("delete sussfull");});
       req.flash("success_msg",` review delete sussfully`);
       res.redirect(`/allthing/listing/${pid}`);
      
  }