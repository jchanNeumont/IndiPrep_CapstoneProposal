const express = require('express');
const router = express.Router();
const dal = require('../data/mongoDAL');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const { on } = require('nodemon');


router.get("/signup", (req,res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("signup",model);
})

router.get("/logout", (req,res) => {
    req.session.user = null;
    res.render("home");
})

router.get("/companySignup", (req,res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("companySignup");
})

router.post("/companySignup", async (req,res) =>{
    var admin = false;
    if(req.body.adminCheck == "on"){
        admin = true;
    }
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    if(req.body.password == req.body.confirmPassword) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let result = await dal.createCompany(req.body.companytitle, req.body.industry, educationrequirement, phonenumber, hashedPassword, email, answers, admin);
        res.redirect("/u/login");
    }
    else{
        res.render("companySignup");
    }
    res.render("home");
})

router.post("/signup", async (req,res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let educationlevel = req.body.educationlevel;
    let phonenumber = req.body.phonenumber;
    let dob = req.body.dob;
    let username = req.body.username;
    let gender = req.body.gender;
    let password = req.body.password;
    let email = req.body.email;
    let age = req.body.age;
    let confirmPassword = req.body.confirmPassword;
    let answers = {
        Answer1: req.body.Question1,
        Answer2: req.body.Question2,
        Answer3: req.body.Question3
    }
    var admin = false;
    if(req.body.adminCheck == "on"){
        admin = true;
    }
    console.log(admin);
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    if(password == confirmPassword) {
        let hashedPassword = await bcrypt.hash(password, 10);
        let result = await dal.createUser(firstname, lastname, educationlevel, phonenumber, dob, gender, username, hashedPassword, age, email, answers, admin);
        res.redirect("/u/login");
    }
    else{
        res.render("signup");
    }

})

router.get("/profile", (req,res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    //console.log(req.session.user.Username);
    res.render("profile",model);
})

router.post("/profile", (req,res) => {
    //var date = new Date();
    //date.setTime(date.getTime() + (days*24*60*60*1000));
    //req.cookie = date.toUTCString();
    let model = {
        loggedInUser: req.session.user,
        config: config,
    };
    res.redirect("/u/profile");
})

router.get("/editProfile", (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("editProfile",model);
})

router.post("/editProfile", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let age = req.body.age;
    let confirmPassword = req.body.confirmPassword;
    let answers = {
        Answer1: req.body.Question1,
        Answer2: req.body.Question2,
        Answer3: req.body.Question3
    }
    
    //console.log(req.session.user.username);
    //console.log(req.session.user);
    //console.log(req.session.user.Username);

    if(password == confirmPassword) {
        let hashedPassword = await bcrypt.hash(password, 10);
        updatedUser = {
            Username: username,
            Password: hashedPassword,
            Age: age,
            Email: email,
            Answers: answers
        }
        let result = await dal.updateUser(req.session.user._id, req.session.user.Username, updatedUser);
        let findUser = await dal.findUserByUsername(updatedUser.Username);
        
        var user = {
            findUser: findUser
        };
    
        req.session.user = user.findUser;
    }

    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("profile",model);
})

router.get("/login", (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("login",model);
})

router.get("/makeUserAdmin", async (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    
    res.render("makeUserAdmin",model);
})

router.post("/makeUserAdmin", async (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };

    let username = req.body.username;
    let result = await dal.makeAdmin(username);
    console.log(result);
    
    res.render("home",model);
})

router.get("/deleteUser", async (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    
    res.render("deleteUser",model);
})

router.post("/deleteUser", async (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    let username = req.body.username;
    let result = await dal.deleteUser(username);
    console.log(result);
    res.render("deleteUser",model);
})

router.post("/login", async (req, res) => {
    //Get the values form the posted form
    //Remeber our body parser
    let email = req.body.email;
    let password = req.body.password;

    //let hashedPassword = await bcrypt.hash(password, 10);
    let findUser = await dal.findUserByEmail(email);

    //console.log(findUser.Password);
    //console.log(hashedPassword);

    //console.log(await bcrypt.compare(password,findUser.Password));
    

    //Check the database to see if we have a match
    //If we do, do the passwords match?
    if(await bcrypt.compare(password,findUser.Password)){
        //Success!
        //Lets create a session and add some data that we want to track between requests
        //Don't put anything secure in the session because it ends up in the user's browser's cookies
        console.log(`${findUser.Username} logged in`);

        var user = {
            findUser: findUser
        };

        req.session.user = user.findUser;
        // req.session.username = username;
        // req.session.userId = 1;

        //res.send("Login Successful!");
        res.redirect("/");
    }
    else{
        //Invalid Login!
        let model = {
            ErrorMessage: "Invalid Login!",
            username: username,
            password: password,
            config: config
        };
        res.render("login", model);
    }

    //If login is valid send them to Home Page
    //Setup the user's session. What should we store?
    
    //Else, return them back to the login page

    //res.send("Post: Login",{config});
})

module.exports = router;