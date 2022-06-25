// itewill handle all the routes
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

 

 router.get("/", userController.view);
 router.post("/", userController.find);
//  router.get("/login", userController.login);
//  router.post("/signup", userController.signup);
    
 router.get("/adduser",userController.form);
 router.post("/adduser", userController.create);
 router.get("/edit/:id", userController.edit);
 router.post("/edit/:id", userController.update);
 router.get("/:id",userController.delete);



// router.get("/", (req, res)=>{
//     res.render('home');
// }) 
 module.exports = router;