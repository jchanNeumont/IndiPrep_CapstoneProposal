const express = require('express');
const router = express.Router();
const dal = require('../data/mongoDAL');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const { on } = require('nodemon');
const { model } = require('mongoose');
// const { requiresAuth } = require('express-openid-connect');
// const app = express();

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });


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

router.get("/addJobs", async (req,res) => {
    res.render("addJobs");
})

router.post("/addJobs", async (req,res) => {
    let jobTitle = req.body.jobTitle;
    let jobSalary = req.body.jobSalary;
    let jobDescription = req.body.jobDescription;
    let jobCompany = req.session.user._id;
    await dal.createJob(jobCompany,jobTitle, null, jobSalary, jobDescription);
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("home", model);
})

router.post("/companySignup", async (req,res) =>{
    var admin = true;
    // if(req.body.adminCheck == "on"){
    //     admin = true;
    // }
    let companytitle = req.body.companytitle;
    let industry = req.body.industry;
    let educationrequirement = req.body.educationrequirement;
    let phonenumber = req.body.phonenumber;
    let email = req.body.email;
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    if(req.body.password == req.body.confirmPassword) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let result = await dal.createCompany(companytitle, industry, educationrequirement, hashedPassword, email, phonenumber, admin);
        res.redirect("/u/companyLogin");
    }
    else{
        res.render("companySignup");
    }
    //res.render("home");
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
    // if(req.body.adminCheck == "on"){
    //     admin = true;
    // }
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

router.get("/companyProfile", async (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("companyProfile", model);
})

router.post("/companyLogin", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let findUser = await dal.findCompanyByEmail(email);
    //console.log(findUser);
    if(findUser != null){
        if(await bcrypt.compare(password,findUser.Password)){

            console.log(`${findUser.CompanyTitle} logged in`);

            var user = {
            findUser: findUser
        };
        req.session.user = user.findUser;

        res.redirect("/");
        }
    }
    else{
        //Invalid Login!
        let model = {
            ErrorMessage: "Invalid Login!",
            email: email,
            password: password,
            config: config
        };
        res.render("companyLogin", model);
    }
})

router.get("/companyLogin", async (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    res.render("companyLogin",model);
})

router.post("/login", async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    let findUser = await dal.findUserByEmail(email);

    if(findUser != null){
        if(await bcrypt.compare(password,findUser.Password)){

            console.log(`${findUser.Username} logged in`);

            var user = {
                findUser: findUser
            };

            req.session.user = user.findUser;

            res.redirect("/");
        }
}
    else{
        //Invalid Login!
        let model = {
            ErrorMessage: "Invalid Login!",
            email: email,
            password: password,
            config: config
        };
        res.render("login", model);
    }
})

module.exports = router;