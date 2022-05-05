const { userSchema } = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const privatekey= 'ysuagsakdhgfbaskjfdghjdfjcgfgfjgfhjgsdjasf';
exports.postingUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userSchema({
      fname: req.body.fname,
      lname: req.body.lname,
      type: req.body.type,
      password: hashPassword,
    });
    await user.save();
    if (!user) {
      return res.status(400).send("Account not created");
    }
    return res.status(201).send("Account created");
  } catch (error) {
    console.log(error);
  }
};
exports.getAllUsers = async (req, res) => {
  const user = await userSchema.find();
  if (user.length == 0) {
    return res.send("no users found");
  }
  return res.status(200).json({
    count: user.length,
    data: user,
  });
};
exports.getUSerById = async (req, res) => {
  console.log(req.params.id);
  if (req.params.id.length == 24) {
    const users = await userSchema.findById(req.params.id);
    return res.status(200).json({
      data: users,
    });
  } else {
    console.log("The id must have 24 hex characters");
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.id != req.params.id) {
    return res.status(401).send("you cant update other user");
  }
  const user = await userSchema.findByIdAndUpdate(req.params.id, {
    fname: req.body.fname,
  });
  await user.save();
  if (!user) {
    return res.status(400).send("unable to update user");
  }
  return res.status(200).send("user updated");
};
exports.deleteUser=async(req,res)=>{
    try{
        console.log(req.params.id);
        const user=await userSchema.findByIdAndDelete(req.params.id)
        return  res.status(200).send("user deleted")
    }
    catch(error){
        console.log(error);
    }
}
exports.loginUSer=async(req,res)=>{
    try{
        const {fname,password}=req.body
        const user=await userSchema.findOne({
            fname:fname
        })
        console.log(user)
        if(user==null){
            return res.status(404).send(" incorrect fnam or password !")
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        console.log(user.password);
        if(!passwordCompare){
            return res.status(404).send("incorect fname or password")
        }
        let token=jwt.sign({
            id:user._id,
            fname:user.fname,
            lname:user.lname,           
            type:user.type
        },privatekey
        )

        return res.status(200).json({
            success:true,
            token
        })
    }
    catch(error){
        console.log(error)
    }
}
