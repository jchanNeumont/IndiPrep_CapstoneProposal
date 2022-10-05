const express = require('express');
const router = express.Router();
const dal = require('../data/mongoDAL');
const config = require('../config.json');
const fs = require('fs');   

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