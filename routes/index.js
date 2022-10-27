const express = require('express');
const router = express.Router();
const dal = require('../data/mongoDAL');
const config = require('../config.json');
const fs = require('fs');   
//const app = express();
// const { auth } = require('express-openid-connect');

// const path = require("path");
// const expressSession = require("express-session");
// const passport = require("passport");
// const querystring = require("querystring");

// require("dotenv").config();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'jOh22tDwalDsCxutF5TcMI6Jx32cY2gc',
//   issuerBaseURL: 'https://dev-y7axxxztvwww3xtf.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.render("home");
// });

// router.get("/login", passport.authenticate("auth0", { scope: "openid email profile"}), (req, res) => {
//     res.redirect("/");
//   }
// );

// router.get("/callback", (req, res, next) => {
//   passport.authenticate("auth0", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect("/login");
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       const returnTo = req.session.returnTo;
//       delete req.session.returnTo;
//       res.redirect(returnTo || "/home");
//     });
//   })(req, res, next);
// });

// router.get("/logout", (req, res) => {
//   req.logOut();

//   let returnTo = req.protocol + "://" + req.hostname;
//   const port = req.connection.localPort;

//   if (port !== undefined && port !== 80 && port !== 443) {
//     returnTo =
//       process.env.NODE_ENV === "production"
//         ? `${returnTo}/`
//         : `${returnTo}:${port}/`;
//   }

//   const logoutURL = new URL(
//     `https://${process.env.AUTH0_DOMAIN}/v2/logout`
//   );

//   const searchString = querystring.stringify({
//     client_id: process.env.AUTH0_CLIENT_ID,
//     returnTo: returnTo
//   });
//   logoutURL.search = searchString;

//   res.redirect(logoutURL);
// });

// if (app.get("env") === "production") {
//   // Serve secure cookies, requires HTTPS
//   session.cookie.secure = true;
// }
//Define the index routes here
//Basically cut an paste the routes we want from app.js

router.get( // .get means this will handle a get request
  '/', // This defines a route/endpoint for the root of my website
  (req, res) => { // req = Request and res = Response
    if(req.session.user != null){
      console.log('Current User: ' + req.session.user.Username);
      console.log('Admin Check' + req.session.user.Admin)
    }

    //await dal.getDataForChart();
    
    let model = {
        loggedInUser: req.session.user,
        config: config
    };
    //console.log(model.loggedInUser);
    // How do we response to the request
    // res.send('Yo! What you want?');
    res.render('home', model);
  }  
);


module.exports = router;