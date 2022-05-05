const jwt=require('jsonwebtoken')
const privatekey= 'ysuagsakdhgfbaskjfdghjdfjcgfgfjgfhjgsdjasf';
exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorisation && req.headers.authorization.startsWith("Bearer ")){
        token=req.headers.authorisation.split("")[1]
        req.user=jwt.verify(token,privatekey)
        console.log(req.user)
        next()
    }
    else{
        return res.status(401).send("you must be logged in to acesss this routes")
    }
}
exports.filterUser=(types)=>async(req,res,next)=>{
    if(!types.includes(req.user.type)) return res.status(403).send("you have no access...")
    next()
}