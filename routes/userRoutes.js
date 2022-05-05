const express=require('express');
const {postingUser,getAllUsers, getUSerById, updateUser, deleteUser,loginUSer}=require('../controllers/userControllers');
const { protect, filterUser } = require('../middlewares/auth');
const router=express.Router()
router.post("/",postingUser)
.get("/",protect,getAllUsers);
router.get("/:id",getUSerById)
.put("/:id",protect,updateUser)
.delete("/:id",[protect,filterUser(['ADMIN'])],deleteUser);
router.post("/login",loginUSer);
module.exports.userRoutes=router
