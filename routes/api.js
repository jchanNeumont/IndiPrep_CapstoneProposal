const express = require('express');
const router = express.Router();

const dal = require('../data/mongoDAL');
const fs = require('fs');

// Define the index routes here
// Basically, cut and paste the routes we want from router.js

router.get('/', async (req, res) => { 
    var resultJson = {
        chart1: [{
            data1: await dal.getDataForChart1(),
            data2: await dal.getDataForChart2(),
            data3: await dal.getDataForChart3()

        }
        ]
    };
    res.json(resultJson);
})

router.get('/GetGameChartData', async (req, res) => { 
    //Call the mongo database and get the data I need
    //dal.getDataForChart1();
    //Think about the data our consumer needs
    //Create an object that structure the chart data so it's easy to use

    //console.log(await dal.getDataForChart1());

    var resultJson = {
        labels: ["1", "2", "3"],
        data: await dal.getDataForChart1()
    };
    res.json(resultJson);
})
router.get('/GetGameChartData2', async (req, res) => { 
    //Call the mongo database and get the data I need
    //dal.getDataForChart1();
    //Think about the data our consumer needs
    //Create an object that structure the chart data so it's easy to use

    //console.log(await dal.getDataForChart2());

    var resultJson = {
        labels: ["1", "2", "3"],
        data: await dal.getDataForChart2()
    };
    res.json(resultJson);
})
router.get('/GetGameChartData3', async (req, res) => { 
    //Call the mongo database and get the data I need
    //dal.getDataForChart1();
    //Think about the data our consumer needs
    //Create an object that structure the chart data so it's easy to use

    //console.log(await dal.getDataForChart1());

    var resultJson = {
        labels: ["1", "2", "3"],
        data: await dal.getDataForChart3()
    };
    res.json(resultJson);
})

module.exports = router;