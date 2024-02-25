const express = require('express')
const router = express.Router();
const {getUser,createUser}=require('../controllers/userControllers')
const authenticateUser=require("../middleware/userMiddleware")


router.post('/login',getUser)
router.post('/register_user',createUser)
router.get("/validateToken", authenticateUser, (req, res) => {
    // res.status(200).send(req.user);
    res.send("hello world")
  })



module.exports=router