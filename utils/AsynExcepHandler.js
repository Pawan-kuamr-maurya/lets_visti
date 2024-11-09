module.exports =(fun)=>{
    console.log("return from here");
    
    return  (req,res,next)=>{
        fun(req,res,next).catch(next);
    }
}