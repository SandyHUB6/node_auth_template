const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get("/admin",verifyToken,authorizeRoles("super_admin"),(req,res)=>{
   return res.json({message :"Welcome Admins "});
});

router.get("/manager",verifyToken,authorizeRoles("super_admin","admin"),(req,res)=>{
  return  res.json({message :"Welcome Manager"});
});

router.get("/user",verifyToken,authorizeRoles("super_admin","admin","user"),(req,res)=>{
   return res.json({message :"Welcome User"});
});

module.exports = router;